<template>
    <v-container fluid class="fullHeight">
      <v-col>
        <v-col>
          <v-row class="justify-center mb-6">
            <v-col class="blue font-weight-bold white--text shrink text-right rounded mr-2">Time:</v-col>
            <v-col class="white shrink rounded">{{time}}</v-col>
          </v-row>
          <v-row class="justify-center mb-12">
            <v-col class="blue shrink font-weight-bold white--text text-right rounded mr-2">WPM:</v-col>
            <v-col class="white shrink rounded">{{wpm}}</v-col>
          </v-row>
        </v-col>
        <v-divider />
        <v-row class="justify-center my-6"><h1>{{newWord}}</h1></v-row>
        <v-row>
          <v-otp-input class="font-weight-bold" ref="myOtp" @input="checkChange" v-model="wordInput" @finish="checkWord" :length="newWord.length" />
        </v-row>
      </v-col>
    </v-container>
</template>

<script>
export default {
  data:() => ({
    hasStarted: false,
    netWpm: 0,
    time: 60,
    wpm: 0,
    newWord: "",
    wordInput: ""
  }),
  methods:{
    checkWord(){
      if(this.wordInput == this.newWord){
        this.fetchWord()
        this.wordInput = ""
        this.wpm = this.netWpm / 5
      }
    },
    countDownTimer(){
      if(this.hasStarted){
        if(this.time > 0 ){
          setTimeout(()=>{
            this.time--
            this.countDownTimer()
          },1000)
        } else{
          this.hasStarted = false;
          alert('Your speed is: ' + this.wpm + ' Words per Minute!')
          this.wpm = 0
          this.netWpm = 0
        }
      }
    },
    checkChange(){
      if(!this.hasStarted){
        this.hasStarted = true;
        this.netWpm++;
        this.countDownTimer();
      }else{
        this.netWpm++;
      }
    },
    focusInput(){
      setTimeout(() => {
        this.$refs.myOtp.focus()
      },50)
    },
    async fetchWord(){
      await fetch('https://random-word-api.herokuapp.com/word')
        .then(res => res.json()).then(data => {
            this.newWord =  data[0];
            this.focusInput();
        });
    }
  },
  mounted(){
    this.fetchWord()
  }
}
</script>

<style scoped>
.fullHeight{
  height: 100vh;
  background-color: #dedede;
  display: flex;
  padding: 5rem;
}
</style>