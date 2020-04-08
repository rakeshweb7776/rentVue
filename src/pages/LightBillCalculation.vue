<template>
    <div>   
        <b-row>
            <b-col>
                <b-card class="p-1">  
                    <h3>LightBill Calculation</h3>
                    <b-row>
                        <b-col cols="12">
                            <b-card class="p-1 mb-3"> 
                                <b-form inline class="mb-3">
                                    <b-form-input type="text" placeholder="BMR" @keyup="watercalculationFunction" v-bind:disabled="bmrValueStatus" v-model.number="waterCalculation.bmr"></b-form-input>                                         
                                    <b-button class="siteButton ml-3" v-bind:class="{ buttonloading: isLoaderActive }"  @click="addLightBill()">Add Light bill</b-button>                                
                                </b-form>
                                <ul class="errorListing" v-if="errors.length">
                                    <li v-bind:key="error.index"  v-for="error in errors">{{ error }}</li>
                                </ul>
                            </b-card>
                        </b-col>
                    </b-row>   
                    <b-table-simple responsive bordered striped hover class="m-0">
                        <b-thead>
                            <b-tr>                              
                                <b-th>Month</b-th>
                                <b-th>BMR</b-th>
                                <b-th>CMR</b-th>
                                <b-th>Total Reading</b-th>
                                <b-th>Total Charge</b-th>
                                <b-th>Per User Charge</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-bind:key="item.index" v-for="item in waterList">          
                                <b-td>{{ item.currentMonth }}</b-td>
                                <b-td>{{ item.bmr }}<sup><b>Unit</b></sup></b-td>
                                <b-td>{{ item.cmr }}<sup><b>Unit</b></sup></b-td>
                                <b-td>{{ item.totalMR }}<sup><b>Unit</b></sup></b-td>
                                <b-td><b>₹</b> {{ item.totalWC }} /-</b-td>
                                <b-td><b>₹</b> {{ item.perUserWC }} /-</b-td>
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
    data(){
        return {
            errors:[],
            waterList:[],
            waterCalculation: {
                currentMonth:new Date().getMonth() + 1 + '-' + new Date().getFullYear(),
                bmr:0,
                cmr:0,
                totalMR:0,
                totalWC:0,
                perUserWC:0
            },
            alertMessage:null,
            bmrValueStatus:false,
            isLoaderActive:false
        }
    },
    computed:{
        
    },
    methods:{
        fatchLightBill(){
            axios.post(httpBase+'//codingkloud.com/rentVue/waterCalculationApi.php',{
                action: "getWaterList"
            }).then((response) => {
                console.log(response);
                this.waterList = response.data.waterList;
                if(this.waterList.length) {
                    let getLastMonthReading = this.waterList[this.waterList.length - 1];                    
                    this.waterCalculation.bmr = parseInt(getLastMonthReading.cmr);      
                    this.bmrValueStatus = true;              
                }
            });
        },
        addLightBill(){            
            this.errors = [];

            if (!this.waterCalculation.bmr) {
                this.errors.push("BMR required.");
            }  

            if (!this.waterCalculation.cmr) {
                this.errors.push("CMR required.");
            }else if (this.waterCalculation.cmr <= this.waterCalculation.bmr){
                this.errors.push("Please enter greater than BMR.");
            }            

            if (!this.errors.length) {
                this.isLoaderActive = true; 
                axios.post(httpBase+'//codingkloud.com/rentVue/waterCalculationApi.php',{
                currentMonth: this.waterCalculation.currentMonth,
                bmr: this.waterCalculation.bmr,
                cmr: this.waterCalculation.cmr,
                totalMR: this.waterCalculation.totalMR,
                totalWC: this.waterCalculation.totalWC,
                perUserWC: this.waterCalculation.perUserWC,
                action: "addWaterCalculation"
                }).then(response=> {
                if(response.data.status == 1){
                    this.alertMessage = response.data.message;
                    setTimeout(() => {    
                        this.isLoaderActive = false; 
                        swal(this.alertMessage, "Seems like something went wrong!", "error",{buttons: false});
                    }, 100)
                    setTimeout(() => {                     
                        this.waterCalculation.cmr = 0;
                        this.waterCalculation.totalMR = 0;
                        this.waterCalculation.totalWC = 0;
                        this.waterCalculation.perUserWC = 0;
                    }, 100)
                }else {
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isLoaderActive = false;       
                        swal(this.alertMessage, "Thanks for using CK-Renter App.", "success",{buttons: false, timer: 1150});
                    }, 100)
                    setTimeout(() => {
                        this.fatchWaterList();
                        this.showAlertError = false;
                        this.waterCalculation.bmr = 0;
                        this.waterCalculation.cmr = 0;
                        this.waterCalculation.totalMR = 0;
                        this.waterCalculation.totalWC = 0;
                        this.waterCalculation.perUserWC = 0;
                    }, 100)
                }}).catch(error => {
                    console.log(error.message);
                });                
            }
            
        },
        watercalculationFunction(){
            if(this.waterCalculation.bmr > 0 && this.waterCalculation.cmr > this.waterCalculation.bmr) {
                this.waterCalculation.totalMR = this.waterCalculation.cmr - this.waterCalculation.bmr;
                console.log("Testing" + this.waterCalculation.totalMR);
                this.waterCalculation.totalWC = this.waterCalculation.totalMR * 8;
                this.waterCalculation.perUserWC = Math.trunc( this.waterCalculation.totalWC / 6 );
            }else {
                this.waterCalculation.totalMR = 0;
                this.waterCalculation.totalWC = 0;
                this.waterCalculation.perUserWC = 0;
            }
        }
    },
    mounted(){
        this.fatchWaterList();        
    }
}; 
</script>