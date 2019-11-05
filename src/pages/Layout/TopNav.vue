<template>
    <div class="topBar">
      <h3>{{ $route.name }}</h3>
      <b-dropdown id="dropdown-right" :text="loggedInUserData.firstName + ' ' + loggedInUserData.lastName" right class="float-right">
        <b-dropdown-item-button @click="logout">Logout</b-dropdown-item-button>
      </b-dropdown>
    </div>
</template>

<style>

</style>

<script>

export default { 
    data() {
      return {
        loggedInUserId:'',
        loggedInUserData: {
          firstName:null,
          lastName:null,
          phone:null
        }
      }
    },
    methods: {
      logout(){
        window.$cookies.remove("user_session");
        setTimeout(() => {
          router.replace('/login');
        }, 1000)
      }      
    },
    mounted(){
      this.loggedInUserId = window.$cookies.get('user_session');   

      axios.post('https://codingkloud.com/rentVue/users.php',{
        loggedInUserId: this.loggedInUserId,
        action: "getLoggedUser"
      }).then((response) => {
          console.log(response);
          this.loggedInUserData.firstName = response.data.records[0].firstName;
          this.loggedInUserData.lastName = response.data.records[0].lastName;
      });

    }
}
</script>