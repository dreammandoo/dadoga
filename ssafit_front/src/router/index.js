import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecruitView from "../components/RecruitView.vue";
import TodoView from "../components/TodoView.vue";
import TimerView from "../components/TimerView.vue";
import MessageView from "../components/MessageView.vue";
import UserView from "../components/UserView.vue";
import LoginView from "../components/LoginView.vue";
import SignupView from "../components/SignupView.vue";
import UserUpdateView from "../components/UserUpdateView.vue";
import RecruitCreateView from "../components/RecruitCreateView.vue";
import RecruitUpdateView from "../components/RecruitUpdateView.vue";
import RecruitDetailView from "../components/RecruitDetailView.vue";
import ApplyCommentView from "@/components/ApplyCommentView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/recruit",
    name: "recruit",
    component: RecruitView,
  },
  {
    path: "/todo",
    name: "todo",
    component: TodoView,
  },
  {
    path: "/timer",
    name: "timer",
    component: TimerView,
  },
  {
    path: "/message",
    name: "message",
    component: MessageView,
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/userupdate",
    name: "userupdate",
    component: UserUpdateView,
  },
  {
    path: "/recruitcreate",
    name: "recruitcreate",
    component: RecruitCreateView,
  },
  {
    path: "/recruitupdate",
    name: "recruitupdate",
    component: RecruitUpdateView,
  },
  {
    path: "/recruit/:id",
    name: "recruitdetail",
    component: RecruitDetailView,
  },
  {
    path: "applycomment",
    name: "applyComment",
    component: ApplyCommentView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
