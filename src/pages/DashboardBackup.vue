<template>
    <div> 
         <b-row class="mb-3">
            <b-col>
                <b-card>  
                    <h6 class="float-left mt-2">Add Users</h6>
                    <button class="btn siteButton btn-secondary float-right"   @click="addUserModal()">Add Users</button>
                </b-card>
            </b-col>
         </b-row>       
         <b-row>
            <b-col>
                <b-card class="p-1">      
                    <b-alert class="m-0" show variant="info" v-if="!userListStatus > 0">{{ noUserMessage }}</b-alert>          
                    <b-table-simple responsive bordered striped hover class="m-0"  v-if="userListStatus > 0">
                        <b-thead>
                            <b-tr>
                                <b-th>Id</b-th>                                
                                <b-th>Name</b-th>
                                <b-th>Phone</b-th>
                                <b-th>Email</b-th>
                                <b-th>Actions</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-bind:key="item.index" v-for="(item, index) in users">
                                <b-td>{{ item.id }}</b-td>               
                                <b-td>{{ item.name }}</b-td>
                                <b-td>{{ item.phone }}</b-td>
                                <b-td>{{ item.email }}</b-td>
                                <b-td>                                    
                                    <b-button variant="outline-primary" class="mr-2 editIcon" @click="editModal(item.id, index)"><i class="material-icons">edit</i></b-button>
                                    
                                    <b-button variant="outline-danger" class="ml-2 deleteIcon" @click="deleteUser(item.id)"><i class="material-icons">delete</i></b-button>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-card>
            </b-col>
        </b-row>     

        <b-modal  ref="addNewUserModal" hide-footer hide-header>
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
                        <h3 class="mb-3">Add New User</h3>
                        <b-row>        
                            <b-col cols="12">
                            <form>
                                <b-form-group>
                                <b-form-input v-model="newUser.name" placeholder="Name" id="name" type="text" size="md"></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                <b-form-input v-model="newUser.email" placeholder="Email" id="email" type="email" size="md"></b-form-input>
                                </b-form-group>
                                <b-form-group>
                                <b-form-input v-model="newUser.phone" placeholder="Phone Number" type="text" size="md"></b-form-input>
                                </b-form-group>
                                <b-button class="siteButton"  @click="addNewUser()">Add New User</b-button>
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

        <b-modal ref="updateDataModal" hide-footer hide-header-close title="Update User">
            <div class="d-block">           
                <b-row>
                    <b-col cols="6">
                        <b-form-group>
                            <b-form-input v-model="editedUser.name" placeholder="First Name"  size="md"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group>
                            <b-form-input v-model="editedUser.email" placeholder="Email Address"  size="md"></b-form-input>
                        </b-form-group>                    
                    </b-col>
                    <b-col cols="12">
                        <b-form-group>
                            <b-form-input v-model="editedUser.phone" placeholder="Phone Number"  size="md" @click.enter="updateUser()"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">                    
                        <b-button class="siteButton" @click="updateUser()">Update</b-button>
                    </b-col>
                </b-row>
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
export default { 
    data(){
        return {
            errors: [],
            newUser: {
                name: null,
                email: null,
                phone: null
            },
            users:[],
            editedUser: {
                name:null,
                phone:null,
                email:null
            },
            editedUserId:'',
            delUserId:'',

            alertMessage: "",
            showAlertError: false,
            showAlertSuccess: false,
            isActiveLoader: false,
            noUserMessage:null,
            userListStatus:null
            }
    },
    methods:{
        fatchUsers(){
            axios.post('http://localhost/vueApis/tempUsers.php',{
            action: "listUsers"
            }).then((response) => {
                if(response.data.status == 1){
                    console.log(response);   
                    this.userListStatus = response.data.status;
                    this.users = response.data.records;
                }else if(response.data.status == 0) {
                    this.userListStatus = response.data.status;
                    this.noUserMessage = response.data.message;
                    console.log(response);
                }
            });
        },
        addNewUser(){            
            this.errors = [];

            if (!this.newUser.name) {
                this.errors.push("Name required.");
            }else if (this.newUser.name.length < 8){
                this.errors.push("User Name required 8 characters");
            }

            if (!this.newUser.email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.newUser.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.newUser.phone) {
                this.errors.push("Phone No required.");
            }else if (!this.validMobile(this.newUser.phone)){
                this.errors.push("Enter 10 Digit Number");
            }

            if (!this.errors.length) {
                this.isActiveLoader = true; 
                axios.post('http://localhost/vueApis/tempUsers.php',{
                name: this.newUser.name,
                email: this.newUser.email,
                phone: this.newUser.phone,
                action: "addNewUser"
                }).then(response=> {
                if(response.data.status == 2){
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        this.showAlertError = true;
                    }, 2000)
                    setTimeout(() => {
                        this.showAlertError = false;
                        this.newUser.email = "";
                        this.newUser.phone = ""
                    }, 5000)
                }else if(response.data.status == 3){
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        this.showAlertError = true;
                    }, 2000)
                    setTimeout(() => {
                        this.showAlertError = false;
                        this.newUser.email = ""
                    }, 5000)
                }else if(response.data.status == 4){
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        this.showAlertError = true;
                    }, 2000)
                    setTimeout(() => {
                        this.showAlertError = false;
                        this.newUser.phone = ""
                    }, 5000)
                }else {
                    console.log(response);
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isActiveLoader = false;
                        this.showAlertSuccess = true;
                    }, 2000)
                    setTimeout(() => {
                        this.showAlertSuccess = false;
                        this.newUser.name = "",
                        this.newUser.email = "",
                        this.newUser.phone = ""  
                        this.$refs['addNewUserModal'].hide();                        
                        this.fatchUsers();     
                    }, 3000)    
                }          
                }).catch(error => {
                console.log(error.message);
                });         
            }
            
        },
        validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        },
        validMobile(phoneNo) {
            var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if(this.newUser.phone.match(phoneNo)) {
            return true;
            }
            else {
            return false;
            }
        },
        hideErrorAlert(){
        this.showAlertError = false;
        },
        updateUser(){ 
            /* Update Data Using API */ 
            axios.post('http://localhost/vueApis/tempUsers.php',{
                user_id:this.editedUserId,
                name:this.editedUser.name,
                phone:this.editedUser.phone,
                email:this.editedUser.email,
                action: "update"
            }).then((response) => {
                console.log(response);
                //const updatedData = response.data;
                //this.users.push(response.updatedData);
                this.editedUser.name = '';
                this.editedUser.phone = '';
                this.editedUser.email = ''; 
                this.fatchUsers();             
            })
           this.$refs['updateDataModal'].hide();
           
        },
        deleteUser(delUser) {
            this.delUserId = delUser;
            /* Update Data Using API */ 
            axios.post('http://localhost/vueApis/tempUsers.php',{
                deleteIdData:this.delUserId,
                action: "deleteUser"
            }).then((response) => {
                console.log(response);
                this.fatchUsers();             
            })
        },
        editModal(userId, index){
            this.editedUserId = userId;
            alert(index);
            this.$refs['updateDataModal'].show();
        },
        addUserModal(){
            this.$refs['addNewUserModal'].show();
        }
    },
    created() {
        this.fatchUsers();
        console.log(this.users.length);
    }  
}; 
</script>