<template>
    <div> 
         <b-row class="mb-3">
            <b-col>
                <b-card>  
                    <h6 class="float-left mt-2">Add New Flat</h6>
                    <button class="btn siteButton btn-secondary float-right"   @click="addFlatModal()">Add Flat</button>
                </b-card>
            </b-col>
         </b-row>       
         <b-row>
            <b-col>
                <b-card class="p-1">      
                    <b-alert class="m-0" show variant="info" v-if="!flatListStatus > 0">{{ noUserMessage }}</b-alert>          
                    <b-table-simple responsive bordered striped hover class="m-0"  v-if="flatListStatus > 0">
                        <b-thead>
                            <b-tr>
                                <b-th>Id</b-th>                                
                                <b-th>Flat Name</b-th>
                                <b-th>Base Rent</b-th>
                                <b-th>Actions</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-bind:key="item.index" v-for="(item, index) in flats">
                                <b-td>{{ item.id }}</b-td>               
                                <b-td>{{ item.flatName }}</b-td>
                                <b-td><span class="pinkColor bold">&#8377;</span> {{ item.baseRent }} /-</b-td>
                                <b-td>                                    
                                    <b-button variant="outline-primary" class="mr-2 editIcon p-0" @click="editModal(item.id, index)"><i class="material-icons">edit</i></b-button>
                                    
                                    <!-- <b-button variant="outline-danger" class="ml-2 deleteIcon p-0" @click="deleteUser(item.id)"><i class="material-icons">delete</i></b-button> -->
                                </b-td>
                            </b-tr>
                        </b-tbody>
                        <b-tfoot>
                            <b-tr>
                                <b-td colspan="2"><span class="pink bold">Total Flats :  {{ totalFlats }}</span></b-td>
                                <b-td colspan="2"><span class="pink bold">Total Rent : <span class="pinkColor bold">&#8377;</span> {{ totalRent }} /-</span></b-td>
                            </b-tr>
                        </b-tfoot>
                    </b-table-simple>
                </b-card>
            </b-col>
        </b-row>     

        <b-modal ref="addNewFlatModal" hide-footer hide-header>
            <div class="d-block">           
                <div class="commonFormDesign"> 
                    <div id="loader" v-bind:class="{ loaderActive: isActiveLoader }">
                        <svg width="100" height="100" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#EF4B7C">
                            <g fill="none" fill-rule="evenodd" stroke-width="2">
                                <circle cx="22" cy="22" r="1">
                                    <animate attributeName="r"
                                        begin="0s" dur="1.8s"
                                        values="1; 20"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.165, 0.84, 0.44, 1"
                                        repeatCount="indefinite" />
                                    <animate attributeName="stroke-opacity"
                                        begin="0s" dur="1.8s"
                                        values="1; 0"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.3, 0.61, 0.355, 1"
                                        repeatCount="indefinite" />
                                </circle>
                                <circle cx="22" cy="22" r="1">
                                    <animate attributeName="r"
                                        begin="-0.9s" dur="1.8s"
                                        values="1; 20"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.165, 0.84, 0.44, 1"
                                        repeatCount="indefinite" />
                                    <animate attributeName="stroke-opacity"
                                        begin="-0.9s" dur="1.8s"
                                        values="1; 0"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.3, 0.61, 0.355, 1"
                                        repeatCount="indefinite" />
                                </circle>
                            </g>
                        </svg>
                    </div>
                    <div class="loginSuccessAnimate" v-show="showAlertSuccess">
                        <div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: flex;">
                            <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div>
                            <span class="swal2-success-line-tip"></span>
                            <span class="swal2-success-line-long"></span>
                            <div class="swal2-success-ring"></div> 
                            <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
                            <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div>
                        </div>
                        <h4 style="color:#a5dc86;text-align:center">{{ alertMessage }}</h4>
                    </div> 
                    <transition name="fade" mode="out-in">
                        <div class="loginErrorAnimate" v-show="showAlertError"> 
                        <a class="errorCloseButton" style="color:#f27474;" @click="hideErrorAlert">Close</a>
                        <div class="swal2-icon swal2-error swal2-animate-error-icon" style="display: flex;">
                            <span class="swal2-x-mark">
                            <span class="swal2-x-mark-line-left"></span>
                            <span class="swal2-x-mark-line-right"></span>
                            </span>
                        </div>
                        <h4 style="color:#f27474;text-align:center">{{ alertMessage }}</h4>
                        </div>
                    </transition>  
                    <b-card>
                        <h3 class="mb-3">Add New Flat</h3>
                        <b-row>        
                            <b-col cols="12">
                            <form>
                                <b-form-group>
                                <b-form-input v-model="newFlat.flatName" placeholder="Flat Name" id="flatName" type="text" size="md"></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                <b-form-input v-model="newFlat.baseRent" placeholder="Base Rent" id="baseRent" type="email" size="md"></b-form-input>
                                </b-form-group>
                                <b-button class="siteButton"  @click="addNewFlat()">Add New User</b-button>
                            </form>
                            <ul class="errorListing" v-if="errors.length">
                                <li v-bind:key="error.index"  v-for="error in errors">{{ error }}</li>
                            </ul>
                            </b-col>
                        </b-row>
                    </b-card>
                </div>
            </div>
        </b-modal>   

        <b-modal class="updateFlatModal" ref="updateDataModal" hide-footer hide-header>
            <div class="d-block">  
                <div class="commonFormDesign pt-5 pb-5">
                    <div id="loader" v-bind:class="{ loaderActive: isActiveLoader }">
                        <svg width="100" height="100" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#EF4B7C">
                            <g fill="none" fill-rule="evenodd" stroke-width="2">
                                <circle cx="22" cy="22" r="1">
                                    <animate attributeName="r"
                                        begin="0s" dur="1.8s"
                                        values="1; 20"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.165, 0.84, 0.44, 1"
                                        repeatCount="indefinite" />
                                    <animate attributeName="stroke-opacity"
                                        begin="0s" dur="1.8s"
                                        values="1; 0"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.3, 0.61, 0.355, 1"
                                        repeatCount="indefinite" />
                                </circle>
                                <circle cx="22" cy="22" r="1">
                                    <animate attributeName="r"
                                        begin="-0.9s" dur="1.8s"
                                        values="1; 20"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.165, 0.84, 0.44, 1"
                                        repeatCount="indefinite" />
                                    <animate attributeName="stroke-opacity"
                                        begin="-0.9s" dur="1.8s"
                                        values="1; 0"
                                        calcMode="spline"
                                        keyTimes="0; 1"
                                        keySplines="0.3, 0.61, 0.355, 1"
                                        repeatCount="indefinite" />
                                </circle>
                            </g>
                        </svg>
                    </div>
                    <b-card>    
                        <h3 class="mb-3">Update Flat Details</h3>       
                        <b-row>                            
                            <b-col cols="6">
                                <b-form-group>
                                    <b-form-input v-model="editedFlat.flatName" placeholder="Flat Name" readonly="" size="md"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                    <b-form-input v-model="editedFlat.baseRent" placeholder="Base Rent" size="md"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12">                    
                                <b-button class="siteButton" @click="updateFlat()">Update</b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </div>
            </div>            
        </b-modal>

    </div>
