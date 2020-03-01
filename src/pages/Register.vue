<template>
  <div class="loginContainer">
    <div class="commonFormDesign registerSection">
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
        <h3 v-if="!appHasAdmin" class="mb-3">Renter Registration</h3>
        <h3 v-if="appHasAdmin" class="mb-3">Insert Admin Registration</h3>
        <b-row>
          <b-col cols="12">
            <form>
              <b-row>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.firstName"
                      placeholder="First Name"
                      id="firstName"
                      type="text"
                      size="md"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.lastName"
                      placeholder="Last Name"
                      id="lastName"
                      type="text"
                      size="md"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.email"
                      placeholder="Email"
                      id="email"
                      type="email"
                      size="md"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.phone"
                      v-mask="'###-###-####'"
                      placeholder="Phone Number"
                      type="text"
                      size="md"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group>
                <b-form-input
                  v-model="registerDetails.aadhar"
                  v-mask="'####-####-####'"
                  placeholder="Aadhar Number"
                  id="aadhar"
                  type="email"
                  size="md"
                ></b-form-input>
              </b-form-group>
              <b-row v-if="!appHasAdmin">
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-select
                      v-model="registerDetails.selectedFlat"
                      :options="this.options"
                      value-field="id"
                      text-field="flatName"
                      disabled-field="notEnabled"
                    >
                      <template v-slot:first>
                        <option :value="null" disabled>-- Please select Flat --</option>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.meterStart"
                      placeholder="Meter Start"
                      type="text"
                      size="md"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.password"
                      placeholder="Password"
                      type="password"
                      size="md"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      size="md"
                      v-on:keyup.enter="registerUser()"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-if="!appHasAdmin">
               <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-checkbox
                      id="checkbox-1"
                      v-model="adv_status"
                      name="checkbox-1"
                      value="adv_accepted"
                      unchecked-value="adv_not_accepted"
                    >
                      Advanced Payment
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row v-if="!appHasAdmin && adv_status == 'adv_accepted'">
                <b-col sm="6" xs="12">
                  <b-form-group>
                    <b-form-input
                      v-model="registerDetails.advPayment"
                      placeholder="Advance Amount"
                      type="text"
                      size="md"
                      v-on:keyup.enter="registerUser()"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-button class="siteButton" @click="registerUser()">Register</b-button>
              <span class="loginSignupLink">
                Already have an account?
                <router-link to="/login">login Now</router-link>
              </span>
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
import axios from "axios";
export default {
  data() {
    return {
      adv_status: 'adv_not_accepted',
      errors: [],
      registerDetails: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        aadhar: null,
        selectedFlat: null,
        meterStart: null,
        password: null,
        confirmPassword: null,
        usertype: null,
        advPayment: null
      },

      selectedFile: null,
      options: [],

      loginUserAlert: "",
      showAlertError: false,
      showAlertSuccess: false,
      isActiveLoader: false,
      appHasAdmin: true
    };
  },
  methods: {
    fatchUsers() {
      this.isActiveLoader = true;
      axios
        .post("https://codingkloud.com/rentVue/users.php", {
          action: "checkAdminData"
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            this.registerDetails.usertype = 1;
            this.registerDetails.selectedFlat = 0;
            this.registerDetails.meterStart = 0;
            this.registerDetails.advPayment = 'no-need';
            this.isActiveLoader = false;
          } else {
            this.appHasAdmin = false;
            this.registerDetails.usertype = 2;
            this.isActiveLoader = false;
          }
        });
    },
    fatchFlats() {
      /* Get Flat Data For Form Options */
      axios
        .post("https://codingkloud.com/rentVue/flatListApi.php", {
          action: "listAvailableFlats"
        })
        .then(response => {
          if (response.data.status == 1) {
            console.log(response);
            this.options = response.data.records;
            for (var i = 0; i < this.options.length; i++) {
              var getFlatName = this.options[i].flatName;
              var getFlatRent = this.options[i].baseRent;
              this.options[i].flatName =
                getFlatName + " -- " + "₹ " + getFlatRent + " /-";

              if (this.options[i].status == 1) {
                this.options[i].flatName = getFlatName + " Not Available";
                var newKey = "notEnabled";
                var newValue = true;
                var newObj = this.options[i];
                newObj[newKey] = newValue;
              }
            }
          } else if (response.data.status == 0) {
            this.noRenterMessage = response.data.message;
            console.log(response);
          }
        });
    },
    registerUser() {
      this.errors = [];

      if (!this.registerDetails.firstName) {
        this.errors.push("Name required.");
      }

      if (!this.registerDetails.lastName) {
        this.errors.push("lastName required.");
      }

      if (!this.registerDetails.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.registerDetails.email)) {
        this.errors.push("Valid email required.");
      }

      if (!this.registerDetails.phone) {
        this.errors.push("Phone No required.");
      } else if (!this.validMobile(this.registerDetails.phone)) {
        this.errors.push("Enter 10 Digit Number");
      }
      if (!this.registerDetails.aadhar) {
        this.errors.push("Aadhar No required.");
      } else if (!this.validMobile(this.registerDetails.aadhar)) {
        this.errors.push("Enter 12 Digit Aadhar Number");
      }
      if (this.usertype == 2) {
        if (!this.registerDetails.selectedFlat) {
          this.errors.push("Please Select Flat.");
        }
        if (!this.registerDetails.meterStart) {
          this.errors.push("Please enter Meter Start Reading.");
        }
      }
      if (!this.registerDetails.password) {
        this.errors.push("Password required.");
      } else if (this.registerDetails.password.length < 8) {
        this.errors.push("Password required 8 characters");
      }
      if (!this.registerDetails.confirmPassword) {
        this.errors.push("Confirm Password required.");
      } else if (this.registerDetails.confirmPassword.length < 8) {
        this.errors.push("Confirm Password required 8 characters");
      } else if (this.registerDetails.password != this.registerDetails.confirmPassword) {
        this.errors.push("Not Matching Password");
      }

      if (this.adv_status == 'adv_accepted') {
        if (!this.registerDetails.advPayment) {
          this.errors.push("Please Enter Adv Amount.");
        }  
      }else {
        this.registerDetails.advPayment = 'NA'
      }
      

      if (!this.errors.length) {
        this.isActiveLoader = true;
        axios.post("https://codingkloud.com/rentVue/registerUserApi.php", {
            firstName: this.registerDetails.firstName,
            lastName: this.registerDetails.lastName,
            email: this.registerDetails.email,
            phone: this.registerDetails.phone,
            aadhar: this.registerDetails.aadhar,
            selectedFlat: this.registerDetails.selectedFlat,
            meterStart: this.registerDetails.meterStart,
            password: this.registerDetails.password,
            confirmPassword: this.registerDetails.confirmPassword,
            action: "registerRenter",
            usertype: this.registerDetails.usertype,
            advPayment: this.registerDetails.advPayment
          })
          .then(response => {
            if (response.data.status == 2) {
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertError = true;
                swal(
                  this.loginUserAlert,
                  "Seems like something went wrong!",
                  "error",
                  { buttons: false }
                );
              }, 100);
              setTimeout(() => {
                this.showAlertError = false;
                this.errorEmail = true;
                this.errorPhone = true;
              }, 100);
            } else if (response.data.status == 3) {
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertError = true;
                swal(
                  this.loginUserAlert,
                  "Seems like something went wrong!",
                  "error",
                  { buttons: false }
                );
              }, 100);
              setTimeout(() => {
                this.showAlertError = false;
                this.registerDetails.email = "";
              }, 100);
            } else if (response.data.status == 4) {
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertError = true;
                swal(
                  this.loginUserAlert,
                  "Seems like something went wrong!",
                  "error",
                  { buttons: false }
                );
              }, 100);
              setTimeout(() => {
                this.showAlertError = false;
                this.registerDetails.phone = "";
              }, 100);
            } else if (response.data.status == 5) {
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                swal(
                  this.loginUserAlert,
                  "Seems like something went wrong!",
                  "error",
                  { buttons: false }
                );
              }, 100);
              setTimeout(() => {
                this.showAlertError = false;
              }, 100);
            } else {
              console.log(response);
              this.loginUserAlert = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                //this.showAlertSuccess = true;
                swal(
                  this.loginUserAlert,
                  "How lovely. Let me take your coat.",
                  "success",
                  { buttons: false, timer: 950 }
                );
              }, 100);
              setTimeout(() => {
                this.showAlertSuccess = false;
                (this.registerDetails.name = ""),
                  (this.registerDetails.email = ""),
                  (this.registerDetails.phone = ""),
                  (this.registerDetails.password = ""),
                  (this.registerDetails.confirmPassword = "");
                router.replace("/login");
              }, 1200);
            }
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validMobile(phoneNo) {
      var phoneNo = /^\d{3}-\d{3}-\d{4}$/;
      if (this.registerDetails.phone.match(phoneNo)) {
        return true;
      } else {
        return false;
      }
    },
    hideErrorAlert() {
      this.showAlertError = false;
    }
  },
  mounted() {
    this.fatchFlats();
    this.fatchUsers();
  }
};
</script>