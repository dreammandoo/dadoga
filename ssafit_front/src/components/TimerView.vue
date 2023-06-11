<template>
  <div>
    <div id="timer" v-if="user !== null">
      <h1>TIMER</h1>
      <hr>
      <div class="subject_form">
        <input
          placeholder="  어떤 운동을 하시나요?"
          v-on:keyup.enter="insert_sub"
          v-model="input"
          class="todo_input"
          type="text"
        />
        <button @click="insert_sub" class="todo_insert">등록</button>
      </div>
      <p class="current" v-if="timer && !on">
        <b>{{ timer.event }}</b> 쉬는중
      </p>
      <p class="current" v-if="timer && on">
        <b>{{ timer.event }}</b> 공부중
      </p>
      <div class="clock" @click="start">
        <span id="hour"><span v-if="hour < 10">0</span>{{ hour }}</span
        >&nbsp;: <span id="min"><span v-if="min < 10">0</span>{{ min }}</span
        >&nbsp;:
        <span id="sec"><span v-if="sec < 10">0</span>{{ sec }}</span>
      </div>
      <div class="subject_list">
        <div class="s" v-for="timer in timers" :key="timer.id">
          <div class="saved-list" @click="setTimer(timer)">
            <span>{{ timer.event }}</span>
          </div>
          <div class="saved-time">
            <span>{{ timer.timer }}</span>
            <b-icon
              @click="deletetimer(timer.id)"
              class="deletex"
              scale="1.3"
              icon="x"
            ></b-icon>
          </div>
        </div>
      </div>
      <div class="buttonarea">
        <div>
        <button class="clockbutton startofclock" @click="start">시작</button>
        <button class="save" @click="save">저장</button>

        </div>
        <button class="deleteall" @click="deleteall">초기화</button>
      </div>
    </div>
    <div v-else>로그인 후 이용 가능합니다.</div>
  </div>
</template>

<script>
let clock;
import { mapState } from "vuex";
export default {
  name: "TimerView",
  computed: {
    ...mapState(["user", "timers"]),
  },
  created() {
    this.$store.dispatch("keeplogin");
    this.$store.dispatch("timer", this.user.id);
  },
  data() {
    return {
      hour: 0,
      min: 0,
      sec: 0,
      on: false,
      input: "",
      current: "",
      timer: null,
    };
  },
  methods: {
    setTimer(timer) {
      this.timer = timer;
    },
    timelapse() {
      this.sec += 1;
      if (this.sec >= 60) {
        this.sec = 0;
        this.min += 1;
      }
      if (this.min >= 60) {
        this.min = 0;
        this.hour += 1;
      }
    },
    start() {
      var e = document.querySelector(".clockbutton");
      if (!this.on) {
        if (!this.timer) {
          alert("과목을 선택하세요");
        } else {
          clock = setInterval(this.timelapse, 1000);
          this.on = true;
          e.classList.toggle("startofclock");
          e.classList.toggle("endofclock");
          e.innerText = "정지";
        }
      } else {
        clearInterval(clock);
        this.on = false;
        e.classList.toggle("startofclock");
        e.classList.toggle("endofclock");
        e.innerText = "시작";
      }
    },
    insert_sub() {
      if (this.input === "") {
        alert("할 일을 입력하세요");
      } else {
        let timer = {
          userid: this.user.id,
          event: this.input,
        };
        this.$store.dispatch("timerInsert", timer);
        this.input = "";
      }
    },
    save() {
      if (!this.timer) {
        alert("선택한 할일이 없어요");
      } else if (this.on === true) {
        alert("시계를 정지해주세요");
      } else {
        let new_timer = this.timer;
        let time_before = this.timer.timer.split(":");
        let hour = parseInt(time_before[0]);
        let min = parseInt(time_before[1]);
        let sec = parseInt(time_before[2]);

        sec += this.sec;
        if (sec >= 60) {
          sec -= 60;
          min += 1;
        }
        min += this.min;
        if (min >= 60) {
          min -= 60;
          hour += 1;
        }
        hour += this.hour;

        let time_after = String(hour) + ":" + String(min) + ":" + String(sec);
        new_timer.timer = time_after;
        this.$store.dispatch("timerUpdate", new_timer);
      }
      this.sec = 0;
      this.min = 0;
      this.hour = 0;
    },
    deleteall() {
      if (this.on) {
        alert("시계를 정지해주세요");
      } else {
        this.$store.dispatch("timerDeleteAll", this.user.id);
        alert("초기화했습니다.");
        this.timer = null;
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
      }
    },
    deletetimer(id) {
      if (this.on) {
        alert("시계를 정지해주세요");
      } else {
        this.$store.dispatch("timerDelete", [this.user.id, id]);
        if (this.timer.id === id) {
          this.timer = null;
          this.hour = 0;
          this.min = 0;
          this.sec = 0;
        }
        alert("삭제했습니다.");
      }
    },
  },
};
</script>

<style scoped>
#timer {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 100px;
  background-color: aliceblue;
  border: 1px solid aquamarine;
  box-shadow: 1px 1px 10px aquamarine;
  padding: 1%;
  border-radius: 20px;
}

h1 {
  margin-top: 50px;
  margin-bottom: 35px;
  font-size: 50px;
  font-weight: bolder;
}
.clock {
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  border: 3px solid aquamarine;
  border-radius: 30px;
  font-size: 70px;
  font-weight: bolder;
  text-align: center;
  color: aquamarine;
  margin-top: 0;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
}
.subject_form {
  margin-top: 20px;
  margin-bottom: 20px;
}
.todo_input {
  border: 2px solid aquamarine;
  width: 80%;
  margin-right: 5px;
  font-size: 25px;
  border-radius: 10px;
}

.todo_input:focus {
  outline: aquamarine;
}

.todo_insert {
  border: none;
  font-size: 25px;
  border-radius: 10px;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: aquamarine;
}
.subject_list {
  height: 300px;
  overflow: auto;
  font-size: 25px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 2%;
  background-color: rgb(255, 255, 255);
  border-radius: 5%;
}
.s {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
}
.current {
  font-size: 25px;
  color: gray;
  margin-top: 10px;
  margin-bottom: 10px;
}

.saved-list {
  text-align: left;
  padding-right: 5px;
  cursor: pointer;
}

.saved-time {
  text-align: end;
}

.startofclock {
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: gray;
  border: none;
  border-radius: 20px;
  background-color: rgb(138, 255, 214);
  width: 100px;
}

.buttonarea {
  display: flex;
  justify-content: space-around;
}

.startofclock:hover, .todo_insert:hover, .save:hover, .endofclock:hover{
  box-shadow: 0 0 10px rgb(181, 181, 181);
  font-weight: bolder;
}
.endofclock {
  font-size: 30px;
  color: white;
  border: none;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100px;
  border-radius: 20px;
  background-color: rgb(248, 112, 112);
}

.save {
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: none;
  border-radius: 20px;
  width: 100px;
  margin-left: 10px;
  background-color: antiquewhite;
}


.deleteall {
  font-size: 22px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: none;
  width: 100px;
  border-radius: 20px;
  background-color: black;
  color: white;
}

.deletex {
  margin-left: 10px;
}

.deletex:hover {
  color: red;
}
</style>
