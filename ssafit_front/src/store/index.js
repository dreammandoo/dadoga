import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

const REST_API = "http://localhost:8080/";

export default new Vuex.Store({
  state: {
    // 로그인한 사람
    user: { id: "none" },

    // 모든 유저
    users: [],

    // 내가 보고있는 사람
    watchinguser: null,

    // 글 목록
    recruits: [],

    // 보고있는 글
    recruit: null,

    // 내가 보내거나 내가 받은 모든 메세지
    messages: [],

    // 내가 작성한 참여신청 or 후기
    applycomment: {
      type: null,
      list: [],
    },

    // 나의 오늘 todo
    todos: [],

    // 나의 오늘 timer
    timers: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
      state.watchinguser = null;
      state.messages = [];
      state.todos = [];
      state.timers = [];
    },
    GET_RECRUITS(state, recruits) {
      state.recruits = recruits;
    },
    GET_RECRUIT(state, recruit) {
      state.recruit = recruit;
    },
    DELETE_RECRUIT(state) {
      state.recruit = null;
    },
    MESSAGES(state, messages) {
      // 내가 받은 모든 메시지
      state.messages = messages;
    },
    USERS(state, users) {
      state.users = users;
    },
    WATCHING_USER(state, user) {
      state.watchinguser = user;
    },
    APPLYCOMMENT(state, data) {
      state.applycomment.type = data[1];
      state.applycomment.list = data[0];
    },
    TODOS(state, todos) {
      state.todos = todos;
    },
    TIMERS(state, timers) {
      state.timers = timers;
    },
  },
  actions: {
    keeplogin({ commit }) {
      commit("LOGIN", JSON.parse(sessionStorage.getItem("user")));
    },
    // 로그인하기
    login({ commit }, logininfo) {
      // 빈칸 검증 후 로그인하는 아이디, 비밀번호 보내기
      const API_URL = `${REST_API}/user/login`;
      axios({
        url: API_URL,
        method: "POST",
        params: logininfo,
      })
        .then((res) => {
          if (res.data === "wrong loginId") {
            alert("아이디가 존재하지 않습니다.");
          } else if (res.data === "wrong password") {
            alert("비밀번호가 일치하지 않습니다.");
          } else {
            // 로그인 성공하면 user를 session에 저장해야 하는데
            // 객체로 로그인한 유저 객체가 옴
            alert("로그인 성공");
            // state와 sessionstorage user에 로그인한 유저 넣기
            commit("LOGIN", res.data.user);
            commit("WATCHING_USER", null);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            // 메인으로 가기
            router.push({ name: "home" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout({ commit }) {
      // 로그아웃하고 메인으로 가기
      const API_URL = `${REST_API}/user/logout`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then(() => {
          // state와 sessionstorage user 해제
          commit("LOGOUT");
          sessionStorage.setItem("user", null);
          alert("로그아웃 되었습니다.");
          router.push({ name: "home" }).catch(() => {});
        })
        .catch(() => {
          alert("로그아웃 실패");
        });
    },
    signup({ commit }, signupuser) {
      // 빈칸 검증 후 요청
      commit;
      const API_URL = `${REST_API}/user/signup`;
      axios({
        url: API_URL,
        method: "POST",
        params: signupuser,
        headers: {
          "content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data === "regist complete") {
            alert("가입 성공");
          } else if (res.data === "duplicated email") {
            alert("이미 존재하는 이메일입니다.");
          } else if (res.data === "duplicated loginId") {
            alert("이미 존재하는 아이디입니다.");
          } else if (res.data === "duplicated nickname") {
            alert("이미 존재하는 닉네임입니다.");
          } else {
            alert("회원가입 실패");
          }
          // 로그인 페이지로 이동
          router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRecruits({ commit }) {
      const API_URL = `${REST_API}/recruit`;
      axios({
        url: API_URL,
        method: "GET",
      })
        // 글 리스트 객체
        .then((res) => {
          commit("GET_RECRUITS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRecruit({ commit }, id) {
      const API_URL = `${REST_API}/recruit/${id}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        // id 글 없으면 빈 map으로 옴
        // 글 객체 : recruit_detail
        // 참가신청 : apply_list
        // 후기 : comment_list
        .then((res) => {
          let recruit = res.data;
          // 글 작성자 닉네임
          axios({
            url: `${REST_API}/user/${recruit.recruit_detail.writerid}`,
            method: "GET",
          })
            .then((res) => {
              recruit.recruit_detail.nickname = res.data.nickname;
              commit("GET_RECRUIT", recruit);
            })
            .catch((err) => {
              console.log(err);
            });
          // // state에 커밋
          // commit("GET_RECRUIT", recruit);
          // console.log(recruit.nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createRecruit({ commit }, recruit) {
      // recruit 새 객체 가져와서 요청
      console.log(recruit);
      const API_URL = `${REST_API}/recruit`;
      commit;
      axios({
        url: API_URL,
        method: "POST",
        params: recruit,
      })
        // 새로 작성된 글 id
        .then((res) => {
          console.log(res);
          if (res.data !== "recruit insertion failed") {
            alert("모집글을 작성했습니다.");
            router.push({ name: "recruitdetail", params: { id: res.data } });
          } else {
            alert("모집글 작성에 실패했습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("모집글 작성에 실패했습니다.");
        });
    },
    updateRecruit({ commit }, recruit) {
      // 수정된 recruit객체 가져와서 요청
      const API_URL = `${REST_API}/recruit`;
      commit;
      delete recruit.nickname;
      console.log(recruit);
      if (recruit.writerid === this.state.user.id) {
        axios({
          url: API_URL,
          method: "PUT",
          params: recruit,
        })
          // 수정된 글 id
          .then((res) => {
            if (res.data !== "recruit update failed") {
              alert("모집글을 수정했습니다.");
              router.push({
                name: "recruitdetail",
                params: { id: recruit.id },
              });
            } else {
              console.log(res.data);
              alert("모집글 수정에 실패했습니다.");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("모집글 수정에 실패했습니다.");
          });
      }
    },
    finishRecruit({ commit }, recruit) {
      // recruit객체 가져와서 done을 1로 바꾸기
      const API_URL = `${REST_API}/recruit`;
      commit;
      console.log(recruit);
      // 로그인한 유저와 글 작성자가 같을 때에만
      if (recruit.writerid === this.state.user.id) {
        axios({
          url: API_URL,
          method: "PUT",
          params: recruit,
        })
          .then((res) => {
            if (res.data !== "recruit update failed") {
              alert("마감했습니다.");
              axios({
                url: `${REST_API}/recruit/${recruit.id}`,
                method: "GET",
              })
                // id 글 없으면 빈 map으로 옴
                // 글 객체 : recruit_detail
                // 참가신청 : apply_list
                // 후기 : comment_list
                .then((res) => {
                  let recruit = res.data;
                  // 글 작성자 닉네임
                  axios({
                    url: `${REST_API}/user/${recruit.recruit_detail.writerid}`,
                    method: "GET",
                  })
                    .then((res) => {
                      recruit.recruit_detail.nickname = res.data.nickname;
                      commit("GET_RECRUIT", recruit);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
            } else {
              alert("모집글 수정에 실패했습니다.");
            }
          })
          .catch(() => {
            alert("모집글 수정에 실패했습니다.");
          });
      }
    },
    deleteRecruit({ commit }, id) {
      const API_URL = `${REST_API}/recruit/${id}`;
      // 글 작성자와 로그인 유저가 같을때에만

      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data !== "recruit delete failed") {
            alert("삭제 완료");
            commit("DELETE_RECRUIT");
            router.push({ name: "recruit" });
          } else {
            alert("삭제 실패");
          }
        })
        .catch(() => {
          alert("삭제 실패");
        });
    },
    createApply({ commit }, apply) {
      const API_URL = `${REST_API}/apply`;
      commit;
      axios({
        url: API_URL,
        method: "POST",
        params: apply,
      })
        .then((res) => {
          console.log(res);
          if (res.data === "apply inserted") {
            alert("참가 신청 완료");
            axios({
              url: `${REST_API}/recruit/${apply.recruitid}`,
              method: "GET",
            })
              // id 글 없으면 빈 map으로 옴
              // 글 객체 : recruit_detail
              // 참가신청 : apply_list
              // 후기 : comment_list
              .then((res) => {
                let recruit = res.data;
                // 글 작성자 닉네임
                axios({
                  url: `${REST_API}/user/${recruit.recruit_detail.writerid}`,
                  method: "GET",
                })
                  .then((res) => {
                    recruit.recruit_detail.nickname = res.data.nickname;
                    commit("GET_RECRUIT", recruit);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (res.data === "apply full") {
            alert("제한 인원을 초과했습니다.");
          } else if (res.data === "already applied") {
            alert("이미 참가 신청을 했습니다.");
          } else {
            alert("참가 신청 실패");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("참가 신청 실패");
        });
    },
    createComment({ commit }, comment) {
      const API_URL = `${REST_API}/comment`;
      commit;
      axios({
        url: API_URL,
        method: "POST",
        params: comment,
      })
        .then((res) => {
          if (res.data === "comment inserted") {
            alert("후기 작성 완료");
            axios({
              url: `${REST_API}/recruit/${comment.recruitid}`,
              method: "GET",
            })
              // id 글 없으면 빈 map으로 옴
              // 글 객체 : recruit_detail
              // 참가신청 : apply_list
              // 후기 : comment_list
              .then((res) => {
                let recruit = res.data;
                // 글 작성자 닉네임
                axios({
                  url: `${REST_API}/user/${recruit.recruit_detail.writerid}`,
                  method: "GET",
                })
                  .then((res) => {
                    recruit.recruit_detail.nickname = res.data.nickname;
                    commit("GET_RECRUIT", recruit);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          } else if (res.data === "need to apply first") {
            alert("신청을 한 모임에만 후기 작성이 가능합니다.");
          } else if (res.data === "already commented") {
            alert("이미 후기를 작성했습니다.");
          } else {
            alert("후기 작성 실패");
          }
        })
        .catch(() => {
          alert("후기 작성 실패");
        });
    },
    deleteApply({ commit }, id) {
      let creatorid = id[0];
      let recruitid = id[1];
      const API_URL = `${REST_API}/apply/${creatorid}/${recruitid}`;
      console.log(API_URL);
      commit;
      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data === "apply deleted") {
            alert("참가 신청 삭제 완료");
            axios({
              url: `${REST_API}/recruit/${recruitid}`,
              method: "GET",
            })
              // id 글 없으면 빈 map으로 옴
              // 글 객체 : recruit_detail
              // 참가신청 : apply_list
              // 후기 : comment_list
              .then((res) => {
                let recruit = res.data;
                // 글 작성자 닉네임
                axios({
                  url: `${REST_API}/user/${recruit.recruit_detail.writerid}`,
                  method: "GET",
                })
                  .then((res) => {
                    recruit.recruit_detail.nickname = res.data.nickname;
                    commit("GET_RECRUIT", recruit);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert("참가 신청 삭제 실패");
          }
        })
        .catch(() => {
          alert("참가 신청 삭제 실패");
        });
    },
    deleteComment({ commit }, id) {
      let creatorid = id[0];
      let recruitid = id[1];
      const API_URL = `${REST_API}/comment/${creatorid}/${recruitid}`;
      commit;
      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data === "comment deleted") {
            alert("후기 삭제 완료");
            axios({
              url: `${REST_API}/recruit/${recruitid}`,
              method: "GET",
            })
              // id 글 없으면 빈 map으로 옴
              // 글 객체 : recruit_detail
              // 참가신청 : apply_list
              // 후기 : comment_list
              .then((res) => {
                let recruit = res.data;
                // 글 작성자 닉네임
                axios({
                  url: `${REST_API}/user/${recruit.recruit_detail.writerid}`,
                  method: "GET",
                })
                  .then((res) => {
                    recruit.recruit_detail.nickname = res.data.nickname;
                    commit("GET_RECRUIT", recruit);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert("후기 삭제 실패");
          }
        })
        .catch(() => {
          alert("후기 삭제 실패");
        });
    },
    getMessages({ commit }, userid) {
      const API_URL = `${REST_API}/message/${userid}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no list") {
            let messages = res.data;
            commit("MESSAGES", messages);
          } else {
            commit("MESSAGES", []);
          }
        })
        .catch(() => {
          alert("메시지 가져오기 실패");
        });
    },
    selectMessages({ commit }, id) {
      // 내가 id 사람한테 받은 메시지들을 읽음 처리
      let senderid = id[0];
      let receiverid = id[1];
      axios({
        url: `${REST_API}/message`,
        method: "PUT",
        params: {
          senderid: senderid,
          receiverid: receiverid,
        },
      })
        .then((res) => {
          if (res.data === "message checked") {
            axios({
              url: `${REST_API}/message/${receiverid}`,
              method: "GET",
            }).then((res) => {
              if (res.data !== "no list") {
                let messages = res.data;
                commit("MESSAGES", messages);
              } else {
                commit("MESSAGES", []);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deselect({ commit }) {
      commit("WATCHING_USER", null);
    },
    sendMessage({ commit }, msg) {
      axios({
        url: `${REST_API}/message`,
        method: "POST",
        params: msg,
      })
        .then((res) => {
          if (res.data === "message sent") {
            axios({
              url: `${REST_API}/message/${msg.senderid}`,
              method: "GET",
            }).then((res) => {
              if (res.data !== "no list") {
                commit("MESSAGES", res.data);
              } else {
                commit("MESSAGES", []);
              }
            });
          } else {
            alert("메시지 전송 실패");
          }
        })
        .catch(() => {
          alert("메시지 전송 실패");
        });
    },
    movetoMessage({ commit }, id) {
      axios({
        url: `${REST_API}/user/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no user found") {
            commit("WATCHING_USER", res.data);
            axios({
              url: `${REST_API}/message`,
              method: "PUT",
              params: {
                senderid: res.data.id,
                receiverid: this.state.user.id,
              },
            }).then((res) => {
              if (res.data === "message checked") {
                axios({
                  url: `${REST_API}/message/${this.state.user.id}`,
                  method: "GET",
                }).then((res) => {
                  if (res.data !== "no list") {
                    let messages = res.data;
                    commit("MESSAGES", messages);
                  } else {
                    commit("MESSAGES", []);
                  }
                });
              }
            });
            router.push({ name: "message" });
          } else {
            alert("해당 유저가 존재하지 않습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("해당 유저가 존재하지 않습니다.");
        });
    },
    getUser({ commit }, id) {
      axios({
        url: `${REST_API}/user/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no user found") {
            commit("WATCHING_USER", res.data);
          } else {
            alert("해당 유저가 존재하지 않습니다.");
          }
        })
        .catch(() => {
          alert("해당 유저가 존재하지 않습니다.");
        });
    },
    getAllUser({ commit }) {
      axios({
        url: `${REST_API}/user`,
        method: "GET",
      })
        .then((res) => {
          commit("USERS", res.data);
        })
        .catch(() => {
          alert("해당 유저가 존재하지 않습니다.");
        });
    },
    myApply({ commit }, id) {
      axios({
        url: `${REST_API}/myapply/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no my apply") {
            commit("APPLYCOMMENT", [res.data, "apply"]);
            router.push({ name: "applyComment" });
          } else {
            alert("신청 내역이 없습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    myComment({ commit }, id) {
      axios({
        url: `${REST_API}/mycomment/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no my comment") {
            commit("APPLYCOMMENT", [res.data, "comment"]);
            router.push({ name: "applyComment" });
          } else {
            alert("작성한 후기가 없습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    myRecruit({ commit }, id) {
      axios({
        url: `${REST_API}/myrecruit/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no my recruit" && res.data.length > 0) {
            commit("GET_RECRUITS", res.data);
            router.push({ name: "recruit" });
          } else if (res.data.length === 0) {
            alert("작성한 모집글이 없습니다.");
          } else {
            alert("작성한 모집글이 없습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mymessage({ commit }, user) {
      if (this.state.user !== null && user.id === this.state.user.id) {
        commit("WATCHING_USER", null);
        router.push({ name: "message" });
      } else if (this.state.user === null) {
        alert("로그인 후 이용하세요");
      } else {
        router.push({ name: "message" });
      }
    },
    todo({ commit }, id) {
      axios({
        url: `${REST_API}/todo/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no list") {
            commit("TODOS", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    todoToggle({ commit }, todo) {
      commit;
      axios({
        url: `${REST_API}/todo/${todo.id}`,
        method: "PUT",
      })
        .then((res) => {
          if (res.data === "todo done modify failed") {
            alert("업데이트 실패");
          }
          axios({
            url: `${REST_API}/todo/${todo.userid}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TODOS", res.data);
              } else {
                commit("TODOS", []);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    todoDelete({ commit }, id) {
      axios({
        url: `${REST_API}/todo/${id}`,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data === "todo delete failed") {
            alert("삭제 실패");
          }
          axios({
            url: `${REST_API}/todo/${id}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TODOS", res.data);
              } else {
                commit("TODOS", []);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    todoInsert({ commit }, todo) {
      commit;
      axios({
        url: `${REST_API}/todo`,
        method: "POST",
        params: todo,
      })
        .then((res) => {
          if (res.data === "todo insertion failed") {
            alert("등록 실패");
          }
          axios({
            url: `${REST_API}/todo/${todo.userid}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TODOS", res.data);
              } else {
                commit("TODOS", []);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timer({ commit }, id) {
      axios({
        url: `${REST_API}/timer/${id}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no list") {
            commit("TIMERS", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerUpdate({ commit }, timer) {
      commit;
      axios({
        url: `${REST_API}/timer/`,
        method: "PUT",
        params: timer,
      })
        .then((res) => {
          if (res.data === "timer modify failed") {
            alert("갱신 실패");
          }
          axios({
            url: `${REST_API}/timer/${timer.userid}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TIMERS", res.data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerInsert({ commit }, timer) {
      axios({
        url: `${REST_API}/timer/`,
        method: "POST",
        params: timer,
      })
        .then((res) => {
          if (res.data === "timer insertion failed") {
            alert("등록 실패");
          }
          axios({
            url: `${REST_API}/timer/${timer.userid}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TIMERS", res.data);
              } else {
                commit("TIMERS", []);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerDeleteAll({ commit }, id) {
      axios({
        url: `${REST_API}/timer/all/${id}`,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data === "alltimer delete failed") {
            alert("초기화 실패");
          }
          axios({
            url: `${REST_API}/timer/${id}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TIMERS", res.data);
              } else {
                commit("TIMERS", []);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerDelete({ commit }, id) {
      let userid = id[0];
      let timerid = id[1];
      axios({
        url: `${REST_API}/timer/${timerid}`,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data === "timer delete failed") {
            alert("삭제 실패");
          }
          axios({
            url: `${REST_API}/timer/${userid}`,
            method: "GET",
          })
            .then((res) => {
              if (res.data !== "no list") {
                commit("TIMERS", res.data);
              } else {
                commit("TIMERS", []);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userUpdate({ commit }, user) {
      axios({
        url: `${REST_API}/user`,
        method: "PUT",
        params: user,
      })
        .then((res) => {
          if (res.data === "user modified") {
            commit("LOGOUT");
            alert("회원정보 수정 완료");
            router.push({ name: "login" });
          } else {
            alert("회원정보 수정에 실패했습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userDelete({ commit }, id) {
      axios({
        url: `${REST_API}/user/${id}`,
        method: "DELETE",
      })
        .then((res) => {
          if (res.data !== "user delete failed") {
            commit("LOGOUT");
            sessionStorage.setItem("user", null);
            alert("탈퇴 처리 되었습니다.");
            router.push({ name: "home" });
          } else {
            alert("탈퇴 실패");
          }
        })
        .catch(() => {
          alert("탈퇴 실패");
        });
    },
    userMessage({ commit }) {
      const API_URL = `${REST_API}/message/${this.state.user.id}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          if (res.data !== "no list") {
            let messages = res.data;
            commit("WATCHING_USER", null);
            commit("MESSAGES", messages);
            router.push({ name: "message" }).catch(() => {});
          } else {
            commit("WATCHING_USER", null);
            commit("MESSAGES", []);
            router.push({ name: "message" }).catch(() => {});
          }
        })
        .catch(() => {
          alert("메시지 가져오기 실패");
        });
    },
  },
  modules: {},
});
