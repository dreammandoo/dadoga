<template>
  <div class="container">
    <h1>모임 목록</h1>
    <hr>
    <div class="recruit">
      

      <!-- <div class="search">
        <input
          type="text"
          class="keyword"
          placeholder="검색어를 입력하세요"
          v-model="keyword"
        />
        <input
          type="number"
          class="level"
          placeholder="최소 레벨"
          v-model="minlevel"
        />
        <select class="gender" v-model="gender">
          <option selected disabled>성별 조건</option>
          <option value="0">남성</option>
          <option value="1">여성</option>
          <option value="2">상관없음</option>
        </select>
      </div> -->
      <b-table
        class="table"
        id="my-table"
        :fields="fields"
        :items="recruits"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <!-- <template
          #cell()="data"
          v-if="
            (data.title.includes(keyword) ||
              data.content.includes(keyword) ||
              data.location.includes(keyword) ||
              data.part.includes(keyword)) &&
            data.gender == gender &&
            data.level !== minlevel
          "
          >{{ data.value }}</template
        > -->
        <template #cell(title)="data">
          <router-link
            :to="{ name: 'recruitdetail', params: { id: data.item.id } }"
            class="rec-link"
            >{{ data.item.title }}</router-link
          >
        </template>

        <template #cell(datetime)="data">
          {{ dateformat(data.item.datetime) }}
        </template>

        <template #cell(nickname)="data">
          <router-link
            :to="{ name: 'user', params: { id: data.item.writerid } }"
            class="rec-link"
            >{{ data.item.nickname }}</router-link
          >
        </template>

        <template #cell(gender)="data">
          <span v-if="data.item.gender === 0">남성</span>
          <span v-if="data.item.gender === 1">여성</span>
          <span v-if="data.item.gender === 2">상관없음</span>
        </template>

        <template #cell(appliers)="data">
          <span v-if="data.item.appliers === data.item.applierslimit"
            >마감</span
          >
          <span v-else
            >{{ data.item.appliers }}/{{ data.item.applierslimit }}</span
          >
        </template>

        <template #cell(done)="data">
          <span v-if="data.item.done === 1">마감</span></template
        >
      </b-table>

      <div class="rec" v-if="user !== null">
        <router-link to="recruitcreate" class="rec-create">글 작성</router-link>
      </div>

      <b-pagination
        class="pag"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="rec-container"
        align="center"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RecruitView",
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        { key: "done", label: "마감" },
        { key: "title", label: "제목"},
        { key: "datetime", label: "날짜" },
        { key: "gender", label: "성별" },
        { key: "level", label: "최소 레벨" },
        { key: "appliers", label: "신청 현황" },
      ],
      keyword: "",
      minlevel: 1,
      gender: "",
    };
  },
  computed: {
    ...mapState(["recruits", "user"]),
    rows() {
      return this.recruits.length;
    },
  },
  created() {
    this.$store.dispatch("keeplogin");
    this.$store.dispatch("getRecruits");
  },
  methods: {
    dateformat(datetime) {
      let d = datetime.split(" ");
      let ymd = d[0].split("-");
      return ymd[0] + "년 " + ymd[1] + "월 " + ymd[2] + "일";
    }
    
  },
};
</script>

<style scoped>
.recruit {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 50px;
  font-weight: bold;
}
.rec-link {
  text-decoration: none;
  color: black;
}

.table {
  margin-top: 50px;
  margin-bottom: 30px;
  box-shadow: 50px 200px 400px aquamarine;
}

.rec {
  display: flex;
  justify-content: flex-end;
}

.rec-create {
  color: black;
  text-decoration: none;
  font-size: 20px;
  border: none;
  background-color: aquamarine;
  border-radius: 10px;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
}

.keyword {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid gray;
  font-size: 20px;
  width: 30%;
  margin-right: 3%;
}

.keyword:focus {
  outline: none;
}

.search {
  margin-top: 30px;
  text-align: center;
}

.level {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid gray;
  font-size: 20px;
  width: 15%;
  margin-right: 3%;
}

.level:focus {
  outline: none;
}

.gender {
  border: none;
  width: 15%;
  margin-right: 2%;
}

.gender:focus {
  outline: none;
}

.submit {
  color: black;
  text-decoration: none;
  font-size: 20px;
  border: none;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
}

.submit:hover {
  background-color: lightgray;
}
.pag {
  margin-bottom: 100px;
}
</style>
