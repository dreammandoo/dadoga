<template>
  <div>
    <div class="mcontainer" v-if="user !== null">
      <h1>메시지</h1>
      <div class="message">
        <div class="userarea">
          <input
            type="text"
            class="searchinput"
            v-model="search"
            placeholder="연락할 유저를 검색하세요"
          />
          <hr>
          <div class="user" v-for="u in users" :key="u.id">
            <p
              v-if="u.id !== user.id && u.nickname.includes(search)"
              @click="selectuser(u)"
              class="nickname"
            >
              {{ u.nickname }}
              <span class="count" v-if="count(u.id) !== 0">{{
                count(u.id)
              }}</span>
            </p>
          </div>
        </div>
        <div class="messagearea" v-if="receiver !== null">
          <div class="receiver">
            <h2 class="receivernickname">{{ receiver.nickname }}</h2>
            <b-icon
              @click="deselect"
              class="close"
              icon="x"
              scale="1.5"
            ></b-icon>
          </div>
          <div class="messagelist">
            <div v-for="m in messages" :key="m.id">
              <div v-if="m.receiverid === receiver.id" class="to">
                <span v-if="m.checked == 0" class="unchecked">1</span>
                <span class="date">{{ dateformat(m.createdtime) }}</span>
                <span class="content">{{ m.content }}</span>
                <br />
              </div>
              <div v-if="m.senderid === receiver.id" class="from">
                <span class="content">{{ m.content }}</span>
                <span class="date">{{ dateformat(m.createdtime) }}</span>
                <br />
              </div>
            </div>
          </div>
          <div class="textform">
            <input
              class="messageinput"
              type="text"
              placeholder="메시지"
              @keyup.enter="sendmessage(receiver)"
              v-model="message"
            />
            <button class="sendbutton" @click="sendmessage(receiver)">
              전송
            </button>
          </div>
        </div>
        <div class="messagearea" v-else-if="watchinguser !== null">
          <div class="receiver">
            <span>{{ watchinguser.nickname }}</span>
            <b-icon @click="deselect" class="close" icon="x"></b-icon>
          </div>
          <div class="messagelist">
            <div v-for="m in messages" :key="m.id">
              <div v-if="m.receiverid === watchinguser.id" class="to">
                <span v-if="m.checked == 0" class="unchecked">1</span>
                <span class="date">{{ dateformat(m.createdtime) }}</span>
                <span class="content">{{ m.content }}</span>
                <br />
              </div>
              <div v-if="m.senderid === watchinguser.id" class="from">
                <span class="content">{{ m.content }}</span>
                <span class="date">{{ dateformat(m.createdtime) }}</span>
                <br />
              </div>
            </div>
          </div>

          <div class="textform">
            <input
              class="messageinput"
              type="text"
              placeholder="메시지"
              @keyup.enter="sendmessage(watchinguser)"
              v-model="message"
            />
            <button class="sendbutton" @click="sendmessage(watchinguser)">
              전송
            </button>
          </div>
        </div>
        <div class="messagearea selectalarm" v-else>메시지를 보낼 상대를 선택하세요.</div>
      </div>
    </div>
    <div v-else>로그인 후 이용이 가능합니다.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MessageView",
  data() {
    return {
      message: "",
      receiver: null,
      search: "",
    };
  },
  computed: {
    ...mapState(["user", "users", "messages", "watchinguser"]),
  },
  created() {
    this.receiver = null;
    this.$store.dispatch("getAllUser");
    this.$store.dispatch("keeplogin");
    this.$store.dispatch("getMessages", this.user.id);
  },
  methods: {
    selectuser(user) {
      this.receiver = user;
      // user한테 받은 메시지들을 읽음 처리
      this.$store.dispatch("selectMessages", [user.id, this.user.id]);
    },
    deselect() {
      this.receiver = null;
      this.$store.dispatch("deselect");
    },
    sendmessage(user) {
      let msg = {
        title: user.nickname,
        senderid: this.user.id,
        receiverid: user.id,
        content: this.message,
      };
      this.$store.dispatch("sendMessage", msg);
      this.message = "";
    },
    dateformat(datetime) {
      let d = datetime.split(" ");
      let ymd = d[0].split("-");
      let time = d[1].split(":");
      return ymd[1] + "/" + ymd[2] + " " + time[0] + ":" + time[1];
    },
    count(id) {
      let count = 0;
      for (let m of this.messages) {
        if (m.senderid === id && m.checked === 0) {
          count += 1;
        }
      }
      return count;
    },
  },
};
</script>

<style scoped>
.message {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-flow: row;
  justify-content: center;
}

h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 50px;
}

.userarea {
  
  min-width: 300px;
  width: 50%;
  border: 1px solid aquamarine;
  height: 500px;
  border-radius: 10px;
}

.messagearea {
  min-width: 300px;
  width: 50%;
  background-color: aquamarine;
  height: 500px;
  border-radius: 10px;
}

.messagelist {
  width: 80%;
  height: 330px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  border-radius: 10px;
}

.searchinput {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid gray;
  font-size: 15px;
  width: 60%;
  margin-top: 20px;
  background-color: aliceblue;
  border: 1px solid;
  border-radius: 5px;
}

.messageinput {
  border: none;
  border-radius: 10px;
  font-size: 20px;
  width: 80%;
  margin-right: 5px;
}
.messageinput:focus {
  outline: none;
}

.searchinput:focus {
  outline: none;
}

.user {
  width: 80%;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  background-color: aliceblue;
  padding-left: 2%;
  border-radius: 10px;
}
.user:hover {
  box-shadow: 1px 1px 5px;
}
.sendbutton {
  color: black;
  border: none;
  background-color: white;
  border-radius: 10px;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  width: 70px;
}

.sendbutton:hover{
  box-shadow: 1px 1px 3px;
  font-weight: bolder;
}

.content {
  background-color: lightgray;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  padding: 10px;
}
.from {
  padding-right: 30%;
  margin: 10px;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: end;
}

.to {
  padding-left: 30%;
  margin: 10px;
  display: flex;
  text-align: left;
  justify-content: end;
  align-items: end;
}

.unchecked {
  margin-right: 5px;
}

.receiver {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close {
  margin-left: 10px;
  background-color: black;
  color:white;
  border-radius: 5px;

}

.close:hover {
  cursor: pointer;
  box-shadow: 1px 1px 3px;
}

.date {
  margin-left: 5px;
  margin-right: 5px;
}

.nickname {
  cursor: pointer;
  font-weight: bolder;
  font-size: 20px;
}


.count {
  background-color: red;
  color: white;
  font-size: 15px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 20px;
}

.receivernickname {
  background-color: white;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
}

.textform {
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  display:flex;
  justify-content: center;
  align-items: center;
}

.selectalarm {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
}
</style>
