<template>
    <div class="sideBarfixed" :style="{ backgroundImage: `url(${backgroundUrl})` }">
            <div class="dashboardLogo">
                <b-img src="http://ck2.codingkloud.com/wp-content/uploads/2019/09/new_logo_icon-2.png" alt="Responsive image"></b-img>
                CK Rent
            </div>
            <div class="sideBarLinks">
                <router-link to="/dashboard"><i class="material-icons">dashboard</i> <span>Dashboard</span></router-link>  
                <router-link to="/flatList"><i class="material-icons">list</i> <span>Flat List</span></router-link>  
                <router-link to="/renters"><i class="material-icons">work_outline</i> <span>Renter List</span></router-link>  
                <router-link to="/map"><i class="material-icons">settings_applications</i> <span>Water Calculation</span></router-link>            
            </div>
        </div>
</template>

<style>

</style>

<script>
import backgroundUrl from '@/assets/images/sidebar-1.jpg'
export default { 
  data() {
        return {
           backgroundUrl
        }
    }
}; 
</script>