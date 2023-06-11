<template>
  <div class="detail">
    <h1>{{ recruit.recruit_detail.title }}</h1>
    <div class="buttons" v-if="user !== null">
      <router-link
        :to="{ name: 'recruitupdate' }"
        class="button update"
        v-if="user !== null && user.id === recruit.recruit_detail.writerid"
        >수정하기</router-link
      >
      <button
        @click="recruitdelete"
        class="button delete"
        v-if="user !== null && user.id === recruit.recruit_detail.writerid"
      >
        삭제하기
      </button>
    </div>
    <hr />
    <div class="cont">
      <div class="content">
        <div class="cont-title">모임 날짜</div>
        <div class="cont-content">
          {{ recruit.recruit_detail.datetime }}
        </div>
      </div>
      <div class="content">
        <div class="cont-title">모임 장소</div>
        <div class="cont-content">
          {{ recruit.recruit_detail.location }}
        </div>
      </div>
      <div class="content">
        <div class="cont-title">주최자</div>
        <div class="cont-content">
          <router-link
            :to="{
              name: 'user',
              params: { id: recruit.recruit_detail.writerid },
            }"
            class="userlink"
            >{{ recruit.recruit_detail.nickname }}&nbsp;&nbsp;</router-link
          >
          <b-icon
            v-if="user !== null && user.id !== recruit.recruit_detail.writerid"
            icon="chat-text"
            scale="1.3"
            class="sendmessage"
            @click="sendmessage(recruit.recruit_detail.writerid)"
          ></b-icon>
        </div>
      </div>
      <div class="content">
        <div class="cont-title">성별 조건</div>
        <div class="cont-content">
          <span v-if="recruit.recruit_detail.gender === 0">남성</span>
          <span v-if="recruit.recruit_detail.gender === 1">여성</span>
          <span v-if="recruit.recruit_detail.gender === 2">상관없음</span>
        </div>
      </div>
      <div class="content">
        <div class="cont-title">제한 레벨</div>
        <div class="cont-content">
          <span>{{ recruit.recruit_detail.level }}레벨</span>
        </div>
      </div>

      <div class="content">
        <div class="cont-title">인원</div>
        <div class="cont-content">
          {{ recruit.recruit_detail.appliers }}/{{
            recruit.recruit_detail.applierslimit
          }}
        </div>
      </div>
      <div class="content">
        <div class="cont-title">종목</div>
        <div class="cont-content">
          {{ recruit.recruit_detail.part }}
        </div>
      </div>
      <div class="content">
        <div class="cont-title">상세 내용</div>
        <div class="cont-content">
          {{ recruit.recruit_detail.content }}
        </div>
      </div>
      <div class="finish-div">
        <button
          v-if="
            user !== null &&
            recruit.recruit_detail.done === 0 &&
            recruit.recruit_detail.writerid === user.id
          "
          class="finish"
          @click="finish"
        >
          마감하기
        </button>
        <button v-if="recruit.recruit_detail.done === 1" class="finished">
          마감되었습니다
        </button>
      </div>
    </div>
    <hr />
    <div>
      <div v-for="apply in recruit.apply_list" :key="apply.id">
        <div class="loginform">
          <span class="nicknamearea">{{ apply.title }}</span>
          <span class="type apply">참가</span>
          <span class="contentarea">{{ apply.content }}</span>
          <span
            v-if="
              user !== null &&
              user.id === apply.creatorid &&
              recruit.recruit_detail.done === 0
            "
          >
            <b-icon
              class="deletex"
              @click="applydelete"
              scale="1.3"
              icon="x"
            ></b-icon>
          </span>
        </div>
      </div>
      <div
        class="reply"
        v-for="comment in recruit.comment_list"
        :key="comment.id"
      >
        <div class="loginform">
          <span class="nicknamearea">{{ comment.title }}</span>
          <span class="type comment">후기</span>
          <span class="contentarea">{{ comment.content }}</span>
          <span v-if="user !== null && user.id === comment.creatorid">
            <b-icon
              class="deletex"
              @click="applydelete"
              scale="1.3"
              icon="x"
            ></b-icon>
          </span>
        </div>
      </div>
      <div
        class="loginform"
        v-if="
          user !== null &&
          user.id !== recruit.recruit_detail.writerid &&
          recruit.recruit_detail.done === 0 &&
          (user.gender == recruit.recruit_detail.gender ||
            recruit.recruit_detail.gender == 2)
        "
      >
        <input
          type="text"
          class="form"
          v-model="applycontent"
          @keyup.enter="applycreate"
          placeholder="참가 신청"
        />
        <button @click="applycreate" class="submit apply">참가하기</button>
      </div>
      <div
        v-if="
          user !== null &&
          recruit.recruit_detail.gender !== 2 &&
          user.gender != recruit.recruit_detail.gender &&
          recruit.recruit_detail.done === 0 &&
          user.id !== recruit.recruit_detail.writerid
        "
      >
        신청 조건이 일치하지 않습니다.
      </div>
      <div
        class="warning"
        v-if="user === null && recruit.recruit_detail.done == 0"
      >
        로그인 후 신청이 가능합니다.
      </div>
      <div
        class="loginform"
        v-if="
          user !== null &&
          user.id !== recruit.recruit_detail.writerid &&
          recruit.recruit_detail.done === 1
        "
      >
        <input
          type="text"
          class="form"
          v-model="commentcontent"
          @keyup.enter="commentcreate"
          placeholder="후기 작성"
        />
        <button @click="commentcreate" class="submit comment">후기작성</button>
      </div>
      <div
        class="warning"
        v-if="user === null && recruit.recruit_detail.done == 1"
      >
        로그인 후 후기 작성이 가능합니다.
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RecruitDetailView",
  data() {
    return {
      applycontent: "",
      commentcontent: "",
    };
  },
  computed: {
    ...mapState(["recruit", "user"]),
  },
  created() {
    this.$store.dispatch("keeplogin");
    const pathName = new URL(document.location).pathname.split("/");
    const id = pathName[pathName.length - 1];
    this.$store.dispatch("getRecruit", id);
  },
  methods: {
    finish() {
      let r = this.recruit.recruit_detail;
      delete r.nickname;
      r.done = 1;
      this.$store.dispatch("finishRecruit", r);
    },
    recruitdelete() {
      this.$store.dispatch("deleteRecruit", this.recruit.recruit_detail.id);
    },
    applycreate() {
      if (this.applycontent === "") {
        alert("빈 칸을 확인하세요");
      } else {
        const apply = {
          title: this.user.nickname,
          recruitid: this.recruit.recruit_detail.id,
          creatorid: this.user.id,
          content: this.applycontent,
        };
        this.$store.dispatch("createApply", apply);
        this.applycontent = "";
      }
    },
    commentcreate() {
      if (this.commentcontent === "") {
        alert("빈 칸을 확인하세요");
      } else {
        const comment = {
          title: this.user.nickname,
          recruitid: this.recruit.recruit_detail.id,
          creatorid: this.user.id,
          content: this.commentcontent,
        };
        this.$store.dispatch("createComment", comment);
        this.commentcontent = "";
      }
    },
    applydelete() {
      if (confirm("삭제하시겠습니까?")) {
        this.$store.dispatch("deleteApply", [
          this.user.id,
          this.recruit.recruit_detail.id,
        ]);
      }
    },
    commentdelete() {
      if (confirm("삭제하시겠습니까?")) {
        this.$store.dispatch("deleteComment", [
          this.user.id,
          this.recruit.recruit_detail.id,
        ]);
      }
    },
    sendmessage(id) {
      this.$store.dispatch("movetoMessage", id);
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 50px;
}

.detail {
  text-align: left;
  width: 60%;
  min-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  padding-bottom: 50px;
}

.userlink {
  text-decoration: none;
  color: black;
}

.userlink:hover{
  font-weight: bolder;
  color: aquamarine;
}
.warning {
  background-color: lightgray;
}

.buttons {
  text-align: right;
}
.button {
  height: 30%;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
}

.update {
  background-color: rgb(255, 120, 120);
  text-decoration: none;
  color: black;
}

.delete {
  background-color: black;
  color: white;
}

.content {
  display: flex;
  flex-flow: row;
  margin-top: 10px;
  margin-bottom: 20px;
}

.cont-title {
  width: 20%;
}

.cont-content {
  width: 80%;
}

.finish-div {
  display: flex;
  justify-content: center;
}

.finish {
  background-color: white;
  border-radius: 15px;
  font-size: 30px;
}

.finish:hover {
  background-color: lightgray;
}

.finished {
  border-radius: 15px;
  font-size: 30px;
}
.reply {
  margin-bottom: 70px;
}

.loginform {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
  display: flex;
  flex-flow: row;
  align-items: center;
}

.apply {
  background-color: aquamarine;
}

.comment {
  background-color: rgb(150, 150, 255);
}

.form {
  width: 85%;
  margin-right: 5%;
}

input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
  font-size: 20px;
  width: 100%;
}

input:focus {
  outline: none;
}

.submit {
  width: 10%;
  min-width: 100px;
  border: none;
  border-radius: 20px;
  padding: 10px;
}

.nicknamearea {
  width: 10%;
}

.type {
  border-radius: 10px;
  padding: 5px;
  margin-right: 2.5%;
}

.contentarea {
  margin-right: 10px;
}

.deletex:hover {
  color: red;
  border-radius: 10px;
}

.sendmessage:hover{
  cursor: pointer;
  color: aquamarine;
}

.submit:hover{
  box-shadow: 1px 1px 3px;
  font-weight: bolder;
}
</style>
