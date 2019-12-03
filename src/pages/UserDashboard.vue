<template>
    <div>   
        <b-row>           
            <b-col sm="4" v-bind:key="item.index" v-for="item in users">
                <b-card class="p-0">
                                
                    <b-card-body class="p-0">
                        <b-card-title>{{ item.firstName + ' ' + item.lastName | capitalize }}</b-card-title>
                    </b-card-body>

                    <b-card-body class="p-0 mt-3">
                        <p><b>Flat Assign</b> : FLat No. {{ item.flatId }}</p>
                        <p><b>Base Rent</b> : ₹ 3000 /-</p>
                    </b-card-body>

                    <b-card-body class="p-0 mt-3">
                        <b-button class="siteButton mr-2 pt-1 pb-1" @click.enter="loginUser()">Add Rent</b-button>
                    </b-card-body>
                </b-card> 
            </b-col>              
        </b-row>    
        <b-row class="mt-3">
            <b-col>
                <b-card class="p-1">  
                    <h3>Renters 2</h3>    
                    <b-table-simple responsive bordered striped hover class="m-0">
                        <b-thead>
                            <b-tr>                              
                                <b-th colspan="6"  class="p-2">
                                    <b-form-group class="m-0">
                                        <b-form-input type="text" placeholder="Search" size="md"></b-form-input>                                         
                                    </b-form-group>
                                </b-th>
                            </b-tr>
                            <b-tr>                              
                                <b-th>Full Name</b-th>
                                <b-th>Flat No</b-th>
                                <b-th>Phone</b-th>
                                <b-th>Email</b-th>
                                <b-th>Aadhar</b-th>
                                <b-th>Actions</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-bind:key="item.index" v-for="(item, index) in users">          
                                <b-td>{{ item.firstName + ' ' + item.lastName | capitalize }}</b-td>
                                <b-td>FLat No. {{ item.flatId }}</b-td>
                                <b-td>{{ item.phone }}</b-td>
                                <b-td>{{ item.email }}</b-td>
                                <b-td>{{ item.aadhar }}</b-td>
                                <b-td>
                                    <b-button variant="outline-primary" class="mr-2 editIcon p-0" @click="editModal(item.id, index)"><i class="material-icons">edit</i></b-button>                                    
                                    <b-button variant="outline-danger" class="ml-2 deleteIcon p-0" @click="deleteUser(item.id, item.flatId)"><i class="material-icons">delete</i></b-button>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-card>
            </b-col>
        </b-row> 

        <b-modal class="updateUserDataModal" ref="updateUserDataModal" hide-footer hide-header>
            <div class="d-block">  
                <div class="commonFormDesign pt-2 pb-2">
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
                        <h3 class="mb-3">Update User Details</h3>
                        <b-row>        
                            <b-col cols="12">
                                <form>
                                    <b-row>        
                                        <b-col cols="6">
                                            <b-form-group>
                                                <b-form-input v-model="editedUser.firstName" placeholder="First Name" id="firstName" type="text" size="md"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <b-form-input v-model="editedUser.lastName" placeholder="Last Name" id="lastName" type="text" size="md"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>  
                                    <b-row>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <b-form-input v-model="editedUser.phone" v-mask="'###-###-####'" placeholder="Phone Number" type="text" size="md"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-form-group>
                                                <b-form-input v-model="editedUser.aadhar" v-mask="'####-####-####-####'" placeholder="Aadhar Number" id="aadhar" type="email" size="md"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <b-form-group>
                                        <b-form-select
                                            v-model="editedUser.editedFlat"
                                            :options="this.options"
                                            value-field="id"
                                            text-field="flatName"
                                            disabled-field="notEnabled"
                                        >
                                        <template v-slot:first>
                                            <option :value="null" disabled>-- Please select Flat --</option>
                                        </template>
                                        </b-form-select>
                                        <input type="hidden" name="currentFlatId" :value="editedUser.editedFlat">
                                    </b-form-group>
                                    <b-row>     
                                        <b-col cols="12">                    
                                            <b-button class="siteButton" @click="updateUserData()">Update</b-button>
                                        </b-col>
                                    </b-row>
                                    <ul class="errorListing" v-if="errors.length">
                                        <li v-bind:key="error.index"  v-for="error in errors">{{ error }}</li>
                                    </ul> 
                                </form>                            
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

export default { 
    data(){
        return {
            errors: [],
            users:[],   
            editedUser: {
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                aadhar: null,
                editedFlat:null   
            },
            editedUserId:null,
            delUserId:null,
            deletedUserFlatId:null,
            selectedFile: null,
            alertMessage: "",
            showAlertError: false,
            showAlertSuccess: false,
            isActiveLoader: false,
            options: [],
            currentFlatId:''
        }            
    },
    methods:{
        fatchUsers(){
            axios.post('https://codingkloud.com/rentVue/users.php',{
                action: "listUsers"
            }).then((response) => {
                console.log(response);
                this.users = response.data.users;
            });
        },
        fatchFlats(){
            /* Get Flat Data For Form Options */
            axios.post('https://codingkloud.com/rentVue/flatListApi.php',{
            action: "listAvailableFlats"
            }).then((response) => {
                if(response.data.status == 1){
                    console.log(response);   
                    this.options = response.data.records;                   
                    for(var i = 0; i < this.options.length; i++) {
                        var getFlatName = this.options[i].flatName;
                        var getFlatRent = this.options[i].baseRent;
                        this.options[i].flatName = getFlatName + ' -- ' +  '₹ ' + getFlatRent + ' /-';
                        
                        if(this.options[i].status == 1){
                            this.options[i].flatName = getFlatName + " Not Available";
                            var newKey = 'notEnabled';
                            var newValue = true ;
                            var newObj = this.options[i];
                            newObj[newKey] = newValue;                    
                        }                        
                    }
                }else if(response.data.status == 0) {
                    this.noRenterMessage = response.data.message;
                    console.log(response);
                }
            });
        },
        deleteUser(delUser,delFlatID) {
            this.delUserId = delUser;
            this.deletedUserFlatId = delFlatID;
            /* Update Data Using API */ 
            axios.post('https://codingkloud.com/rentVue/users.php',{
                deleteIdData:this.delUserId,
                action: "deleteUser"
            }).then((response) => {
                console.log(response);
                this.fatchUsers();        
            });
            axios.post('https://codingkloud.com/rentVue/flatListApi.php',{
                deletedUserFlatId:this.deletedUserFlatId,
                action: "updateFlatstatus"
            }).then((response) => {
                console.log(response);
                this.fatchUsers();        
            });            
        },
        editModal(userId, index){
            this.editedUser.firstName = this.users[index].firstName;
            this.editedUser.lastName = this.users[index].lastName;
            this.editedUser.phone = this.users[index].phone;
            this.editedUser.aadhar = this.users[index].aadhar;
            this.editedUser.editedFlat = this.users[index].flatId;            
            this.editedUserId = userId;
            this.currentFlatId = this.editedUser.editedFlat;
            this.$refs['updateUserDataModal'].show();
        },
        updateUserData(){
            this.errors = [];

            if (!this.errors.length) {
                this.isActiveLoader = true; 
                /* Update Data Using API */ 
                axios.post('https://codingkloud.com/rentVue/users.php',{
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
    created() {
        
    },
    mounted(){
        this.fatchUsers();
        this.fatchFlats(); 
    }  
}
</script>