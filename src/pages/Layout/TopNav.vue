<template>
    <div class="topBar">
      <h3>{{ $route.name }}</h3>
      <b-dropdown id="dropdown-right" :text="loggedUserMainData.userName" right class="float-right">
        <b-dropdown-item-button @click="logout">Logout</b-dropdown-item-button>
      </b-dropdown>
    </div>
</template>

<style>

</style>

<script>
export default {
    props:["loggedUserMainData"],
    data() {
      return {
        loggedInUserId:null,
        loggedInUserType:null,
        loggedInUserData: {
          firstName:null,
          lastName:null,
          phone:null,
          aadhar:null
        }
      }
    },
    methods: {
      logout(){
        $cookies.remove("user_session");
        $cookies.remove("user_type");
        setTimeout(() => {
          router.replace('/login');
        }, 1000)
      }      
    }
}

</script>