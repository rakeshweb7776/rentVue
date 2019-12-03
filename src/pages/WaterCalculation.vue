<template>
    <div>   
        <b-row class="mt-3">
            <b-col>
                <b-card class="p-1">  
                    <h3>Water Calculations</h3> 
                    <b-row>
                        <b-col cols="12">
                            <b-card class="p-1 mb-3"> 
                                <b-form inline class="mb-3">
                                    <b-form-input type="number" placeholder="BMR" @keyup="watercalculationFunction" v-model="waterCalculation.bmr"></b-form-input>                                         
                                    <b-form-input type="number" placeholder="CMR" @keyup="watercalculationFunction" v-model="waterCalculation.cmr" class="ml-3"></b-form-input>                                         
                                </b-form>
                                <ul class="errorListing" v-if="errors.length">
                                    <li v-bind:key="error.index"  v-for="error in errors">{{ error }}</li>
                                </ul>
                                <b-table-simple responsive bordered striped hover class="m-0">
                                    <b-tbody>
                                        <b-tr>
                                            <b-td class="width50"><b>BMR</b></b-td>
                                            <b-td class="width50"><b>{{ waterCalculation.bmr }}<sup>Unit</sup></b></b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td class="width50"><b>CMR</b></b-td>
                                            <b-td class="width50"><b>{{ waterCalculation.cmr }}<sup>Unit</sup></b></b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td class="width50"><b>Total Reading</b></b-td>
                                            <b-td class="width50"><b>{{ waterCalculation.totalMR }}<sup>Unit</sup></b></b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td class="width50"><b>Total Water Charges</b></b-td>
                                            <b-td class="width50"><b>{{ waterCalculation.totalWC }}<sup>₹</sup></b></b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td class="width50"><b>Per User Charges</b></b-td>
                                            <b-td class="width50"><b>{{ waterCalculation.perUserWC }}<sup>₹</sup></b></b-td>
                                        </b-tr>  
                                    </b-tbody>
                                </b-table-simple>
                                <b-button class="siteButton mt-3"  @click="addWaterCalculation()">Add Water Calculation</b-button>                                
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
                currentMonth:new Date().getMonth() + '-' + new Date().getFullYear(),
                bmr:0,
                cmr:0,
                totalMR:0,
                totalWC:0,
                perUserWC:0
            },
            alertMessage:null
        }
    },
    computed:{
        
    },
    methods:{
        fatchWaterList(){
            axios.post('https://codingkloud.com/rentVue/waterCalculationApi.php',{
                action: "getWaterList"
            }).then((response) => {
                console.log(response);
                this.waterList = response.data.waterList;
            });
        },
        addWaterCalculation(){            
            this.errors = [];

            if (!this.waterCalculation.bmr) {
                this.errors.push("BMR required.");
            }else if (this.waterCalculation.bmr <= 0){
                this.errors.push("Flat name required 6 characters");
            }  

            if (!this.waterCalculation.cmr) {
                this.errors.push("CMR required.");
            }else if (this.waterCalculation.cmr <= 0){
                this.errors.push("Flat name required 6 characters");
            }            

            if (!this.errors.length) {
                this.isActiveLoader = true; 
                axios.post('https://codingkloud.com/rentVue/waterCalculationApi.php',{
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
                        swal(this.alertMessage, "Seems like something went wrong!", "error",{buttons: false});
                    }, 100)
                    setTimeout(() => {
                        this.fatchWaterList();  
                        this.waterCalculation.bmr = 0;
                        this.waterCalculation.cmr = 0;
                        this.waterCalculation.totalMR = 0;
                        this.waterCalculation.totalWC = 0;
                        this.waterCalculation.perUserWC = 0;
                    }, 100)
                }else {
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;      
                        swal(this.alertMessage, "Thanks for using CK-Renter App.", "success",{buttons: false, timer: 1150});
                    }, 100)
                    setTimeout(() => {
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
                this.waterCalculation.totalMR = Math.abs(this.waterCalculation.bmr - this.waterCalculation.cmr);
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