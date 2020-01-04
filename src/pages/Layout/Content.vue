<template>
  <transition name="fade" mode="out-in">
    <b-container fluid class="p-4 siteContainerFluid">      
        <router-view v-bind:loggedUserMainDataForContent="loggedUserMainData"></router-view>
    </b-container>
  </transition>
</template>
<script>
  export default {
    props:["loggedUserMainData"],
    data(){
      return {
      }
    },
    methods:{
      
    }
  };
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

 {
  opacity: 0;
}
</style>
