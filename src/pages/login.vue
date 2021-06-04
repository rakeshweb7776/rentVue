<template>
  <div class="loginContainer">
    <div class="commonFormDesign loginSection">
      <div id="loader" v-bind:class="{ loaderActive: isActiveLoader }">
        <svg
          width="100"
          height="100"
          viewBox="0 0 44 44"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#EF4B7C"
        >
          <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="1">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="0s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="1">
              <animate
                attributeName="r"
                begin="-0.9s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="-0.9s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
      
      <b-card>
        <h3 class="mb-3">Login</h3>
        <b-row>
          <b-col cols="12">
            <form>
              <b-form-group>
                <b-form-input
                  v-model="loginUserDetails.email"
                  placeholder="User Email"
                  type="email"
                  size="md"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="loginUserDetails.password"
                  placeholder="Password"
                  type="password"
                  size="md"
                  v-on:keyup.enter="loginUser()"
                ></b-form-input>
              </b-form-group>
              <b-button class="siteButton" @click.enter="loginUser()">Login Now</b-button>
              <hr />
              <p class="loginSignupLink">
                Don't have an account?
                <router-link to="/register">Register here</router-link>
              </p>
            </form>
            <ul class="errorListing" v-if="errors.length">
              <li v-bind:key="error.index" v-for="error in errors">{{ error }}</li>
            </ul>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import axios from 'axios'
export default {
  data() {
    return {
        errors: [],
        loginUserDetails: {
            email: null,
            password: null
        },
        loginUserAlert: "",
        showAlertError: false,
        showAlertSuccess: false,
        isActiveLoader: false,
        loginFormActive: true,
        registerFormActive:false,

        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        is_admin:null,
        loginUserID:null,
        loginUserTYPE:null
    };
  },
  methods: {    
    fatchUsers() {},
    loginUser() {
      
      this.errors = [];
      
      if (!this.loginUserDetails.email) {
        this.errors.push("Please Enter Email Address");
      }
      if (!this.loginUserDetails.password) {
        this.errors.push("Please Enter password");
      }

      if (!this.errors.length) {
        this.isActiveLoader = true;         
        axios.post(server_path+"loginUserApi.php", {
            email: this.loginUserDetails.email,
            password: this.loginUserDetails.password,
            action: "loginNewUser" 
          }).then(response => {
            if (response.data.status == 1) {
                
              console.log(response);
              console.log(response.data.userId);
                           
              this.loginUserAlert = response.data.message;              
              this.is_admin = response.data.userType;
              this.loginUserID = response.data.userId;
              //alert(response.data.userId);
              $cookies.set('user_session', response.data.userId,60 * 60 * 1);
              $cookies.set('user_type', response.data.userType,60 * 60 * 1);
              
              setTimeout(() => {
                this.isActiveLoader = false;
               // this.showAlertSuccess = true;
               swal(this.loginUserAlert,"How lovely. Let me take your coat." , "success",{buttons: false, timer: 950});
              }, 100)
              setTimeout(() => { 
                if(this.is_admin == 1){
                    //alert('userType'+this.is_admin);
                    this.$router.push('dashboard')
                }
                else if(this.is_admin == 2) {
                    this.$router.push('userDashboard')
                }
                else {
                    this.$router.push('waterCalculation')
                } 
              }, 1200)
            } else if (response.data.status == 0) {
              this.loginUserAlert = response.data.message;
                setTimeout(() => {
                  this.isActiveLoader = false;
                  //this.showAlertError = true;
                  swal(this.loginUserAlert, "Seems like something went wrong!", "error",{buttons: false});
                }, 100)
                setTimeout(() => {
                 // this.showAlertError = false;
                  this.loginUserDetails.email = ""
                  this.loginUserDetails.password = ""
                }, 100)
            }                       
          }).catch(error => {
            console.log(error.response);
            this.loginUserAlert = "Login fail due to server error";
            setTimeout(() => {
              this.isActiveLoader = false;
              //this.showAlertError = true;
              swal(this.loginUserAlert, "Seems like something went wrong!", "error",{buttons: false});
            }, 500)
            setTimeout(() => {
              this.showAlertError = false;
              this.loginUserDetails.email = "",
              this.loginUserDetails.password = ""
            }, 1000)
          });    
      }
    },
    hideErrorAlert(){
      this.showAlertError = false;
    }
  }
};
</script>