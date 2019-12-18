<template>
    <div>     
        <b-row>
            <b-col>
                <b-card class="p-1">  
                    <h3>Rent Recoards</h3>  
                    <b-table-simple responsive bordered striped hover class="m-0">
                        <b-thead>
                            <b-tr>                              
                                <b-th colspan="8"  class="p-2">
                                    <b-form-group class="m-0">
                                        <b-form-input type="text" placeholder="Search" size="md"></b-form-input>                                         
                                    </b-form-group>
                                </b-th>
                            </b-tr>
                            <b-tr>                    
                                <b-th>Flat No</b-th>
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
                                <b-td>FLat No. 0</b-td>
                                <b-td>{{ item.back_month_reading }} <sup>Unit</sup></b-td>
                                <b-td>{{ item.current_month_reading }} <sup>Unit</sup></b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.meter_reading }}</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.light_charge }} /-</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.water_charge }} /-</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.rent }} /-</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.total_rent }} /-</b-td>
                            </b-tr>
                        </b-tbody>
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
            users: []
        }
    },
    methods:{
        getRentsRecords(){
            axios.get('https://codingkloud.com/rentVue/addRentApi.php?records='+this.userId).then((response) => {
                this.rentRecord = response.data.records;        
            });
        }
    },
    created() {
        this.getRentsRecords()
      /*  this.$http.get('https://reqres.in/api/users?id='+this.userId).then(function(response){            
            this.userlist = response.body.data;
        });*/
    },
    mounted() {
        //this.getRentsRecords(); 
        /*this.$http.post('https://reqres.in/api/users/'+this.userId,{
           // userId:this.userlist.id,
            first_name:this.userlist.first_name,
            last_name:this.userlist.last_name,
            email:this.userlist.email
        }).then(function(response){
            console.log(response);
        });*/
    }
}; 
</script>