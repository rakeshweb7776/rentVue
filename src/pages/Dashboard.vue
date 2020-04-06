<template>
  <div>
    <b-row>
      <b-col sm="6">
         <monthly-income :barMonthNames='lightBillMonthName' :barMonthData='lightBillMonthData'></monthly-income>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mb-3" sm="4" v-bind:key="item.index" v-for="item in users">
        <b-card class="p-0">
          <b-card-body class="p-0">
            <b-card-title>
              {{ item.firstName + ' ' + item.lastName | capitalize }}
              <b-badge v-if="item.advPayment != 'NA'" variant="primary">
                <span class="whiteColor bold">&#8377;</span>
                {{item.advPayment}} /-
              </b-badge>
            </b-card-title>
          </b-card-body>

          <b-card-body class="p-0 mt-3 userDetailsDashboard">
            <p>
              <b>Flat Assign</b>
              : FLat No. {{ item.flatId }}
            </p>
            <p>
              <b>Base Rent</b> :
              <span class="pinkColor bold">&#8377;</span>
              {{ item.baseRent }} /-
            </p>
            <p>
              <b>Start Date</b>
              : {{ item.userCreatedTime }}
            </p>
          </b-card-body>

          <b-card-body class="p-0 mt-3">
            <b-button              
              class="siteButton mr-2 mb-2 pt-1 pb-1"
              @click.enter="addRentModal(item.id)"
            >Add Rent</b-button>
            <router-link v-bind:to="'/rentRecords/' + item.id" class="siteButton  mb-2 btn btn-secondary pt-1 pb-1">
              <span>View Records</span>
            </router-link>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-modal class="addRentModal" ref="addRentModal" hide-footer hide-header>
      <div class="d-block">
        <div class="commonFormDesign pt-2 pb-2">
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
            <h3 class="mb-3">Add Rent</h3>
            <b-row>
              <b-col cols="12">
                <form>
                  <b-row>
                    <b-col sm="6" xs="12">
                      <b-form-group label="Last Month Reading">
                        <b-form-input
                          placeholder="BMR"
                          @keyup="rentcalculationFunction"
                          v-model.number="renterData.back_month_reading"
                          disabled
                          type="text"
                          size="md"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6" xs="12">
                      <b-form-group label="Current Month Reading">
                        <b-form-input
                          placeholder="CMR"
                          @keyup="rentcalculationFunction"
                          v-model.number="renterData.current_month_reading"
                          type="text"
                          size="md"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6" xs="12">
                      <b-form-group label="Base Rent">
                        <b-form-input
                          placeholder="Rent"
                          @keyup="rentcalculationFunction"
                          v-model.number="renterData.rent"
                          v-bind:disabled="rentValueStatus"
                          type="text"
                          size="md"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6" xs="12">
                      <b-form-group label="Water Charges">
                        <b-form-input
                          placeholder="Water Charges"
                          @keyup="rentcalculationFunction"
                          v-model.number="renterData.water_charge"
                          v-bind:disabled="waterChargesValueStatus"
                          type="text"
                          size="md"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b-button class="siteButton" @click="addRent()">Add Rent</b-button>
                    </b-col>
                  </b-row>
                  <ul class="errorListing" v-if="errors.length">
                    <li v-bind:key="error.index" v-for="error in errors">{{ error }}</li>
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import VueSlideBar from 'vue-slide-bar'
import MonthlyIncome from '@/pages/chart.vue'
export default {
   components: {
        MonthlyIncome,
        VueSlideBar
    },
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      user7AndUser8Data: [],
      waterList: [],
      errors: [],
      flats: [],
      flatsLength: "",
      users: [],
      lightBillData:[],
      lightBillMonthData:[],
      lightBillMonthName:[],
      renterData: {
        renter_id: null,
        back_month_reading: null,
        current_month_reading: null,
        meter_reading: null,
        light_charge: null,
        water_charge: null,
        rent: null,
        month: new Date().getMonth() + 1 + "-" + new Date().getFullYear(),
        total_rent: null
      },
      alertMessage: "",
      showAlertError: false,
      showAlertSuccess: false,
      isActiveLoader: false,
      rentValueStatus: false,
      waterChargesValueStatus: true,
      // backMonthReadingValueStatus:false,
      firstTimeUserStartReading: null,
      water_charge_temp_store: null,
      user7DataReading: 0,
      user8DataReading: 0,
      currentMonth: new Date().getMonth() + 1 + "-" + new Date().getFullYear(),
      rangeValue: {},
      slider: {
        value: 45,
        data: [
          100,
          500,
          1500,
          2000,
          2500,
          3000
        ],
        range: [
          {
            label: '100'
          },
          {
            label: '500',
            // isHide: true
          },
          {
            label: '1500'
          },
          {
            label: '2000'
          },
          {
            label: '2500'
          },
          {
            label: '3000'
          }
        ]
      }
    };
  },
  methods: {
    callbackRange (val) {
      this.rangeValue = val
    },
    fatchFlats() {
      axios
        .post("http://codingkloud.com/rentVue/flatListApi.php", {
          action: "listFlats"
        })
        .then(response => {
          if (response.data.status == 1) {
            console.log(response);
            this.flatListStatus = response.data.status;
            this.flats = response.data.records;
          } else if (response.data.status == 0) {
            this.flatListStatus = response.data.status;
            this.noUserMessage = response.data.message;
            console.log(response);
          }
        });
    },
    fatchUsers() {
      axios
        .post("http://codingkloud.com/rentVue/users.php", {
          action: "listUsers"
        })
        .then(response => {
          console.log(response);
          this.users = response.data.users;
        });
    },
    getRentRecordMonthWise() {
      axios
        .post("http://codingkloud.com/rentVue/addRentApi.php", {
          action: "getRentRecordMonthWise"
        })
        .then(response => {
           if (response.data.status == 1) {
            console.log(response);            
            this.lightBillData = response.data.records;   
            
            for(var i = 0; i < this.lightBillData.length;i++){    
              this.lightBillMonthData.push(this.lightBillData[i].total_charges);
            }
            for (var i = 0; i < this.lightBillData.length; i++) {
              var monthIndex = parseInt(this.lightBillData[i].month) - 1;
              for(var j = 0; j < this.months.length; j++){
                if (j == monthIndex) {                  
                  this.lightBillMonthName.push(this.months[j]);
                }
              }
            }    
           }
        });
    },
    fatchWaterList() {
      axios
        .post("http://codingkloud.com/rentVue/waterCalculationApi.php", {
          action: "getWaterList"
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 1) {
            this.waterList = response.data.waterList;
            if (this.waterList.length) {
              for (var i = 0; i < this.waterList.length; i++) {
                if (this.renterData.month == this.waterList[i].currentMonth) {
                  this.renterData.water_charge = this.waterList[i].perUserWC;
                }
              }
              this.waterChargesValueStatus = true;
              this.water_charge_temp_store = this.renterData.water_charge;
            }
          }
        });
    },
    fatchBackMonthReading() {
      axios.get(
          "http://codingkloud.com/rentVue/addRentApi.php?action=fatchBackMonthReading&records=" +
            this.renterData.renter_id
        )
        .then(response => {
          if (response.data.status == 1) {
            this.renterData.back_month_reading = parseInt(response.data.records[0].current_month_reading);
            // this.backMonthReadingValueStatus = true;
          } else {
            this.renterData.back_month_reading = parseInt(this.firstTimeUserStartReading);
            // this.backMonthReadingValueStatus = false;
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    fatchUser7AndUser8Data() {
      axios
        .post("http://codingkloud.com/rentVue/addRentApi.php", {
          currentMonth:this.currentMonth,
          action: "getUser7AndUser8Data"
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 1) {
            this.user7AndUser8Data = response.data.records;
            if (this.user7AndUser8Data.length) {
              for (var i = 0; i < this.user7AndUser8Data.length; i++) {
                

                if (parseInt(this.user7AndUser8Data[i].renter_id) == 8) {
                  this.user8DataReading = parseInt(this.user7AndUser8Data[i].meter_reading);
                } else {
                  //console.log("no 8 data");
                }
                if (parseInt(this.user7AndUser8Data[i].renter_id) == 7) {
                  this.user7DataReading = parseInt(this.user7AndUser8Data[i].meter_reading);
                } else {
                  //console.log("no 7 data");
                }
                
              }
            }
          }
        });
    },
    rentcalculationFunction() {
      if (
        this.renterData.back_month_reading > 0 && this.renterData.current_month_reading > this.renterData.back_month_reading
      ) {
          if (this.renterData.renter_id == 9) {
                if (this.user7DataReading != null || this.user8DataReading != null) {
                    let tempMeaterReading = this.renterData.current_month_reading - this.renterData.back_month_reading;
                    let user7User8Reading = parseInt(this.user7DataReading) + parseInt(this.user8DataReading);
                    let meaterReadingForUser_9 =  tempMeaterReading - user7User8Reading;
                    this.renterData.meter_reading = meaterReadingForUser_9;
                    this.renterData.light_charge = this.renterData.meter_reading * 8;
                }
          }else {
              this.renterData.meter_reading = this.renterData.current_month_reading - this.renterData.back_month_reading;
              this.renterData.light_charge = this.renterData.meter_reading * 8;
          }
        
        this.renterData.total_rent = this.renterData.light_charge + parseInt(this.renterData.rent) + parseInt(this.renterData.water_charge);
      }
    },
    addRentModal(renterId) {
      this.errors = [];
      this.renterData.current_month_reading = '';
      this.renterData.renter_id = renterId;
      for (var i = 0; i < this.users.length; i++) {
        if (renterId == this.users[i].id) {
          this.renterData.rent = this.users[i].baseRent;
          this.firstTimeUserStartReading = this.users[i].meterStart;
        }
      }
      this.fatchBackMonthReading();
      this.fatchUser7AndUser8Data();
      if (this.renterData.rent !== null) {
        this.rentValueStatus = true;
      }
      if (renterId == 7 || renterId == 8 || renterId == 9) {
        this.renterData.water_charge = "0";
      } else {
        this.renterData.water_charge = this.water_charge_temp_store;
      }
      this.$refs["addRentModal"].show();
    },
    addRent() {
      this.errors = [];

      if (!this.renterData.back_month_reading) {
        this.errors.push("BMR required.");
      }

      if (!this.renterData.current_month_reading) {
        this.errors.push("CMR required.");
      } else if (
        this.renterData.current_month_reading <=
        this.renterData.back_month_reading
      ) {
        this.errors.push("Please enter greater than BMR.");
      }

      if (!this.renterData.rent) {
        this.errors.push("Rent required.");
      }

      if (!this.renterData.water_charge) {
        this.errors.push("Please calculate water charges before add rent.");
      }

      if (this.renterData.renter_id == 9) {
        if (this.user7DataReading <= 0) {
          this.errors.push("Please submit 7 Number Rent.");
        } 
        if (this.user8DataReading <= 0) {
          this.errors.push("Please submit 8 Number Rent.");
        } 
      }

      if (!this.errors.length) {
        this.isActiveLoader = true;
        axios
          .post("http://codingkloud.com/rentVue/addRentApi.php", {
            renter_id: this.renterData.renter_id,
            back_month_reading: this.renterData.back_month_reading,
            current_month_reading: this.renterData.current_month_reading,
            meter_reading: this.renterData.meter_reading,
            light_charge: this.renterData.light_charge,
            water_charge: this.renterData.water_charge,
            rent: this.renterData.rent,
            month: this.renterData.month,
            total_rent: this.renterData.total_rent,
            action: "addRent"
          })
          .then(response => {
            if (response.data.status == 1) {
              this.alertMessage = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                this.$refs["addRentModal"].hide();
                swal(
                  this.alertMessage,
                  "Thanks for using CK-Renter App.",
                  "success",
                  { buttons: false, timer: 1150 }
                );
              }, 100);
              setTimeout(() => {
                //this.fatchWaterList();
                this.renterData.current_month_reading = 0;
              }, 100);
            } else {
              this.alertMessage = response.data.message;
              setTimeout(() => {
                this.isActiveLoader = false;
                this.$refs["addRentModal"].hide();
                swal(
                  this.alertMessage,
                  "Seems like something went wrong!",
                  "error",
                  { buttons: false }
                );
              }, 100);
              setTimeout(() => {
                this.renterData.current_month_reading = 0;
              }, 100);
            }
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  },
  beforeCreate() {},
  created() {
    this.fatchFlats();
    this.fatchUsers();
    this.fatchWaterList();
    this.getRentRecordMonthWise();
  },
  beforeMount() {},
  mounted() {
    if (this.$refs.addRentModal == "hidden.bs.modal") {
      alert("ok");
    }
  },
  computed: {}
};
</script>