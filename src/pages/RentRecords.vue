<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="p-1">
          <h3>{{ renterName }} / Flat No.{{ copyRentRecord.roomNo  }} </h3>
          <b-alert
            class="m-0"
            show
            variant="info"
            v-if="!rentRecordListStatus > 0"
          >{{ noRentMessage }}</b-alert>
          <b-table-simple
            responsive
            bordered
            striped
            hover
            class="m-0 recordsTable responsiveTable"
            v-if="rentRecordListStatus > 0"
          >
            <b-thead>
              <b-tr>
                <b-th colspan="10" class="p-2">
                  <b-form-group class="m-0">
                    <b-form-input type="text" placeholder="Search" size="md"></b-form-input>
                  </b-form-group>
                </b-th>
              </b-tr>
              <b-tr>
                <b-th>Month</b-th>
                <b-th>BMR</b-th>
                <b-th>CMR</b-th>
                <b-th>Meter Reading</b-th>
                <b-th>Light Charge</b-th>
                <b-th>Water Charge</b-th>
                <b-th>Base Rent</b-th>
                <b-th>Total Rent</b-th>
                <b-th>Copy</b-th>
                <b-th>Rent Status</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-bind:key="item.index"
                v-for="(item, index) in rentRecord"
                :variant="item.status == 0 ? 'danger' : 'diposited'"
              >
                <b-td>{{ item.monthName }}</b-td>
                <b-td>
                  {{ item.back_month_reading }}
                  <sup>Unit</sup>
                </b-td>
                <b-td>
                  {{ item.current_month_reading }}
                  <sup>Unit</sup>
                </b-td>
                <b-td>
                  {{ item.meter_reading }}
                  <sup>Unit</sup>
                </b-td>
                <b-td>
                  <span class="pinkColor bold">&#8377;</span>
                  {{ item.light_charge }} /-
                </b-td>
                <b-td>
                  <span class="pinkColor bold">&#8377;</span>
                  {{ item.water_charge }} /-
                </b-td>
                <b-td>
                  <span class="pinkColor bold">&#8377;</span>
                  {{ item.rent }} /-
                </b-td>
                <b-td>
                  <span class="pinkColor bold">&#8377;</span>
                  {{ item.total_rent }} /-
                </b-td>
                <b-td>
                  <b-button
                    variant="outline-primary"
                    class="mr-2 editIcon p-0"
                    @click="copyRent(index)"
                  >
                    <i class="material-icons">file_copy</i>
                  </b-button>
                </b-td>
                <b-td>
                  <b-button
                    class="p-0 pl-2 pr-2"
                    size="sm"
                    v-if="item.status == 1"
                    variant="success"
                    @click="pendingStatus(item.id)"
                  >Diposited</b-button>
                  <b-button
                    class="p-0 pl-2 pr-2"
                    size="sm"
                    v-if="item.status == 0"
                    variant="danger"
                    @click="dipositedStatus(item.id)"
                  >Pending</b-button>
                </b-td>
              </b-tr>
            </b-tbody>
            <b-tfoot>
              <b-tr>
                <b-td colspan="10">
                  <span class="pink bold">
                    Total Pending Rent :
                    <span class="pinkColor bold">&#8377;</span>
                    {{ totalRent }} /-
                  </span>
                </b-td>
                <!-- <b-td colspan="7"><span class="pink bold">Current Month Rent : <span class="pinkColor bold">&#8377;</span> {{ currentMonthRentAmount }} /-</span></b-td> -->
              </b-tr>
            </b-tfoot>
          </b-table-simple>
        </b-card>
      </b-col>
    </b-row>

    <b-modal class="recordCopyModal" ref="recordCopyModal" hide-footer hide-header>
      <div class="d-block">
        <b-card>
          <h3>{{renterName}}</h3>
          <h4 class="mb-3">{{ copyRentRecord.monthName }} Rent Details</h4>
          <div class="copyRecord">
            <p>Flat No : {{ copyRentRecord.roomNo }}</p>
            <p>Month: {{ copyRentRecord.monthName }}</p>
            <p>
              Meter Reading Start: {{ copyRentRecord.bmr }}
              <sup>Unit</sup>
            </p>
            <p>
              Meter Reading End: {{ copyRentRecord.cmr }}
              <sup>Unit</sup>
            </p>
            <p>
              Total Reading: {{ copyRentRecord.meter_reading }}
              <sup>Unit</sup>
              * 8 - {{ copyRentRecord.light_charge }} /-
            </p>
            <p>Water Charge: &#8377; {{ copyRentRecord.water_charge }} /-</p>
            <p>Total Rent: &#8377; {{ copyRentRecord.total_rent }} /-</p>
          </div>

          <a class="whatsUpShare" :href="dynamicUrl" data-action="share/whatsapp/share">
            <img :src="whatsappIcon" />
          </a>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<style>
