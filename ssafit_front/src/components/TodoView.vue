<template>
  <div>
    <div id="todo" v-if="user !== null">
      <h1>TODOLIST</h1>
      <hr />
      <div class="todomain">
        <div>
          <span class="selectdate">날짜: </span>
          <input
            class="searchinput"
            type="number"
            v-model="year"
            placeholder="연도"
          />
          <input
            class="searchinput"
            type="number"
            v-model="month"
            placeholder="월"
          />
          <input
            class="searchinput"
            type="number"
            v-model="date"
            placeholder="일"
          />
        </div>
        <hr>
        <div class="list">
          <div class="todo_list" v-for="todo in todos" :key="todo.id">
            <div class="todoitem" v-if="todo.date.includes(search)">
              <span class="todo_check">✔</span>
              <span
                @click="done(todo)"
                v-bind:class="{
                  todo_text: todo.done === 0,
                  todo_text_done: todo.done === 1,
                }"
                class="todocontent"
                >{{ todo.content }}</span
              >
              <b-icon
                @click="tododelete(todo.id)"
                class="deletex"
                scale="1.3"
                icon="x"
              ></b-icon>
            </div>
          </div>
        </div>
        <div class="todo_form">
          <input
            v-on:keyup.enter="insert"
            v-model="todo_input"
            class="todo_input"
            type="text"
            placeholder=" 할 일을 입력하세요."
          />
          <button @click="insert" class="todo_insert">등록</button>
        </div>
      </div>
    </div>
    <div v-else>로그인 후 이용 가능합니다.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TodoView",
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      search: "",
      todo_input: "",
    };
  },
  watch: {
    year() {
      if (this.month < 10) {
        this.search = this.year + "-0" + this.month + "-" + this.date;
      } else {
        this.search = this.year + "-" + this.month + "-" + this.date;
      }
    },
    month() {
      if (this.month < 10) {
        this.search = this.year + "-0" + this.month + "-" + this.date;
      } else {
        this.search = this.year + "-" + this.month + "-" + this.date;
      }
    },
    date() {
      if (this.month < 10) {
        this.search = this.year + "-0" + this.month + "-" + this.date;
      } else {
        this.search = this.year + "-" + this.month + "-" + this.date;
      }
    },
  },
  computed: {
    ...mapState(["user", "todos"]),
  },
  created() {
    this.$store.dispatch("keeplogin");
    this.$store.dispatch("todo", this.user.id);
  },
  methods: {
    done(todo) {
      this.$store.dispatch("todoToggle", todo);
    },
    tododelete(id) {
      if (confirm("삭제하시겠습니까?")) {
        this.$store.dispatch("todoDelete", id);
      }
    },
    insert() {
      let todo = {
        userid: this.user.id,
        content: this.todo_input,
      };
      this.$store.dispatch("todoInsert", todo);
      this.todo_input = "";
    },
  },
};
</script>

<style scoped>
#todo {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 100px;
  background-color: aliceblue;
  border: 1px solid aquamarine;
  box-shadow: 1px 1px 10px aquamarine;
  padding: 1%;
  border-radius: 20px;
  
}

.todomain {
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
}

h1 {
  margin-top: 50px;
  margin-bottom: 35px;
  font-size: 50px;
  font-weight: bolder;
}

.searchinput {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 3px solid gray;
  font-size: 20px;
  width: 15%;
  margin-right: 3%;
}

.list {
  height: 300px;
  overflow: auto;
  font-size: 25px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 10px;
  border: 1px solid aquamarine;
}
.todo_form {
  margin-top: 10px;
  margin-bottom: 10px;
}

.todo_check {
  margin-right: 10px;
}

.todoitem {
  margin: 10px;
  text-align: left;
}

.deletex {
  margin-left: 10px;
}
.deletex:hover {
  color: red;
}
.todo_input {
  border: 2px solid aquamarine;
  width: 80%;
  margin-right: 5px;
  font-size: 20px;
  border-radius: 10px;
}

.todo_input:focus {
  outline: aquamarine;
}

.todo_insert {
  border: none;
  font-size: 20px;
  border-radius: 10px;
  padding: 5px;
  background-color: aquamarine;
}

.todo_insert:hover{
  box-shadow: 1px 1px 3px;
  font-weight: bolder;
}

.todo_text {
  text-decoration-line: none;
}

.todo_text_done {
  text-decoration-line: line-through;
  text-decoration-color: rgb(248, 112, 112);
  text-decoration-thickness: 5px;
}

.star {
  color: aquamarine;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 25px;
}

.todocontent {
  cursor: pointer;
}

.selectdate {
  font-size: 25px;
  font-weight: bolder;
}
</style>
