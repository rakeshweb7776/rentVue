<template>
    <div class="sideBarfixed" :style="{ backgroundImage: `url(${backgroundUrl})` }">
            <div class="dashboardLogo">
                <b-img src="http://ck2.codingkloud.com/wp-content/uploads/2019/09/new_logo_icon-2.png" alt="Responsive image"></b-img>
                <span>CK Rent</span>
            </div>
            <div class="sideBarLinks" v-if="userType == 1">
                <router-link to="/dashboard"><i class="material-icons">dashboard</i> <span>Dashboard</span></router-link>  
                <router-link to="/flatList"><i class="material-icons">list</i> <span>Flat List</span></router-link>  
                <router-link to="/renters"><i class="material-icons">work_outline</i> <span>Renter List</span></router-link>  
                <router-link to="/waterCalculation"><i class="material-icons">settings_applications</i> <span>Water Calculation</span></router-link> 
                <!-- <router-link to="/chat"><i class="material-icons">chat</i> <span>Chat Box</span></router-link> -->
            </div>
            
            <div class="sideBarLinks" v-if="userType == 2">
                <div class="userProfilePick">
                    <img src="https://www.duffyduffylaw.com/wp-content/uploads/2018/05/user-placeholder.jpg">                   
                </div>
                <div class="userDetails">
                    <h3>{{ loggedUserMainData.userName }}</h3>
                    <p><b>Email:</b> {{ loggedUserMainData.email }}</p>
                    <p><b>Phone:</b> {{ loggedUserMainData.phone }}</p>
                    <p><b>Aadhar:</b> {{ loggedUserMainData.aadhar }}</p>
                </div>
            </div>
            <div class="sideBarLinks mt-3" v-if="userType == 2">
                <router-link to="/userDashboard"><i class="material-icons">dashboard</i> <span>Dashboard</span></router-link>  
                <!-- <router-link to="/chat"><i class="material-icons">chat</i> <span>Chat Box</span></router-link>            -->
            </div>

        </div>
</template>

<style>

</style>

<script>
import backgroundUrl from '@/assets/images/sidebar-1.jpg'
export default { 
    props:["loggedUserMainData"],
    data() {
        return {
           userType: window.$cookies.get('user_type'), 
           backgroundUrl
        }
    }
}; 
</script>