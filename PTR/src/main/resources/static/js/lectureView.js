const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("id: ", id);

const url = "http://localhost:8080/lecture/" + id;

function sessionCreateAll(user) {
  axios
    .get(url)
    .then((response) => {
      console.log("데이터: ", response.data.id);
      const lecture = {
        id: response.data.id,
      };
      create(lecture, response.data);
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });

  function create(lecture, data) {
    axios
      .post("http://localhost:8080/findByLectureId", lecture)
      .then((lectureUser) => {
        console.log("1: ", lectureUser.data);
        axios
          .post("http://localhost:8080/ratingAVG", lecture)
          .then((ratingAVG) => {
            axios
              .post("http://localhost:8080/findLectureCategory", lecture)
              .then((category) => {
                console.log("2: ", category.data);
                console.log("1: ", lectureUser.data);
                view(data, lectureUser.data, ratingAVG.data, category.data);
              })
              .catch((error) => {
                console.log("에러 발생: ", error);
              });
          })
          .catch((error) => {
            console.log("에러 발생: ", error);
          });
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  }

  function view(data, lectureUser, ratingAVG, category) {
    const lecture_title = document.querySelector(".lecture_title");
    lecture_title.textContent = data.lectureName;

    const lecture_img = document.querySelector(".lecture_img");
    const video = document.createElement("video");
    video.src = data.url;
    lecture_img.appendChild(video);

    const lecture_teacher_img = document.querySelector(".lecture_teacher_img");
    const img = document.createElement("img");
    img.src = data.teacher.user.profileImg;
    lecture_teacher_img.appendChild(img);

    const lecture_teacher_name = document.querySelector(
      ".lecture_teacher_name"
    );
    lecture_teacher_name.textContent = data.teacher.user.userName;

    const teacher = {
      id: data.teacher.id,
    };

    const lecture_teacher_num = document.querySelector(".lecture_teacher_num");
    axios
      .post("http://localhost:8080/teacherSubscription", teacher)
      .then((data) => {
        console.log("1: ", data.data);
        lecture_teacher_num.textContent = "구독자 " + data.data + "명";
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });

    lecture_teacher_img.addEventListener("click", () => {
      window.location.href = "teacherView.html?id=" + data.teacher.id;
    });

    lecture_teacher_name.addEventListener("click", () => {
      window.location.href = "teacherView.html?id=" + data.teacher.id;
    });

    lecture_teacher_num.addEventListener("click", () => {
      window.location.href = "teacherView.html?id=" + data.teacher.id;
    });

    const lecture_subscription = document.querySelector(
      ".lecture_subscription"
    );
    if (user.userId === "anonymousUser") {
      lecture_subscription.textContent = "구독";
      lecture_subscription.addEventListener("click", () => {
        alert("로그인해주세요.");
        window.location.href = "login.html";
      });
    } else {
      axios
        .post("http://localhost:8080/subscriptionCheck", { user, teacher })
        .then((data) => {
          console.log("구독여부: ", data.data);
          if (data.data != "") {
            lecture_subscription.textContent = "구독중";
            lecture_subscription.addEventListener("click", () => {
              axios
                .post("http://localhost:8080/subscriptionCansel", {
                  id: data.data.id,
                })
                .then((data) => {
                  console.log("구독취소: ", data.data);
                  location.reload();
                })
                .catch((error) => {
                  console.log("에러 발생: ", error);
                });
            });
          } else {
            lecture_subscription.textContent = "구독";
            lecture_subscription.addEventListener("click", () => {
              axios
                .post("http://localhost:8080/subscription", { user, teacher })
                .then((data) => {
                  console.log("구독: ", data.data);
                  location.reload();
                })
                .catch((error) => {
                  console.log("에러 발생: ", error);
                });
            });
          }
        })
        .catch((error) => {
          console.log("에러 발생: ", error);
        });
    }

    const date = document.querySelector(".date");
    const createdAt = new Date(data.createdAt);
    date.textContent = `${createdAt.getFullYear()}. ${
      createdAt.getMonth() + 1
    }. ${createdAt.getDate()}.`;

    const price = document.querySelector(".price");
    if (data.price == 0) {
      price.textContent = "무료";
    } else {
      price.textContent = "단백질바 " + data.price + "개";
    }

    const lecture_description_value = document.querySelector(
      ".lecture_description_value"
    );
    lecture_description_value.textContent = data.description;

    const buyNum = document.querySelector(".buyNum");
    buyNum.textContent = lectureUser.length;

    const avg = document.querySelector(".avg");
    if (ratingAVG == "NaN") {
      avg.textContent = "없음";
    } else {
      avg.textContent = ratingAVG;
    }

    let categorys = "";
    const category_div = document.querySelector(".category");

    category.forEach((data, index) => {
      if (index === category.length - 1) {
        categorys = categorys + data.category.categoryName;
      } else {
        categorys = categorys + data.category.categoryName + ", ";
      }
    });
    if (categorys == "") {
      category_div.textContent = "카테고리 설정이 안 되어 있습니다.";
    } else {
      category_div.textContent = categorys;
    }

    const lecture_btn_buy = document.querySelector(".lecture_btn_buy");
    if (user.userId === "anonymousUser") {
      lecture_btn_buy.textContent = "구매하기";
      lecture_btn_buy.addEventListener("click", () => {
        alert("로그인해주세요.");
        window.location.href = "login.html";
      });
    } else {
      if (
        lectureUser.filter((l) => l.user.userId === user.userId).length == 0
      ) {
        lecture_btn_buy.textContent = "구매하기";
        lecture_btn_buy.addEventListener("click", () => {
          var result = confirm("정말로 구매하시겠습니까?");
          if (result) {
            axios
              .post("http://localhost:8080/buyLecture", {
                lecture: { id: data.id, price: data.price },
                user: user,
              })
              .then((response) => {
                console.log("1: ", response.data);
                if (response.data == "결제 완료") {
                  alert("구매가 완료되었습니다.");
                  location.reload();
                } else if (response.data == "잔액 부족") {
                  var coin = confirm(
                    "단백질바가 부족합니다. 충전하시겠습니까?"
                  );
                  if (coin) {
                    console.log("ㅎㅎ");
                    document
                      .querySelector(".content_body_cash")
                      .classList.remove("hiden");
                    document
                      .querySelector(".content_body_box")
                      .classList.add("hiden");
                  }
                } else if (response.data == "이미 결제함") {
                  alert("이미 결제하셨습니다.");
                }
              })
              .catch((error) => {
                console.log("에러 발생: ", error);
              });
          }
        });
      } else if (
        lectureUser.filter((l) => l.user.userId === user.userId).length == 1
      ) {
        lecture_btn_buy.textContent = "영상보기";
        lecture_btn_buy.addEventListener("click", () => {
          let fullscreenContainer = document.querySelector(
            ".fullscreen_container"
          );
          if (!fullscreenContainer) {
            fullscreenContainer = document.createElement("div");
            fullscreenContainer.classList.add("fullscreen_container");
            fullscreenContainer.classList.add("hidden");
            document.body.appendChild(fullscreenContainer);
          }

          let fullscreenVideo = document.querySelector(".fullscreen_video");
          if (!fullscreenVideo) {
            fullscreenVideo = document.createElement("video");
            fullscreenVideo.classList.add("fullscreen_video");
            fullscreenVideo.controls = true;
            fullscreenContainer.appendChild(fullscreenVideo);
          }

          // 비디오 소스 설정
          fullscreenVideo.src = data.url;

          // hidden 클래스 제거하여 비디오 표시
          fullscreenContainer.classList.remove("hidden");

          // 비디오가 끝나면 hidden 클래스를 다시 추가하여 화면을 숨김
          fullscreenVideo.addEventListener("ended", () => {
            fullscreenContainer.classList.add("hidden");
          });
          // fullscreenContainer를 클릭하면 hidden 클래스를 추가하여 화면을 숨김
          fullscreenContainer.addEventListener("click", (event) => {
            if (event.target !== fullscreenVideo) {
              fullscreenContainer.classList.add("hidden");
            }
          });
        });
      }
    }

    const lecture = {
      id: data.id,
    };
    const lecture_btn_scrap = document.querySelector(".lecture_btn_scrap");
    if (user.userId === "anonymousUser") {
      lecture_btn_scrap.textContent = "스크랩";
      lecture_btn_scrap.addEventListener("click", () => {
        alert("로그인해주세요.");
        window.location.href = "login.html";
      });
    } else {
      axios
        .post("http://localhost:8080/findScrapLectureByUserAndLecture", {
          user,
          lecture,
        })
        .then((data) => {
          console.log("스크랩여부: ", data.data);
          if (data.data != "") {
            lecture_btn_scrap.textContent = "스크랩중";
            lecture_btn_scrap.addEventListener("click", () => {
              axios
                .post("http://localhost:8080/deleteScrapLecture", {
                  id: data.data.id,
                })
                .then((data) => {
                  console.log("스크랩취소: ", data.data);
                  location.reload();
                })
                .catch((error) => {
                  console.log("에러 발생: ", error);
                });
            });
          } else {
            lecture_btn_scrap.textContent = "스크랩";
            lecture_btn_scrap.addEventListener("click", () => {
              axios
                .post("http://localhost:8080/scrapLecture", { user, lecture })
                .then((data) => {
                  console.log("스크랩: ", data.data);
                  location.reload();
                })
                .catch((error) => {
                  console.log("에러 발생: ", error);
                });
            });
          }
        })
        .catch((error) => {
          console.log("에러 발생: ", error);
        });
    }

    if (
      lectureUser.filter((l) => l.user.userId === user.userId).length == 1
    ) {
      const reviews_btn = document.querySelector(".reviews_btn");
      const data = lectureUser.filter((l) => l.user.userId === user.userId)[0];
      const inputValue2 = document.createElement("input");
      inputValue2.classList.add("rating_input")
      inputValue2.type = "number"
      inputValue2.min = 0
      inputValue2.max = 10
      
      const inputValue3 = document.createElement("textarea");
      inputValue3.classList.add("review_input")
      inputValue3.rows = 2
      inputValue3.min = 0
      inputValue3.max = 10
      const review_input = document.querySelector(".reviews_input");

      let changeRating = -1
      let changeReview = ""

      const input2 = document.createElement("div");
      input2.classList.add("input2")
      input2.textContent = "별점"

      const input3 = document.createElement("div");
      input3.classList.add("input3")
      input3.textContent = "리뷰"

      const reviews_box = document.querySelector(".reviews_box");
      
      review_input.appendChild(input2)
      review_input.appendChild(inputValue2)
      review_input.appendChild(input3)
      review_input.appendChild(inputValue3)
      review_input.classList.add("hiden")

      if(data.teacherRating===-1 && (data.teacherReview==""||data.teacherReview==null||data.teacherReview==" ")){
        const review_create_btn = document.createElement("div");
        review_create_btn.textContent = "리뷰작성"
        reviews_btn.appendChild(review_create_btn)
        
        review_create_btn.addEventListener("click", ()=>{
          review_input.classList.remove("hiden")
          reviews_box.classList.add("review_box_style")

          review_create_btn.classList.add("hiden")
          const review_back = document.createElement("div");

          document.querySelector(".rating_input").addEventListener("change",(e)=>{
            if(e.target.value < 0){
                inputValue2.value = 0
                changeRating = 0
            }else if(e.target.value > 10){
                inputValue2.value = 10
                changeRating = 10
            }else if(e.target.value>=0 && e.target.value<=10){
                changeRating = e.target.value;
            }else{
                changeRating = -1
            }
            console.log(changeRating)
          })
    
          document.querySelector(".review_input").addEventListener("change",(e)=>{
            changeReview = e.target.value;
            console.log(changeReview)
          })

          review_back.textContent = "취소"
          reviews_btn.appendChild(review_back)
          review_back.addEventListener("click", ()=>{
            review_input.classList.add("hiden")
            reviews_box.classList.remove("review_box_style")
            review_back.classList.add("hiden")
            review_create_btn.classList.remove("hiden")
            review_ok.remove("hiden")
          })
          const review_ok = document.createElement("div");
          review_ok.textContent = "완료"
          reviews_btn.appendChild(review_ok)
          review_ok.addEventListener("click", ()=>{
            const lectureUser = {
              id: data.id,
              teacherRating: changeRating,
              teacherReview: changeReview
            }

            axios
            .post("http://localhost:8080/changeLectureUser", lectureUser)
            .then((response)=>{
                console.log("데이터: ", response.data)
                location.reload();
            })
            .catch((error)=>{
                console.log("에러: ", error)
            })
          })
        })
      } else{
        const review_edit_btn = document.createElement("div");
        review_edit_btn.textContent = "리뷰수정"
        reviews_btn.appendChild(review_edit_btn)
        const review_delete_btn = document.createElement("div");
        review_delete_btn.textContent = "리뷰삭제"
        reviews_btn.appendChild(review_delete_btn)

        review_edit_btn.addEventListener("click", ()=>{
          review_input.classList.remove("hiden")
          reviews_box.classList.add("review_box_style")
          review_edit_btn.classList.add("hiden")
          review_delete_btn.classList.add("hiden")

          const review_back = document.createElement("div");

          document.querySelector(".rating_input").addEventListener("change",(e)=>{
            if(e.target.value < 0){
                inputValue2.value = 0
                changeRating = 0
            }else if(e.target.value > 10){
                inputValue2.value = 10
                changeRating = 10
            }else if(e.target.value>=0 && e.target.value<=10){
                changeRating = e.target.value;
            }else{
                changeRating = -1
            }
            console.log(changeRating)
          })
    
          document.querySelector(".review_input").addEventListener("change",(e)=>{
            changeReview = e.target.value;
            console.log(changeReview)
          })

          review_back.textContent = "취소"
          reviews_btn.appendChild(review_back)
          review_back.addEventListener("click", ()=>{
            review_input.classList.add("hiden")
            reviews_box.classList.remove("review_box_style")
            review_back.classList.add("hiden")
            review_edit_btn.classList.remove("hiden")
            review_delete_btn.classList.remove("hiden")
            review_ok.remove("hiden")
          })
          const review_ok = document.createElement("div");
          review_ok.textContent = "완료"
          reviews_btn.appendChild(review_ok)
          review_ok.addEventListener("click", ()=>{
            const lectureUser = {
              id: data.id,
              teacherRating: changeRating,
              teacherReview: changeReview
            }

            axios
            .post("http://localhost:8080/changeLectureUser", lectureUser)
            .then((response)=>{
                console.log("데이터: ", response.data)
                location.reload();
            })
            .catch((error)=>{
                console.log("에러: ", error)
            })
          })
        })
        review_delete_btn.addEventListener("click", ()=>{
          const lectureUser = {
            id: data.id,
            teacherRating: -1,
            teacherReview: ""
          }
          axios
          .post("http://localhost:8080/changeLectureUser", lectureUser)
          .then((response)=>{
              console.log("데이터: ", response.data)
              location.reload();
          })
          .catch((error)=>{
              console.log("에러: ", error)
          })
        })
      }
    }
    const tbody = document.querySelector("tbody");
    lectureUser.forEach((lectureUser, index)=>{
        if(lectureUser.teacherRating!=-1||lectureUser.teacherReview!=""){
            const tr = document.createElement("tr")
            const name = document.createElement("td")
            const rating = document.createElement("td")
            const review = document.createElement("td")
            const date = document.createElement("td")

            name.textContent = lectureUser.user.userName
            if(lectureUser.teacherRating!=-1){
                rating.textContent = lectureUser.teacherRating
            }else{
                rating.textContent = "미작성"
            }

            if(lectureUser.teacherReview!=""){
                review.textContent = lectureUser.teacherReview
            }else{
                review.textContent = "미작성"
            }

            const createdAt = new Date(lectureUser.createdAt);
            date.textContent = `${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 ${createdAt.getDate()}일`;

            tr.appendChild(name)
            tr.appendChild(rating)
            tr.appendChild(review)
            tr.appendChild(date)
            tbody.appendChild(tr)
        }
    })
  }

  // 코인충전소
  if (user.userId != "anonymousUser") {
    axios
      .post("http://localhost:8080/findCoin", user)
      .then((response) => {
        console.log("데이터: ", response.data);
        cash(response.data);
      })
      .catch((error) => {
        console.log("에러: ", error);
      });
  }

  function cash(data) {
    const before_cash = document.querySelector(".before_cash");
    before_cash.textContent = data + "개";

    let coin = data;
    let cash = 0;
    const after_cash = document.querySelector(".after_cash");
    const final_price_value = document.querySelector(".final_price_value");
    after_cash.textContent = coin + "개";
    final_price_value.textContent = cash + "원";

    document
      .querySelector(".cash_box_butten1")
      .addEventListener("click", () => {
        coin = coin + 1;
        cash = cash + 200;
        console.log(1);
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원";
      });
    document
      .querySelector(".cash_box_butten10")
      .addEventListener("click", () => {
        coin = coin + 10;
        cash = cash + 2000;
        console.log(2);
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원";
      });
    document
      .querySelector(".cash_box_butten30")
      .addEventListener("click", () => {
        coin = coin + 30;
        cash = cash + 6000;
        console.log(3);
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원";
      });
    document
      .querySelector(".cash_box_butten50")
      .addEventListener("click", () => {
        coin = coin + 50;
        cash = cash + 10000;
        console.log(4);
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원";
      });
    document
      .querySelector(".cash_box_butten100")
      .addEventListener("click", () => {
        coin = coin + 100;
        cash = cash + 20000;
        console.log(5);
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원";
      });
    document
      .querySelector(".cash_box_butten200")
      .addEventListener("click", () => {
        coin = coin + 200;
        cash = cash + 40000;
        console.log(6);
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원";
      });

    document
      .querySelector(".content_body_cash_butten")
      .addEventListener("click", () => {
        const changeuser = {
          userId: user.userId,
          coin: coin,
        };

        axios
          .post("http://localhost:8080/changeCoin", changeuser)
          .then((response) => {
            console.log("데이터: ", response.data);
            location.reload();
          })
          .catch((error) => {
            console.log("에러: ", error);
          });
      });
  }
}

let user = "";

function sessionCurrent() {
  axios
    .get("http://localhost:8080/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200) {
        console.log("데이터: ", response.data);
        const userId = response.data.userId;
        const authority = response.data.authority[0].authority;

        user = {
          userId: userId,
          authority: { authorityName: authority },
        };

        sessionCreateAll(user);
        console.log("유저 정보: ", user);
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
      alert("로그인해주세요.");
    });
}

sessionCurrent();
