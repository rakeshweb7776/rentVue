<template>
<div class="loginContainer">
  
  <div class="commonFormDesign loginSection"> 
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
      <h3 class="mb-3">Registration</h3>
      <b-row>        
        <b-col cols="12">
          <form>
            <b-form-group>
              <b-form-input v-model="registerDetails.name" placeholder="Name" id="name" type="text" size="md"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="registerDetails.email" placeholder="Email" id="email" type="email" size="md"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="registerDetails.phone" placeholder="Phone Number" type="text" size="md"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="registerDetails.password" placeholder="Password" type="password" size="md"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="registerDetails.confirmPassword" placeholder="Confirm Password" type="password" size="md"  v-on:keyup.enter="registerUser()"></b-form-input>
            </b-form-group>
            <b-button class="siteButton"  @click="registerUser()">Register</b-button>
            <hr>
            <p class="loginSignupLink">Already have an account? <router-link to="/login">login Now</router-link></p>            
          </form>
          <ul class="errorListing" v-if="errors.length">
            <li v-bind:key="error.index"  v-for="error in errors">{{ error }}</li>
          </ul>
        </b-col>
      </b-row>
    </b-card>
  </div>
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
  data() {
    return {
      errors: [],
      registerDetails: {
        name: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null
      },
      
      loginUserAlert: "",
      showAlertError: false,
      showAlertSuccess: false,
      isActiveLoader: false,
    };
  },
  methods: {    
    fatchUsers() {},
    registerUser(){
      this.errors = [];
      
      if (!this.registerDetails.name) {
        this.errors.push("Name required.");
      }else if (this.registerDetails.name.length < 8){
        this.errors.push("User Name required 8 characters");
      }

      if (!this.registerDetails.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.registerDetails.email)) {
        this.errors.push('Valid email required.');
      }

      if (!this.registerDetails.phone) {
        this.errors.push("Phone No required.");
      }else if (!this.validMobile(this.registerDetails.phone)){
        this.errors.push("Enter 10 Digit Number");
      }

      if (!this.registerDetails.password) {
        this.errors.push("Password required.");
      }else if (this.registerDetails.password.length < 8){
        this.errors.push("Password required 8 characters");
      }

      if (!this.registerDetails.confirmPassword) {
        this.errors.push("Confirm Password required.");
      }else if (this.registerDetails.confirmPassword.length < 8){
        this.errors.push("Confirm Password required 8 characters");
      }else if (this.registerDetails.password != this.registerDetails.confirmPassword){
        this.errors.push("Not Matching Password");
      }
      
      if (!this.errors.length) {
        this.isActiveLoader = true; 
        axios.post('https://codingkloud.com/rentVue/registerUserApi.php',{
          name: this.registerDetails.name,
          email: this.registerDetails.email,
          phone: this.registerDetails.phone,
          password: this.registerDetails.password,
          confirmPassword: this.registerDetails.confirmPassword,
          action: "registerNewUser"
        }).then(response=> {
          if(response.data.status == 2){
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertError = true;
                swal(this.loginUserAlert, "Seems like something went wrong!", "error",{buttons: false});
              }, 100)
              setTimeout(() => {
                this.showAlertError = false;
                this.registerDetails.email = "";
                this.registerDetails.phone = ""
              }, 100)
          }else if(response.data.status == 3){
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertError = true;
                swal(this.loginUserAlert, "Seems like something went wrong!", "error",{buttons: false});
              }, 100)
              setTimeout(() => {
                this.showAlertError = false;
                this.registerDetails.email = ""
              }, 100)
          }else if(response.data.status == 4){
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertError = true;
                swal(this.loginUserAlert, "Seems like something went wrong!", "error",{buttons: false});
              }, 100)
              setTimeout(() => {
                this.showAlertError = false;
                this.registerDetails.phone = ""
              }, 100)
          }else {
              console.log(response);
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertSuccess = true;
                swal(this.loginUserAlert,"How lovely. Let me take your coat." , "success",{buttons: false, timer: 950});
              }, 100)
              setTimeout(() => {
                this.showAlertSuccess = false;
                this.registerDetails.name = "",
                this.registerDetails.email = "",
                this.registerDetails.phone = "",
                this.registerDetails.password = "",
                this.registerDetails.confirmPassword = ""    
                router.replace('/login');        
              }, 1200)
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
        if(this.registerDetails.phone.match(phoneNo)) {
          return true;
        }
        else {
          return false;
        }
    },
    hideErrorAlert(){
      this.showAlertError = false;
    }
  },
  mounted(){
    
  }
};
</script>