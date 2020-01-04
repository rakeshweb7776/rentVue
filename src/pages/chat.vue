<template>
    <div>   
        <b-row>
            <b-col>
                <div class="chatContainer">
                    <div class="chatingUsersList">

                        <div class="chatUser active">
                            <div class="chatUserIcon">
                                <img src="https://www.duffyduffylaw.com/wp-content/uploads/2018/05/user-placeholder.jpg">
                            </div>
                            <div class="chatUserDetails">
                                <h3>Rajkumar Dhakad</h3>
                                <h6>Renter</h6>
                            </div>
                        </div>

                        <div class="chatUser">
                            <div class="chatUserIcon">
                                <img src="https://www.duffyduffylaw.com/wp-content/uploads/2018/05/user-placeholder.jpg">
                            </div>
                            <div class="chatUserDetails">
                                <h3>Rajkumar Dhakad</h3>
                                <h6>Renter</h6>
                            </div>
                        </div>

                        <div class="chatUser">
                            <div class="chatUserIcon">
                                <img src="https://www.duffyduffylaw.com/wp-content/uploads/2018/05/user-placeholder.jpg">
                            </div>
                            <div class="chatUserDetails">
                                <h3>Rajkumar Dhakad</h3>
                                <h6>Renter</h6>
                            </div>
                        </div>

                    </div>
                    <div class="chatingArea">
                        <div class="chatShowingArea">

                            <div class="chatInAndOutContainer">
                            
                                <!-- <div class="chatInComing">
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
                                </div>    -->
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
                            <b-form-textarea
                                id="textarea"
                                placeholder="Enter something..."
                                rows="1"
                                max-rows="6"
                                @keyup.enter="fetchChatMessage()"
                                >
                            </b-form-textarea>
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

export default { 
    props:["loggedUserMainDataForContent"],
    data(){
        return {
            errors:[],
            waterList:[],
            waterCalculation: {
                currentMonth:new Date().getMonth() + 1 + '-' + new Date().getFullYear(),
                bmr:0,
                cmr:0,
                totalMR:0,
                totalWC:0,
                perUserWC:0
            },
            alertMessage:null,
            bmrValueStatus:false,
            isLoaderActive:false,
            getChatData:{
                senderId:"1",
                recipientId:"55"
            },
            chatingData:[]
        }
    },
    computed:{
        
    },
    methods:{
        fatchWaterList(){
            axios.post('https://codingkloud.com/rentVue/waterCalculationApi.php',{
                action: "getWaterList"
            }).then((response) => {
                console.log(response);
                this.waterList = response.data.waterList;
                if(this.waterList.length) {
                    let getLastMonthReading = this.waterList[this.waterList.length - 1];                    
                    this.waterCalculation.bmr = parseInt(getLastMonthReading.cmr);      
                    this.bmrValueStatus = true;              
                }
            });
        },
        setAttrToBMR(){
           // console.log(this.event);
        },
        addWaterCalculation(){            
            this.errors = [];

            if (!this.waterCalculation.bmr) {
                this.errors.push("BMR required.");
            }  

            if (!this.waterCalculation.cmr) {
                this.errors.push("CMR required.");
            }else if (this.waterCalculation.cmr <= this.waterCalculation.bmr){
                this.errors.push("Please enter greater than BMR.");
            }            

            if (!this.errors.length) {
                this.isLoaderActive = true; 
                axios.post('https://codingkloud.com/rentVue/waterCalculationApi.php',{
                currentMonth: this.waterCalculation.currentMonth,
                bmr: this.waterCalculation.bmr,
                cmr: this.waterCalculation.cmr,
                totalMR: this.waterCalculation.totalMR,
                totalWC: this.waterCalculation.totalWC,
                perUserWC: this.waterCalculation.perUserWC,
                action: "addWaterCalculation"
                }).then(response=> {
                if(response.data.status == 1){
                    this.alertMessage = response.data.message;
                    setTimeout(() => {    
                        this.isLoaderActive = false; 
                        swal(this.alertMessage, "Seems like something went wrong!", "error",{buttons: false});
                    }, 100)
                    setTimeout(() => {                     
                        this.waterCalculation.cmr = 0;
                        this.waterCalculation.totalMR = 0;
                        this.waterCalculation.totalWC = 0;
                        this.waterCalculation.perUserWC = 0;
                    }, 100)
                }else {
                    this.alertMessage = response.data.message;
                    setTimeout(() => {
                        this.isLoaderActive = false;       
                        swal(this.alertMessage, "Thanks for using CK-Renter App.", "success",{buttons: false, timer: 1150});
                    }, 100)
                    setTimeout(() => {
                        this.fatchWaterList();
                        this.showAlertError = false;
                        this.waterCalculation.bmr = 0;
                        this.waterCalculation.cmr = 0;
                        this.waterCalculation.totalMR = 0;
                        this.waterCalculation.totalWC = 0;
                        this.waterCalculation.perUserWC = 0;
                    }, 100)
                }}).catch(error => {
                    console.log(error.message);
                });                
            }
            
        },
        watercalculationFunction(){
            if(this.waterCalculation.bmr > 0 && this.waterCalculation.cmr > this.waterCalculation.bmr) {
                this.waterCalculation.totalMR = this.waterCalculation.cmr - this.waterCalculation.bmr;
                console.log("Testing" + this.waterCalculation.totalMR);
                this.waterCalculation.totalWC = this.waterCalculation.totalMR * 8;
                this.waterCalculation.perUserWC = Math.trunc( this.waterCalculation.totalWC / 6 );
            }else {
                this.waterCalculation.totalMR = 0;
                this.waterCalculation.totalWC = 0;
                this.waterCalculation.perUserWC = 0;
            }
        },
        fetchChatMessage(){
            axios.get('https://codingkloud.com/rentVue/chatApi.php?action=fetchChating&senderId='+this.getChatData.senderId+'&recipientId='+this.getChatData.recipientId).then((response) => {
                console.log(response);
                this.chatingData = response.data.chat;
                /*if(response.data.status == 1){
                    console.log(response);   
                    //this.rentRecord = response.data.records;
                    //this.rentRecordListStatus = response.data.status;
                }else if(response.data.status == 0) {
                    this.rentRecordListStatus = response.data.status;
                    this.noRentMessage = response.data.message;
                    console.log(response);
                }*/
            }).catch(error => {
                console.log(error.message);
            });
        }
    },
    mounted(){
        this.fatchWaterList();  
       this.fetchChatMessage();      
    }
}; 
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
</script>