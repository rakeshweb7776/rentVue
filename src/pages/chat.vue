<template>
    <div>   
        <b-row>
            <b-col>
                <div class="chatContainer">
                    <div class="chatingUsersList" v-if="loggedUserMainDataForContent.userType == 1">

                        <div class="chatUser" v-bind:key="item.index" v-for="item in users" v-bind:data-id="item.id" v-on:click="makeActive(item.id)">
                            <div class="chatUserIcon">
                                <img src="https://www.duffyduffylaw.com/wp-content/uploads/2018/05/user-placeholder.jpg">
                            </div>
                            <div class="chatUserDetails">
                                <h3>{{ item.firstName + ' ' + item.lastName }}</h3>
                                <h6>Renter</h6>
                            </div>
                        </div>

                    </div>
                    <div class="chatingArea" v-bind:class="{ 'chatingAreaFull': loggedUserMainDataForContent.userType == 2 }">
                        <div class="chatShowingArea">

                            <div class="chatInAndOutContainer">                            
                                <!--<div class="chatInComing">
                                    <div class="received_msg">
                                        <h6>Swadeep Sohani</h6>
                                        <p>Hi, what are you doing.</p>
                                        <label>5:00 PM | Today</label>
                                    </div>
                                </div>

                                <div class="chatOutGoing">
                                    <div class="sent_msg">
                                        <h6>Rakesh Pawar</h6>
                                        <p>Hi</p>
                                        <label>5:00 PM | Today</label>
                                    </div>
                                </div>-->
                                <div class="chatMessage" v-bind:key="item.index" v-for="item in chatingData" >
                                    <div v-bind:class="item.sender == loggedUserMainDataForContent.userID ? 'chatOutGoing' : 'chatInComing'">
                                        <div class="chat_msg">
                                            <h6>Rakesh Pawar</h6>
                                            <p>{{ item.text }}</p>
                                            <label>{{ item.timeStamp }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <b-card class="p-1 chatBoxActionContainer">
                            <b-form-input 
                                v-model="sendChatEntry.text"
                                placeholder="Enter something..."
                                rows="1"
                                max-rows="6"
                                @keyup.enter="sendChatMessage"
                                @focus="getDataReadyToSend()"
                                >
                            </b-form-input>
                        </b-card>
                    </div> 
                </div>
            </b-col>
        </b-row> 

    </div>
</template>

<style>

</style>

<script>
import { setTimeout } from 'timers';

export default { 
    props:["loggedUserMainDataForContent"],
    data(){
        return {
            isActive: false,
            errors:[],
            users:[],
            getChatData:{
                recipientId:null
            },
            sendChatEntry:{
                senderId:null,
                recipientId:null,
                text:null
            },
            chatingData:[]
        }
    },
    computed:{
        
    },
    methods:{
        makeActive: function(recipientID) {
            this.isActive = !this.isActive;     
            this.sendChatEntry.recipientId = recipientID;
            this.getChatData.recipientId = recipientID;
            this.fetchChatMessage();
        },
        getDataReadyToSend: function(){        
            if(this.loggedUserMainDataForContent.userType == 2){
                this.sendChatEntry.recipientId = 1;
            }
            this.sendChatEntry.senderId = this.loggedUserMainDataForContent.userID;
        },
        sendChatMessage(){
            axios.post('https://codingkloud.com/rentVue/chatApi.php',{
                senderId: this.sendChatEntry.senderId,
                recipientId: this.sendChatEntry.recipientId,
                text: this.sendChatEntry.text,
                action: "insertChating"
            }).then((response) => {
                this.sendChatEntry.text = '';
                this.fetchChatMessage();
                console.log(response); 
                if(response.data.status == 1){
                    console.log(response);   
                    this.chatingData = response.data.chat;
                }else if(response.data.status == 0) {
                    console.log(response);
                }
            }).catch(error => {
                console.log(error.message);
            });
        },
        fetchChatMessage(){
            if(this.loggedUserMainDataForContent.userType == 2 ){
                this.getChatData.recipientId = this.loggedUserMainDataForContent.userID;
            }
            axios.get('https://codingkloud.com/rentVue/chatApi.php?action=fetchChating&senderId='+this.getChatData.senderId+'&recipientId='+this.getChatData.recipientId).then((response) => {
                console.log(response);
                this.chatingData = response.data.chat;
            }).catch(error => {
                console.log(error.message);
            });
        },
        fatchUsers(){
            axios.post('https://codingkloud.com/rentVue/users.php',{
                action: "listUsers"
            }).then((response) => {
                console.log(response);
                this.users = response.data.users;
            });
        }
        
    },
    mounted(){
        this.fatchUsers();          
        window.setInterval(() => {
           this.fetchChatMessage();   
        }, 1000);
    }
}
/*
{ 
   "chatEntry":[ 
      { 
         "id":"25",
         "messaging":[ 
            { 
               "sender":{ 
                  "id":"40"
               },
               "recipient":{ 
                  "id":"40"
               },
               "timeStamp":"4: 00 PM",
               "message":{ 
                  "text":"Hello Rakesh"
               }
            }
         ]
      }
   ]
}
*/
// setTimeout(function(){
//     console.log('Hello Rakesh');
// },1000)

setTimeout( console.log('Hello Rakesh'), 1000);
</script>