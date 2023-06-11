<template>
  <div class="d-flex justify-content-center">
    <div class="" style="min-width: 600px">
      <div
        v-b-hover="handleHover"
        style="height: 1300px"
        class="touchbox border rounded mt-5 ms-5 py-5 px-4 d-flex flex-column justify-content-around align-center"
      >
        <div>
          <p style="font-size: 6rem; font-weight: bold">DADOGA</p>
          <p style="font-size: 3rem; font-family: Georgia">따로 또 같이!</p>
        </div>
        <div class="mx-5 d-flex flex-column align-items-start">
          <p style="font-size: 3rem; font-weight: bold">같이!</p>
          <p style="font-size: 2rem">✔ 운동 모임 모집</p>
          <p style="font-size: 2rem">✔ 메신저</p>
          <p style="font-size: 3rem; font-weight: bold">따로!</p>
          <p style="font-size: 2rem">✔ 운동 TodoList</p>
          <p style="font-size: 2rem">✔ 운동 타이머</p>
        </div>
        <div>
          <div class="">
            <b-icon
              v-if="isHovered"
              animation="spin"
              icon="life-preserver"
              shift-v="0"
              font-scale="10"
            ></b-icon>
            <b-icon
              v-else
              icon="life-preserver"
              font-scale="10"
              shift-v="0"
            ></b-icon>
            <b-icon
              v-if="isHovered"
              animation="spin-reverse"
              icon="life-preserver"
              shift-v="0"
              font-scale="10"
            ></b-icon>
            <b-icon
              v-else
              icon="life-preserver"
              font-scale="10"
              shift-v="0"
            ></b-icon>
            <b-icon
              v-if="isHovered"
              animation="spin"
              icon="life-preserver"
              shift-v="0"
              font-scale="10"
            ></b-icon>
            <b-icon
              v-else
              icon="life-preserver"
              font-scale="10"
              shift-v="0"
            ></b-icon>
          </div>
          <div class="">
            <b-icon
              v-if="isHovered"
              animation="spin-reverse"
              icon="life-preserver"
              shift-v="0"
              font-scale="10"
            ></b-icon>
            <b-icon
              v-else
              icon="life-preserver"
              font-scale="10"
              shift-v="0"
            ></b-icon>
            <b-icon
              v-if="isHovered"
              animation="spin"
              icon="life-preserver"
              shift-v="0"
              font-scale="10"
            ></b-icon>
            <b-icon
              v-else
              icon="life-preserver"
              font-scale="10"
              shift-v="0"
            ></b-icon>
            <b-icon
              v-if="isHovered"
              animation="spin-reverse"
              icon="life-preserver"
              shift-v="0"
              font-scale="10"
            ></b-icon>
            <b-icon
              v-else
              icon="life-preserver"
              font-scale="10"
              shift-v="0"
            ></b-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="" style="min-width: 1000px">
      <div
        v-b-hover="handleHover5"
        class="touchbox border rounded m-5 py-5 px-4 d-flex flex-row align-center"
        @click="recruit"
      >
        <div class="mx-5">
          <b-icon
            v-if="isHovered5"
            animation="cylon-vertical"
            icon="people-fill"
            shift-v="0"
            font-scale="10"
          ></b-icon>
          <b-icon
            v-else
            icon="people-fill"
            font-scale="10"
            shift-v="0"
          ></b-icon>
        </div>
        <div class="mx-5 d-flex flex-column align-items-start">
          <p class="h2 mb-3" style="font-weight: bold">
            운동 모임을 모집해보세요!
          </p>
          <p class="h4 m-2">✔ 혼자 운동하기 싫은 날엔 같이 하세요!</p>
          <p class="h4 m-2">✔ 운동 모임을 모집하거나 참가하세요!</p>
          <p class="h4 m-2">✔ 참여 후 소중한 후기를 남겨주세요!</p>
        </div>
      </div>

      <div
        v-b-hover="handleHover2"
        class="touchbox border rounded m-5 py-5 px-4 d-flex flex-row align-center"
        @click="todo"
      >
        <div class="mx-5">
          <b-icon
            v-if="isHovered2"
            animation="cylon"
            icon="list-check"
            font-scale="10"
            shift-v="0"
          ></b-icon>
          <b-icon v-else icon="list-check" font-scale="10" shift-v="0"></b-icon>
        </div>
        <div class="mx-5 d-flex flex-column align-items-start">
          <p class="h2 mb-3" style="font-weight: bold">
            Todo List로 오늘을 계획하세요!
          </p>
          <p class="h4 m-2">✔ 오늘 할일을 정해보세요!</p>
          <p class="h4 m-2">✔ list에 오늘 할 일을 등록하세요!</p>
          <p class="h4 m-2">✔ 일을 완료했다면 체크하세요!</p>
        </div>
      </div>

      <div
        v-b-hover="handleHover3"
        class="touchbox border rounded m-5 py-5 px-4 d-flex flex-row align-center"
        @click="timer"
      >
        <div class="mx-5">
          <b-icon
            v-if="isHovered3"
            animation="throb"
            icon="clock-history"
            font-scale="10"
            shift-v="0"
          ></b-icon>
          <b-icon
            v-else
            icon="clock-history"
            font-scale="10"
            shift-v="0"
          ></b-icon>
        </div>
        <div class="mx-5 d-flex flex-column align-items-start">
          <p class="h2 mb-3" style="font-weight: bold">
            타이머를 통해 시간을 기록하세요!
          </p>
          <p class="h4 m-2">✔ 오늘 운동 시간을 계획해보세요!</p>
          <p class="h4 m-2">✔ 종목별로 시간을 관리하세요!</p>
          <p class="h4 m-2">✔ 운동을 얼마나 했는지 확인하세요!</p>
        </div>
      </div>

      <div
        v-b-hover="handleHover4"
        class="touchbox border rounded m-5 py-5 px-4 d-flex flex-row align-center"
        @click="message"
      >
        <div class="mx-5">
          <b-icon
            v-if="isHovered4"
            animation="cylon-vertical"
            icon="chat-dots-fill"
            font-scale="10"
            shift-v="0"
          ></b-icon>
          <b-icon
            v-else
            icon="chat-dots-fill"
            font-scale="10"
            shift-v="0"
          ></b-icon>
        </div>
        <div class="mx-5 d-flex flex-column align-items-start">
          <p class="h2 mb-3" style="font-weight: bold">
            메신저로 친구와 소통하세요!
          </p>
          <p class="h4 m-2">✔ 관심있는 사람에게 메시지를 남겨보세요!</p>
          <p class="h4 m-2">✔ 친구와 운동내용을 공유해보세요!</p>
          <p class="h4 m-2">✔ 나의 운동법을 공유하세요!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeView",
  components: {},
  created() {
    this.$store.dispatch("keeplogin");
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      isHovered: false,
      isHovered2: false,
      isHovered3: false,
      isHovered4: false,
      isHovered5: false,
    };
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    handleHover2(hovered) {
      this.isHovered2 = hovered;
    },
    handleHover3(hovered) {
      this.isHovered3 = hovered;
    },
    handleHover4(hovered) {
      this.isHovered4 = hovered;
    },
    handleHover5(hovered) {
      this.isHovered5 = hovered;
    },
    recruit() {
      this.$router.push({ name: "recruit" });
    },
    todo() {
      if (this.user === null) {
        alert("로그인 후 이용이 가능합니다.");
      } else {
        this.$router.push({ name: "todo" });
      }
    },
    timer() {
      if (this.user === null) {
        alert("로그인 후 이용이 가능합니다.");
      } else {
        this.$router.push({ name: "timer" });
      }
    },
    message() {
      if (this.user === null) {
        alert("로그인 후 이용이 가능합니다.");
      } else {
        this.$router.push({ name: "message" });
      }
    },
  },
};
</script>

<style>
.touchbox {
  cursor: pointer;
}

.touchbox:hover {
  background-color: rgb(147, 240, 194);
  border: 100px solid;
}
</style>
