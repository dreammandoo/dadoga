<template>
  <div class="login">
    <h1>로그인</h1>
    <div>
      <div class="loginform">
        <input
          type="text"
          placeholder="아이디"
          v-model="loginid"
          @keyup.enter="login"
        />
      </div>
      <div class="loginform">
        <input
          type="password"
          placeholder="비밀번호"
          v-model="loginpw"
          @keyup.enter="login"
        />
      </div>
      <button @click="login" class="loginbutton">로그인</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      loginid: "",
      loginpw: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    login() {
      if (this.loginid === "" || this.loginpw === "") {
        alert("빈칸을 확인하세요.");
      } else {
        const logininfo = {
          loginid: this.loginid,
          password: this.loginpw,
        };
        this.$store.dispatch("login", logininfo);
        this.loginid = "";
        this.loginpw = "";
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 50px;
}

label {
  font-size: 30px;
  margin-right: 30px;
}
.id {
  margin-right: 50px;
}

.loginform {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}
input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid black;
  font-size: 30px;
  width: 100%;
}

input:focus {
  outline: none;
}

.loginbutton {
  color: black;
  margin-top: 30px;
  font-size: 30px;
  border: none;
  background-color: aquamarine;
  border-radius: 10px;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 100px;
}
</style>
