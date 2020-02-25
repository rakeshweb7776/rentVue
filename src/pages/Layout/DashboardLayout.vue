<template>
<div>
    <div class="wrapper">
        
        <side-bar v-bind:loggedUserMainData='fetchedUserMainData'></side-bar>

        <div class="mainContent">

            <top-nav v-bind:loggedUserMainData='fetchedUserMainData'></top-nav>
              
            <dashboard-content v-bind:loggedUserMainData='fetchedUserMainData'> </dashboard-content>
                      
        </div>    
    </div>
</div>
</template>

<style>
@import "https://fonts.googleapis.com/css?family=Material+Icons";
</style>

<script>
import DashboardContent from "./Content.vue";
import SideBar from "./SideBar.vue";
import TopNav from './TopNav'

export default { 
    components: {
        DashboardContent,
        TopNav,
        SideBar
    },
    data() {
        return {
                fetchedUserMainData:{ 
                    userID:null,
                    userName:null,
                    email:null,
                    phone:null,
                    aadhar:null,
                    userType:null
                }
        }
    },
    mounted(){
      this.loggedInUserId = $cookies.get('user_session');  
      this.loggedInUserType = $cookies.get('user_type');

      axios.post('https://codingkloud.com/rentVue/users.php',{
        loggedInUserId: this.loggedInUserId,
        action: "getLoggedUser"
      }).then((response) => {
          console.log(response);
          this.fetchedUserMainData.userName = response.data.records[0].firstName + ' ' + response.data.records[0].lastName;
          this.fetchedUserMainData.email = response.data.records[0].email;
          this.fetchedUserMainData.phone = response.data.records[0].phone;
          this.fetchedUserMainData.aadhar = response.data.records[0].aadhar;
          this.fetchedUserMainData.userType = parseInt(response.data.records[0].usertype);
          this.fetchedUserMainData.userID = parseInt(response.data.records[0].id);          
      });

    }   
}; 
</script>