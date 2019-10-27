<template>
<div>
    <div class="wrapper">
        
        <side-bar></side-bar>

        <div class="mainContent">  

            <top-nav></top-nav>
              
            <dashboard-content> </dashboard-content> 

                      
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
    }    
}; 
</script>