<template>
    <div>     
        <b-row>
            <b-col>
                <b-card class="p-1">  
                    <h3>{{ renterName }} Rent Recoards</h3>  
                    <b-alert class="m-0" show variant="info" v-if="!rentRecordListStatus > 0">{{ noRentMessage }}</b-alert>
                    <b-table-simple responsive bordered striped hover class="m-0"  v-if="rentRecordListStatus > 0">
                        <b-thead>
                            <b-tr>                              
                                <b-th colspan="8"  class="p-2">
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
                            </b-tr>
                        </b-tbody>
                        <b-tfoot>
                            <b-tr>
                                <b-td colspan="8"><span class="pink bold">Total Rent : <span class="pinkColor bold">&#8377;</span> {{ totalRent }} /-</span></b-td>
                            </b-tr>
                        </b-tfoot>
                    </b-table-simple>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>


<style>

</style>

<script>

export default { 
    data() {
        return {
            userId: this.$route.params.userId,
            rentRecord: [],
            userlist: {},
            users: [],
            rentRecordListStatus:null,
            noRentMessage:null,
            renterName:null
        }
    },
    methods:{
        getRentsRecords(){
            axios.get('https://codingkloud.com/rentVue/addRentApi.php?action=getRentRecords&records='+this.userId).then((response) => {
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

            axios.get('https://codingkloud.com/rentVue/addRentApi.php?action=getUserNameRecords&records='+this.userId).then((response) => {
                if(response.data.status == 1){
                    console.log(response);   
                    this.renterName = response.data.records[0].firstName + ' ' + response.data.records[0].lastName;
                }else if(response.data.status == 0) {
                    this.noRentMessage = response.data.message;
                    console.log(response);
                }
            }).catch(error => {
                console.log(error.message);
            });
        }
    },
    computed: {
        totalRent: function () {
            let sum = 0;
            this.rentRecord.forEach(function(item) {
                sum += (parseFloat(item.total_rent));
            });
            return sum;
        },
    },
    created() {
        this.getRentsRecords();
    },
    mounted() {}
}; 
</script>