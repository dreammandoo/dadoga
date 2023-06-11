<template>
  <div class="userpage" v-if="watchinguser !== null">
    <div class="userinfo">
      <div>
        <div class="pic">
          <img :src="watchinguser.img" />
        </div>
        <p class="username">{{ watchinguser.nickname }}</p>
      </div>
      <div class="userdetail">
        <p>
          {{ watchinguser.age }}세/
          <span v-if="watchinguser.gender === '0'">남자</span>
          <span v-if="watchinguser.gender === '1'">여자</span>
        </p>
        <p>이메일 : {{ watchinguser.email }}</p>
        <p>{{ watchinguser.level }}레벨</p>
      </div>
    </div>
    <div class="button" v-if="user !== null && watchinguser.id === user.id">
      <router-link class="update" :to="{ name: 'userupdate' }"
        >정보 수정</router-link
      >
      <button @click="deleteuser" class="delete">회원 탈퇴</button>
    </div>
    <div class="menu">
      <div class="menu-item item1" @click="myapply">
        <b-icon icon="bookmark-check-fill"></b-icon>&nbsp;참여한 모임
      </div>
      <div class="menu-item item2" @click="myrecruit">
        <b-icon icon="bookmark-check"></b-icon>&nbsp;만든 모임
      </div>
      <div class="menu-item item3" @click="mycomment">
        <b-icon icon="reply"></b-icon>&nbsp;작성한 댓글
      </div>
      <div class="menu-item item4" @click="message">
        <b-icon icon="chat-text"></b-icon>&nbsp;메시지
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserView",
  computed: {
    ...mapState(["user", "watchinguser"]),
  },
  created() {
    this.$store.dispatch("keeplogin");
    const pathName = new URL(document.location).pathname.split("/");
    const id = pathName[pathName.length - 1];
    this.$store.dispatch("getUser", id);
  },
  methods: {
    myapply() {
      this.$store.dispatch("myApply", this.watchinguser.id);
    },
    myrecruit() {
      this.$store.dispatch("myRecruit", this.watchinguser.id);
    },
    mycomment() {
      this.$store.dispatch("myComment", this.watchinguser.id);
    },
    message() {
      // watchinguser === user이면 msg창에 selectedmsg없이
      // 다를 경우 selectedmsg의 user가 watchinguser가 되도록 => 이사람이랑 메시지를 하자
      this.$store.dispatch("mymessage", this.watchinguser);
    },
    deleteuser() {
      if (confirm("탈퇴하시겠습니까?")) {
        this.$store.dispatch("userDelete", this.user.id);
      }
    },
  },
};
</script>

<style scoped>
.update:hover, .delete.hover{
  font-weight: bolder;
}
.menu-item:hover {
  background-color: rgb(239, 255, 151);
  cursor: pointer;
  font-weight: bolder;
}
.userpage {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 50px;
}

.menu {
  height: 500px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 100px;
}

.userinfo {
  margin-top: 50px;
  height: 200px;
  background-color: lightgray;
  border-radius: 30px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: left;
}

.userdetail {
  text-align: left;
  font-weight:bolder;
}
.pic {
  background-color: black;
  width: 100px;
  height: 100px;
  border-radius: 80px;
  margin: 50px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.username {
  font-size: larger;
  font-weight: bolder;
  width: 200px;
  overflow: auto;
}

.button {
  margin: 15px;
  display: flex;
  justify-content: space-evenly;
}
.update {
  background-color: rgb(255, 120, 120);
  font-size: 30px;
  text-decoration: none;
  color: black;
  border-radius: 20px;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
}

.delete {
  background-color: black;
  color: white;
  font-size: 30px;
  text-decoration: none;
  border-radius: 20px;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
}

.menu-item {
  width: 48%;
  height: 50%;
  border-radius: 30px;
  margin: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.menu-a {
  text-decoration: none;
  color: black;
}
.item1 {
  background-color: aquamarine;
}

.item2 {
  background-color: lightgray;
}

.item3 {
  background-color: lightgray;
}

.item4 {
  background-color: aquamarine;
}
</style>