</style>

<script>
import whatsappIcon from "@/assets/images/whatsapp.png";
export default {
  data() {
    return {
      whatsappIcon,
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
      checked: false,
      userId: this.$route.params.userId,
      rentRecord: [],
      userlist: {},
      users: [],
      rentRecordListStatus: null,
      noRentMessage: null,
      currentMonthRentAmount: null,
      lastRecordIndex: null,
      renterName: null,
      copyRentRecord: {
        roomNo: null,
        month: null,
        monthName: null,
        bmr: null,
        cmr: null,
        meter_reading: null,
        water_charge: null,
        light_charge: null,
        total_rent: null
      },
      currentMonth: new Date().getMonth() + 1 + "-" + new Date().getFullYear(),
      dynamicUrl: null
    };
  },
  methods: {
    getRentsRecords() {
      axios
        .get(
          "https://codingkloud.com/rentVue/addRentApi.php?action=getRentRecords&records=" +
            this.userId
        )
        .then(response => {
          if (response.data.status == 1) {
            console.log(response);
            this.rentRecord = response.data.records;
            this.rentRecordListStatus = response.data.status;

            for (var i = 0; i < this.rentRecord.length; i++) {
              var monthDate = this.rentRecord[i].month;              
              var arr1 = monthDate.split('-');
              var monthIndex = parseInt(arr1[0]) - 1; 
              for(var j = 0; j < this.months.length; j++){
                if (j == monthIndex) {                  
                  this.rentRecord[i]["monthName"] = this.months[j];
                }
              }
            }

          } else if (response.data.status == 0) {
            this.rentRecordListStatus = response.data.status;
            this.noRentMessage = response.data.message;
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error.message);
        });

      axios
        .get(
          "https://codingkloud.com/rentVue/addRentApi.php?action=getUserNameRecords&records=" +
            this.userId
        )
        .then(response => {
          if (response.data.status == 1) {
            console.log(response);
            this.renterName = response.data.records[0].firstName + " " + response.data.records[0].lastName;
            this.copyRentRecord.roomNo = response.data.records[0].flatId;
          } else if (response.data.status == 0) {
            this.noRentMessage = response.data.message;
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    copyRent(recordID) {
      this.copyRentRecord.monthName = this.rentRecord[recordID].monthName;
      this.copyRentRecord.bmr = this.rentRecord[recordID].back_month_reading;
      this.copyRentRecord.cmr = this.rentRecord[recordID].current_month_reading;
      this.copyRentRecord.meter_reading = this.rentRecord[recordID].meter_reading;
      this.copyRentRecord.water_charge = this.rentRecord[recordID].water_charge;
      this.copyRentRecord.light_charge = this.rentRecord[recordID].light_charge;
      this.copyRentRecord.total_rent = this.rentRecord[recordID].total_rent;
      this.$refs["recordCopyModal"].show();

      this.dynamicUrl =
        "whatsapp://send?text=" +
        this.renterName +
        "%0a" +
        "Month: " +
        this.copyRentRecord.monthName +
        "%0a" +
        "Flat No: " +
        this.copyRentRecord.roomNo +
        "%0a" +
        "Meter Reading Start: " +
        this.copyRentRecord.bmr +
        "%0a" +
        "Meter Reading End: " +
        this.copyRentRecord.cmr +
        "%0a" +
        "Total Reading: " +
        this.copyRentRecord.meter_reading +
        " X 8 = " +
        this.copyRentRecord.light_charge +
        " /- %0a Water Charge: ₹" +
        this.copyRentRecord.water_charge +
        " /- %0a" +
        "Total Rent: ₹" +
        this.copyRentRecord.total_rent +
        " /-";
    },
    dipositedStatus(recordID) {
      axios
        .post("https://codingkloud.com/rentVue/addRentApi.php", {
          rentRecordID: recordID,
          action: "updateDipositedRentRecordStatus"
        })
        .then(response => {
          console.log(response);
          this.getRentsRecords();
        });
    },
    pendingStatus(recordID) {
      axios
        .post("https://codingkloud.com/rentVue/addRentApi.php", {
          rentRecordID: recordID,
          action: "updatePendingRentRecordStatus"
        })
        .then(response => {
          console.log(response);
          this.getRentsRecords();
        });
    }
  },
  computed: {
    totalRent: function() {
      let sum = 0;
      this.rentRecord.forEach(function(item) {
        if (item.status == 0) {
          sum += parseFloat(item.total_rent);
        }
      });
      return sum;
    }
  },
  created() {
    this.getRentsRecords();
  },
  mounted() {}
};
</script>