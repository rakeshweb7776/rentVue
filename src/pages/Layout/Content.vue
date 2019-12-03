<template>
  <transition name="fade" mode="out-in">
    <b-container fluid class="p-4">      
        <router-view></router-view>
    </b-container>
  </transition>
</template>
<script>
  export default {
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
