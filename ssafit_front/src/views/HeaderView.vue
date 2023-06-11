<template>
  <div class="header">
    <div class="logo">
      <a class="logo-text" href="/">DADOGA</a>
    </div>
    <div class="menu">
      <div class="item">
        <router-link class="items" :to="{ name: 'recruit' }">모임</router-link>
      </div>
      <div class="item" v-if="user !== null">
        <router-link class="items" :to="{ name: 'todo' }">TODO</router-link>
      </div>
      <div class="item" v-else>
        <span class="items" @click="loginalert">TODO</span>
      </div>
      <div class="item" v-if="user !== null">
        <router-link class="items" :to="{ name: 'timer' }">TIMER</router-link>
      </div>
      <div class="item" v-else>
        <span class="items" @click="loginalert">TIMER</span>
      </div>
      <div v-if="user !== null" class="item">
        <span class="items logout" @click="logout">로그아웃</span>
      </div>
      <div v-if="user !== null" class="item">
        <b-icon
          icon="chat-text"
          class="items chaticon"
          @click="usermessage"
          scale="1.3"
        ></b-icon>
      </div>
      <div v-if="user !== null" class="item">
        <router-link
          class="items"
          :to="{ name: 'user', params: { id: user.id } }"
          >{{ user.nickname }}</router-link
        >
      </div>
      <div v-if="user === null" class="item">
        <router-link class="items" :to="{ name: 'login' }">로그인</router-link>
      </div>
      <div v-if="user === null" class="item">
        <router-link class="items" :to="{ name: 'signup' }"
          >회원가입</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderView",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logout() {
      if (this.$store.state.user === null) {
        alert("잘못된 접근입니다.");
      } else {
        this.$store.dispatch("logout");
      }
    },
    loginalert() {
      alert("로그인 후 이용하실 수 있습니다.");
    },
    usermessage() {
      this.$store.dispatch("userMessage");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: aquamarine;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.logo {
  margin-left: 20px;
}

.logo-text {
  font-size: 80px;
  font-weight: bolder;
  color: white;
  text-decoration: none;
  text-shadow: 3px 3px 3px black;
}
.menu {
  display: flex;
  flex-direction: row;
}
.item {
  height: 100px;
  display: flex;
  align-items: flex-end;
}

.items {
  font-size: 30px;
  color: white;
  text-decoration: none;
  margin-right: 20px;
}

.items:hover {
  color: cornflowerblue;
  cursor: pointer;
}

.message {
  background-color: red;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bolder;
  padding-left: 3px;
  padding-right: 3px;
  margin-right: 7px;
}

.logout:hover {
  cursor: pointer;
}

.chaticon {
  margin-bottom: 5px;
}
</style>
