<template>
  <div>
    <h1 v-if="applycomment.type === 'apply'">참가 현황</h1>
    <h1 v-if="applycomment.type === 'comment'">후기</h1>
    <div>
      <div class="list" v-if="applycomment.list.length > 0">
        <div v-for="item in applycomment.list" :key="item.id" class="item">
          <router-link
            class="link"
            :to="{ name: 'recruitdetail', params: { id: item.recruitid } }"
            >{{ item.content }}</router-link
          >
          <span>{{ dateformat(item.createdtime) }}</span>
        </div>
      </div>
      <div v-else-if="applycomment.type === 'apply'">
        <p>참가한 모임이 없습니다.</p>
      </div>
      <div v-else>
        <p>작성한 후기가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ApplyCommentView",
  computed: {
    ...mapState(["user", "applycomment"]),
  },
  created() {
    this.$store.dispatch("keeplogin");
  },
  methods: {
    dateformat(datetime) {
      let d = datetime.split(" ");
      let ymd = d[0].split("-");
      return ymd[0] + "/" + ymd[1] + "/" + ymd[2];
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

.list {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.link {
  text-decoration: none;
  color: black;
  font-size: 25px;
}
</style>
