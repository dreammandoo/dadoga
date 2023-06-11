<template>
  <div class="update" v-if="user !== null && recruit.recruit_detail.writerid === user.id">
    <h1>글 수정하기</h1>
    <div>
      <div class="loginform">
        <input
          type="text"
          placeholder="제목"
          v-model="recruit.recruit_detail.title"
        />
      </div>
      <div class="loginform">
        <input
          type="datetime-local"
          v-model="recruit.recruit_detail.datetime"
        />
      </div>
      <div class="loginform">
        <input
          type="text"
          placeholder="장소"
          v-model="recruit.recruit_detail.location"
        />
      </div>
      <select class="loginform gender" v-model="recruit.recruit_detail.gender">
        <option selected disabled>성별 조건</option>
        <option v-if="user.gender == 0" value="0">남성</option>
        <option v-if="user.gender == 1" value="1">여성</option>
        <option value="2">상관없음</option>
      </select>
      <div class="loginform">
        <input
          type="number"
          placeholder="제한 인원"
          v-model="recruit.recruit_detail.applierslimit"
        />
      </div>
      <div class="loginform">
        <input
          type="level"
          placeholder="최소 레벨"
          v-model="recruit.recruit_detail.level"
        />
      </div>
      <div class="loginform">
        <input
          type="text"
          placeholder="종목"
          v-model="recruit.recruit_detail.part"
        />
      </div>
      <div class="loginform">
        <textarea rows="10" v-model="recruit.recruit_detail.content">
상세 내용</textarea
        >
      </div>
      <button @click="recruitupdate" class="loginbutton">수정하기</button>
    </div>
  </div>
</template>
<script>
var now_utc = Date.now()
var timeOff = new Date().getTimezoneOffset()*60000;
var today = new Date(now_utc-timeOff).toISOString().substring(0, 16);

import { mapState } from "vuex";
export default {
  name: "RecruitUpdateView",
  computed: {
    ...mapState(["recruit", "user"]),
  },
  created() {
    this.$store.dispatch('keeplogin');
  },
  methods: {
    recruitupdate() {
      if (
        this.recruit.recruit_detail.title === null ||
        this.recruit.recruit_detail.content === null ||
        this.recruit.recruit_detail.location === null ||
        this.recruit.recruit_detail.datetime === null ||
        this.recruit.recruit_detail.part === null ||
        this.recruit.recruit_detail.gender === null
      ) {
        alert("빈 칸을 확인해주세요");
      } else if (this.recruit.recruit_detail.applierslimit === 0) {
        alert("모집 인원은 0명이 될 수 없습니다");
      } else if (
        this.recruit.recruit_detail.applierslimit <
        this.recruit.recruit_detail.appliers
      ) {
        alert("제한 인원은 기존 신청자보다 적을 수 없습니다.");
      } else if (this.recruit.recruit_detail.datetime < today) {
        alert('올바른 날짜를 선택해주세요')
      } else {
        this.$store.dispatch("updateRecruit", this.recruit.recruit_detail);
      }
    },
  },
};
</script>

<style scoped>
.update {
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
