<template>
  <div>
    <div class="create" v-if="user !== null">
      <h1>모임 모집하기</h1>
      <div>
        <div class="loginform">
          <input type="text" placeholder="제목" v-model="title" />
        </div>
        <div class="loginform">
          <input type="datetime-local" v-model="datetime"/>
        </div>
        <div class="loginform">
          <input type="text" placeholder="장소" v-model="location" />
        </div>
        <select class="loginform gender" v-model="gender">
          <option selected disabled>성별 조건</option>
          <option v-if="user.gender == 0" value="0">남성</option>
          <option v-if="user.gender == 1" value="1">여성</option>
          <option value="2">상관없음</option>
        </select>
        <div class="loginform">
          <input
            type="number"
            placeholder="제한 인원"
            v-model="applierslimit"
          />
        </div>
        <div class="loginform">
          <input type="number" placeholder="최소 레벨" v-model="level" />
        </div>
        <div class="loginform">
          <input type="text" placeholder="종목" v-model="part" />
        </div>
        <div class="loginform">
          <textarea rows="10" v-model="content">상세 내용</textarea>
        </div>
        <button @click="recruitcreate" class="loginbutton">작성하기</button>
      </div>
    </div>
    <div v-else>로그인 후 이용하세요.</div>
  </div>
</template>

<script>
var now_utc = Date.now()
var timeOff = new Date().getTimezoneOffset()*60000;
var today = new Date(now_utc-timeOff).toISOString().substring(0, 16);

import { mapState } from "vuex";
export default {
  name: "RecruitCreateView",
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.$store.dispatch('keeplogin');
  },
  data() {
    return {
      title: "",
      content: "",
      location: "",
      datetime: "",
      part: "",
      gender: "",
      level: 0,
      applierslimit: 0,
    };
  },
  methods: {
    recruitcreate() {
      if (
        this.title === "" ||
        this.content === "" ||
        this.location === "" ||
        this.datetime === "" ||
        this.part === "" ||
        this.gender === ""
      ) {
        alert("빈 칸을 확인해주세요");
      } else if (this.applierslimit === 0) {
        alert("모집 인원은 0명이 될 수 없습니다");
      } else if (this.datetime < today) {
        alert('올바른 날짜를 선택해주세요')
      } else {
        const recruit = {
          writerid: this.user.id,
          title: this.title,
          content: this.content,
          location: this.location,
          datetime: this.datetime,
          part: this.part,
          gender: this.gender,
          level: this.level,
          applierslimit: this.applierslimit,
        };
        this.$store.dispatch("createRecruit", recruit);
      }
    },
  },
};
</script>

<style scoped>
.create {
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

.loginform {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}
input,
textarea {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid black;
  font-size: 20px;
  width: 100%;
  color: gray;
}

input:focus,
textarea:focus {
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
  margin-bottom: 80px;
}

.gender {
  border: none;
  border-bottom: 3px solid black;
  width: 100%;
}

.gender:focus {
  outline: none;
}
</style>