</template>

<style scoped>  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
import axios from 'axios'
import { setInterval } from 'timers';
export default { 
    data(){
        return {
            errors: [],
            newFlat: {
                flatName: null,
                baseRent: null
            },
            flats:[],
            editedFlat: {
                flatName:null,
                baseRent:null
            },
            editedFlatId:'',
            delFlatId:'',

            alertMessage: "",
            showAlertError: false,
            showAlertSuccess: false,
            isActiveLoader: false,
            noUserMessage:null,
            flatListStatus:null
        }
    },
    methods:{
        fatchFlats(){
            axios.post('https://codingkloud.com/rentVue/flatListApi.php',{
            action: "listFlats"
            }).then((response) => {
                if(response.data.status == 1){
                    console.log(response);   
                    this.flatListStatus = response.data.status;
                    this.flats = response.data.records;
                }else if(response.data.status == 0) {
                    this.flatListStatus = response.data.status;
                    this.noUserMessage = response.data.message;
                    console.log(response);
                }
            });
        },
        addNewFlat(){            
            this.errors = [];

            if (!this.newFlat.flatName) {
                this.errors.push("Flat name required.");
            }else if (this.newFlat.flatName.length < 6){
                this.errors.push("Flat name required 6 characters");
            }

            if (!this.newFlat.baseRent) {
                this.errors.push("Base rent required.");
            }            

            if (!this.errors.length) {
                this.isActiveLoader = true; 
                axios.post('https://codingkloud.com/rentVue/flatListApi.php',{
                flatName: this.newFlat.flatName,
                baseRent: this.newFlat.baseRent,
                action: "addNewFlat"
                }).then(response=> {
                if(response.data.status == 2){
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        //this.showAlertError = true;                        
                        this.$refs['addNewFlatModal'].hide();
                        swal(this.alertMessage, "Seems like something went wrong!", "error",{buttons: false});
                    }, 100)
                    setTimeout(() => {
                        this.showAlertError = false;
                        this.newFlat.flatName = "";
                        this.newFlat.baseRent = ""
                    }, 100)
                }else {
                    console.log(response);
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        //this.showAlertSuccess = true;
                        swal(this.alertMessage, "Thanks for using CK-Renter App.", "success",{buttons: false, timer: 1150});
                    }, 100)
                    setTimeout(() => {
                        this.newFlat.flatName = "",
                        this.newFlat.baseRent = "",
                        this.$refs['addNewFlatModal'].hide();
                        this.showAlertSuccess = false;
                        this.fatchFlats();     
                    }, 100)
                }          
                }).catch(error => {
                    console.log(error.message);
                });         
            }
            
        },
        hideErrorAlert(){
            this.showAlertError = false;
        },
        updateFlat(){
            this.errors = [];

            if (!this.editedFlat.baseRent) {
                this.errors.push("Base rent required.");
            }

            if (!this.errors.length) {
                this.isActiveLoader = true; 
                /* Update Data Using API */ 
                axios.post('https://codingkloud.com/rentVue/flatListApi.php',{
                    flatId:this.editedFlatId,
                    flatName:this.editedFlat.flatName,
                    baseRent:this.editedFlat.baseRent,
                    action: "update"
                }).then((response) => {
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        //this.showAlertSuccess = true;
                        swal(this.alertMessage, "Thanks for using CK-Renter App.", "success",{buttons: false, timer: 1150});
                    }, 100)
                    setTimeout(() => {                        
                        this.editedFlat.flatName = '';
                        this.editedFlat.baseRent = '';
                        this.$refs['updateDataModal'].hide();
                        this.showAlertSuccess = false;
                        this.fatchFlats();            
                    }, 100)
                    console.log(response);
                    
                })
            }
                                  
        },
        deleteUser(delFlat) {
            this.delFlatId = delFlat;
            /* Update Data Using API */ 
            axios.post('https://codingkloud.com/rentVue/flatListApi.php',{
                deleteIdData:this.delFlatId,
                action: "deleteFlat"
            }).then((response) => {
                console.log(response);
                this.fatchFlats();             
            })
        },
        editModal(flatId, index){
            this.editedFlat.flatName = this.flats[index].flatName;
            this.editedFlat.baseRent = this.flats[index].baseRent;
            this.editedFlatId = flatId;
            this.$refs['updateDataModal'].show();
        },
        addFlatModal(){
            this.$refs['addNewFlatModal'].show();
        }     
    },
    computed: {
        totalRent: function () {
            let sum = 0;
            this.flats.forEach(function(item) {
                sum += (parseFloat(item.baseRent));
            });
            return sum;
        },
        totalFlats: function () {
            return this.flats.length;
        }
    },
    created() {
        this.fatchFlats();        
    }   
}; 
</script>