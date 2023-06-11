<template>
  <div class="signup" v-if="user !== null">
    <h1>회원정보 수정</h1>
    <div>
      <div class="loginform">
        <input type="text" placeholder="아이디" v-model="user.loginid" />
      </div>
      <div class="loginform">
        <input type="password" placeholder="비밀번호" v-model="user.password" />
      </div>
      <div class="loginform">
        <input type="password" placeholder="비밀번호 확인" v-model="pw_conf" />
        <p class="pw_confirm warning_pw">{{ warning_pw }}</p>
      </div>
      <div class="loginform">
        <input type="text" placeholder="닉네임" v-model="user.nickname" />
      </div>
      <div class="loginform">
        <input type="email" placeholder="이메일" v-model="user.email" />
      </div>
      <div class="loginform">
        <input type="number" placeholder="나이" v-model="user.age" />
      </div>
      <div class="loginform">
        <label for="gender">성별</label>
        <input
          type="radio"
          class="gender"
          id="male"
          name="gender"
          value="0"
          v-model="user.gender"
        />
        <label for="male">남자</label>
        <input
          type="radio"
          class="gender"
          id="female"
          name="gender"
          value="1"
          v-model="user.gender"
        />
        <label for="female">여자</label>
      </div>
      <button class="signupbutton" @click="userupdate">수정하기</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserUpdateView",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      pw_conf: "",
      warning_pw: "",
    };
  },
  created() {
    this.$store.dispatch('keeplogin');
  },
  watch: {
    // 비밀번호 확인이 기존 비밀번호와 일치하는지 검증
    pw_conf() {
      if (this.pw_conf === "") {
        this.warning_pw = "";
      } else if (this.user.password !== this.pw_conf) {
        this.warning_pw = "비밀번호가 일치하지 않습니다.";
        document.querySelector(".pw_confirm").classList.add("warning_pw");
      } else if (this.user.password === this.pw_conf) {
        this.warning_pw = "비밀번호가 일치합니다.";
        document.querySelector(".pw_confirm").classList.remove("warning_pw");
      }
    },
    password() {
      if (this.pw_conf === "") {
        this.warning_pw = "";
      } else if (this.user.password !== this.pw_conf) {
        this.warning_pw = "비밀번호가 일치하지 않습니다.";
        document.querySelector(".pw_confirm").classList.add("warning_pw");
      } else if (this.user.password === this.pw_conf) {
        this.warning_pw = "비밀번호가 일치합니다.";
        document.querySelector(".pw_confirm").classList.remove("warning_pw");
      }
    },
  },
  methods: {
    userupdate() {
      if (
        (this.user.loginid === "") |
        (this.user.password === "") |
        (this.user.pw_conf === "") |
        (this.user.nickname === "") |
        (this.user.email === "") |
        (this.user.gender === "")
      ) {
        alert("빈 칸을 확인해주세요.");
        this.warning_pw = "";
      } else if (this.user.password !== this.pw_conf) {
        alert("비밀번호가 일치하지 않습니다.");
        this.warning_pw = "";
      } else {
        this.$store.dispatch("userUpdate", this.user);
      }
    },
  }
};
</script>

<style scoped>
.signup {
  width: 40%;
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

.gender {
  margin-right: 10px;
  width: 20px;
  height: 20px;
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

.warning_pw {
  color: red;
}

.signupbutton {
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
