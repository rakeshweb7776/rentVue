<template>
    <div>    
        <b-row class="mt-3">
            <b-col>
                <b-card class="p-1">  
                    <h3>Rent Recoards {{loggedUserDAtaID}}</h3>  
                    <b-alert class="m-0" show variant="info" v-if="!rentRecordListStatus > 0">{{ noRentMessage }}</b-alert>
                    <b-table-simple responsive bordered striped hover class="m-0" v-if="rentRecordListStatus > 0">
                        <b-thead>
                            <b-tr>                              
                                <b-th colspan="9"  class="p-2">
                                    <b-form-group class="m-0">
                                        <b-form-input type="text" placeholder="Search" size="md"></b-form-input>                                         
                                    </b-form-group>
                                </b-th> 
                            </b-tr>
                            <b-tr>              
                                <b-th>Date</b-th>      
                                <b-th>BMR</b-th>
                                <b-th>CMR</b-th>
                                <b-th>Meter Reading</b-th>
                                <b-th>Light Charge</b-th>
                                <b-th>Water Charge</b-th>
                                <b-th>Base Rent</b-th>
                                <b-th>Total Rent</b-th>
                                <b-th>Status</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-bind:key="item.index" v-for="item in rentRecord">
                                <b-td>{{ item.month }}</b-td>
                                <b-td>{{ item.back_month_reading }} <sup>Unit</sup></b-td>
                                <b-td>{{ item.current_month_reading }} <sup>Unit</sup></b-td>
                                <b-td> {{ item.meter_reading }} <sup>Unit</sup></b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.light_charge }} /-</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.water_charge }} /-</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.rent }} /-</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.total_rent }} /-</b-td>
                                <b-td>
                                    <span v-if="item.status == 0" class="redColor bold">Pending</span>
                                    <span v-if="item.status == 1" class="greenColor bold">Diposited</span>
                                </b-td>                                
                            </b-tr>
                        </b-tbody>
                        <b-tfoot>
                            <b-tr>
                                <b-td colspan="9"><span class="pink bold">Total Rent : <span class="pinkColor bold">&#8377;</span> {{ totalRent }} /-</span></b-td>
                            </b-tr>
                        </b-tfoot>
                    </b-table-simple>
                </b-card>
            </b-col>
        </b-row>     

    </div>
</template>

<style scoped>  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>

export default { 
    props:["loggedUserMainDataForContent"],
    data(){
        return {
            loggedUserDAtaID:$cookies.get('user_session'),
            rentRecords:[],
            rentRecordListStatus:null,
            noRentMessage:null
        }            
    },
    methods:{
        getRentsRecords(){
            axios.get(httpBase+'://codingkloud.com/rentVue/addRentApi.php?action=getRentRecords&records='+this.loggedUserMainDataForContent.userID).then((response) => {
                if(response.data.status == 1){
                    console.log(response);   
                    this.rentRecord = response.data.records;
                    this.rentRecordListStatus = response.data.status;
                }else if(response.data.status == 0) {
                    this.rentRecordListStatus = response.data.status;
                    this.noRentMessage = response.data.message;
                    console.log(response);
                }
            }).catch(error => {
                console.log(error.message);
            });
        },
        
        updateUserData(){
            this.errors = [];

            if (!this.errors.length) {
                this.isActiveLoader = true; 
                /* Update Data Using API */ 
                axios.post(httpBase+'://codingkloud.com/rentVue/users.php',{
                    editedUserId:this.editedUserId,
                    firstName:this.editedUser.firstName,
                    lastName:this.editedUser.lastName,
                    phone:this.editedUser.phone,
                    aadhar:this.editedUser.aadhar,
                    editedFlat:this.editedUser.editedFlat,
                    OldflatId:this.currentFlatId,
                    action: "update"
                }).then((response) => {
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        //this.showAlertSuccess = true;
                        swal(this.alertMessage, "Thanks for using CK-Renter App.", "success",{buttons: false, timer: 1150});
                    }, 100)
                    setTimeout(() => { 
                        this.$refs['updateUserDataModal'].hide();
                        this.showAlertSuccess = false;
                        this.fatchUsers();   
                        this.fatchFlats();         
                    }, 100)
                    console.log(response);
                    
                })
            }
                                  
        }
    },
    computed: {
        totalRent: function () {
            let sum = 0;
            this.rentRecord.forEach(function(item) {
                if (item.status == 0) {
                    sum += (parseFloat(item.total_rent));
                }
            });
            return sum;
        },
    },
    created() {
        setTimeout(this.getRentsRecords, 1000);
    },
    mounted(){

    }  
}
</script>