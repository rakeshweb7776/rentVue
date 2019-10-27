<template>
    <div class="commonFormDesign pl-md-5 pr-md-5">
        <b-card>
            <h3>{{ $route.name }}</h3>
            <b-row>
                <b-col cols="6">
                    <b-form-group label-cols="12" label-cols-lg="12" label-size="md" label="First Name" label-for="input-md">
                        <b-form-input v-model="userlist.first_name" placeholder="First Name"  size="md"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label-cols="12" label-cols-lg="12" label-size="md" label="Last Name" label-for="input-md">
                        <b-form-input v-model="userlist.last_name" placeholder="Last Name"  size="md"></b-form-input>
                    </b-form-group>                    
                </b-col>
                <b-col cols="12">
                    <b-form-group label-cols="12" label-cols-lg="12" label-size="md" label="Email Address" label-for="input-md">
                        <b-form-input v-model="userlist.email" placeholder="Email Address"  size="md"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12">                    
                    <b-button class="siteButton" @click="userDetailsUpdate()">Update</b-button>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>


<style>

</style>

<script>

export default { 
    data() {
        return {
            userId: this.$route.params.userId,
            userlist:{}        
        }
    },
    methods:{
       /* userDetailsUpdate: function(){
        this.$http.post('https://reqres.in/api/users/'+this.userId,{
           // userId:this.userlist.id,
            first_name:this.userlist.first_name,
            last_name:this.userlist.last_name,
            email:this.userlist.email
        }).then(function(response){
            console.log(response);
        });
        }*/
    },
    created() {
      /*  this.$http.get('https://reqres.in/api/users?id='+this.userId).then(function(response){            
            this.userlist = response.body.data;
        });*/
    }
}; 
</script>