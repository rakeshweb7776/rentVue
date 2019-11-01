<template>
    <div>       
         <b-row>
            <b-col>
                <b-card class="p-1">      
                    <!-- <b-alert class="m-0" show variant="info">{{ noUserMessage }}</b-alert>           -->
                    <b-table-simple responsive bordered striped hover class="m-0">
                        <b-thead>
                            <b-tr>
                                <b-th>Id</b-th>                                
                                <b-th>Name</b-th>
                                <b-th>Phone</b-th>
                                <b-th>Email</b-th>
                                <b-th>Actions</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-bind:key="item.index" v-for="(item, index) in users">
                                <b-td>{{ item.id }}</b-td>               
                                <b-td>{{ item.name }}</b-td>
                                <b-td>{{ item.phone }}</b-td>
                                <b-td>{{ item.email }}</b-td>
                                <b-td>                                    
                                    <b-button variant="outline-primary" class="mr-2 editIcon" @click="editModal(item.id, index)"><i class="material-icons">edit</i></b-button>
                                    
                                    <b-button variant="outline-danger" class="ml-2 deleteIcon" @click="deleteUser(item.id)"><i class="material-icons">delete</i></b-button>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-card>
            </b-col>
        </b-row>     

    </div>
</template>

<style scoped>  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
export default { 
    data(){
        return {
            users:[]
        }            
    },
    methods:{    
    },
    created() {
    },
    mounted(){
      axios.post('https://codingkloud.com/rentVue/users.php',{
        action: "listUsers"
      }).then((response) => {
          console.log(response);
          this.users = response.data.users;
      });
    }  
}
    

</script>