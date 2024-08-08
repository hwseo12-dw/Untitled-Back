axios
  .get("http://localhost:8080/todayLectureUser")
  .then((response) => {
    console.log("데이터: ", response.data);
    create_today_buy(response.data);
  })
  .catch((error) => {
    console.log("에러: ", error);
  });

function create_today_buy(data) {
  document.querySelector(".today_buy_num").textContent =
    "영상 구매 " + data.length + "건";
  let price = 0;
  data.forEach((data) => {
    price = price + data.lecture.price;
  });
  document.querySelector(".today_buy_total").textContent = price * 200 + "원";
}

let todayLectures = [];
axios
  .get("http://localhost:8080/todayLecture")
  .then((response) => {
    console.log("데이터: ", response.data);
    create_today_upload(response.data);
    todayLectures = todayLectures.concat(response.data);
  })
  .catch((error) => {
    console.log("에러: ", error);
  });

function create_today_upload(data) {
  document.querySelector(".today_upload_num").textContent =
    "영상 업로드 " + data.length + "건";
  let price = 0;
  data.forEach((data) => {
    price = price + data.price;
  });
  document.querySelector(".today_upload_total").textContent =
    price * 200 + "원";
}

axios
  .get("http://localhost:8080/AllLectureUser")
  .then((response) => {
    console.log("데이터: ", response.data);
    create_tatal_sales(response.data);
  })
  .catch((error) => {
    console.log("에러: ", error);
  });

function create_tatal_sales(data) {
  document.querySelector(".tatal_sales_num").textContent =
    "총 판매 " + data.length + "건";
  let price = 0;
  data.forEach((data) => {
    price = price + data.lecture.price;
  });
  document.querySelector(".tatal_sales_total").textContent = price * 200 + "원";
}

let allUser = [];
let allTeacher = [];
let allAdmin = [];
let onlyUsers = [];

axios
  .get("http://localhost:8080/allUser")
  .then((response) => {
    allUser = allUser.concat(response.data);
    axios
      .get("http://localhost:8080/allTeacher")
      .then((response) => {
        allTeacher = allTeacher.concat(response.data);
        axios
          .get("http://localhost:8080/allAdmin")
          .then((response) => {
            allAdmin = allAdmin.concat(response.data);
            axios
              .get("http://localhost:8080/onlyUsers")
              .then((response) => {
                onlyUsers = onlyUsers.concat(response.data);
                create_tatal_user();
              })
              .catch((error) => {
                console.log("에러: ", error);
              });
          })
          .catch((error) => {
            console.log("에러: ", error);
          });
      })
      .catch((error) => {
        console.log("에러: ", error);
      });
  })
  .catch((error) => {
    console.log("에러: ", error);
  });

function create_tatal_user() {
  document.querySelector(".tatal_user_user").textContent =
    "유저 " + onlyUsers.length + "명";
  document.querySelector(".tatal_user_teacher").textContent =
    "강사 " + allTeacher.length + "명";
  document.querySelector(".tatal_user_admin").textContent =
    "관리자 " + allAdmin.length + "명";

  document.querySelector(".tatal_user_tatal").textContent =
    allUser.length + "명";
  create_user_detail();
}

let allLecture = [];

axios
  .get("http://localhost:8080/findAllLecture")
  .then((response) => {
    console.log("데이터: ", response.data);
    allLecture = allLecture.concat(response.data);
    create_tatal_lectures(response.data);
  })
  .catch((error) => {
    console.log("에러: ", error);
  });

function create_tatal_lectures(data) {
  document.querySelector(".tatal_lectures_total").textContent =
    data.length + "개";
}

axios
  .get("http://localhost:8080/findNotReply")
  .then((response) => {
    console.log("데이터: ", response.data);
    create_new_Q(response.data);
  })
  .catch((error) => {
    console.log("에러: ", error);
  });

function create_new_Q(data) {
  document.querySelector(".new_Q_total").textContent = data.length + "개";
}

// manager_user 유저 정보

function create_user_detail() {
  console.log("create_user_detail");
  create_user_detail_user();
  create_user_detail_user_taacher();
  create_lecture_detail();
}

function create_user_detail_user() {
  console.log("create_user_detail_user");
  const user_list_user_flex = document.querySelector(".user_list_user_flex");

  onlyUsers.forEach((user, index) => {
    const user_item = document.createElement("div");
    user_item.classList.add("user_item");
    user_item.onclick = () => showUserDetail(user, user_item);

    const user_item_flex = document.createElement("div");
    user_item_flex.classList.add("user_item_flex");

    const user_item_userId = document.createElement("div");
    user_item_userId.classList.add("user_item_userId");
    user_item_userId.textContent = user.userId + "(유저)";

    const user_item_date = document.createElement("div");
    user_item_date.classList.add("user_item_date");
    const createdAt = new Date(user.createdAt);
    const formattedDateTime = `${createdAt.getFullYear()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
    user_item_date.textContent = formattedDateTime + " 가입";

    const user_item_flex_detail = document.createElement("div");
    user_item_flex_detail.classList.add("user_item_flex_detail");

    const user_item_cash = document.createElement("div");
    user_item_cash.classList.add("user_item_cash");
    user_item_cash.textContent = "단백질바: " + user.coin + "개";

    const user_item_lecture = document.createElement("div");
    user_item_lecture.classList.add("user_item_lecture");
    const user_item_total = document.createElement("div");
    user_item_total.classList.add("user_item_lecture");

    axios
      .post("http://localhost:8080/myBuyLecture", { userId: user.userId })
      .then((response) => {
        user_item_lecture.textContent =
          "영상 구매수: " + response.data.length + "개";
        let total_price = 0;
        response.data.forEach((lectureUser) => {
          total_price = total_price + lectureUser.lecture.price;
        });
        user_item_total.textContent =
          "영상 구매금액: " + total_price * 200 + "원";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });

    const user_item_feed = document.createElement("div");
    user_item_feed.classList.add("user_item_lecture");
    user_item_feed.textContent = "피드 갯수: 10개(수정필요)";

    user_item_flex.appendChild(user_item_userId);
    user_item_flex.appendChild(user_item_date);

    user_item_flex_detail.appendChild(user_item_cash);
    user_item_flex_detail.appendChild(user_item_lecture);
    user_item_flex_detail.appendChild(user_item_total);
    user_item_flex_detail.appendChild(user_item_feed);

    user_item.appendChild(user_item_flex);
    user_item.appendChild(user_item_flex_detail);

    user_list_user_flex.appendChild(user_item);
  });
}

function create_user_detail_user_taacher() {
  console.log("create_user_detail_user_taacher");
  const user_list_teacher_flex = document.querySelector(
    ".user_list_teacher_flex"
  );

  allTeacher.forEach((teacher, index) => {
    const user_item = document.createElement("div");
    user_item.classList.add("user_item");
    user_item.onclick = () => showTeacherDetail(teacher, user_item);

    const user_item_flex = document.createElement("div");
    user_item_flex.classList.add("user_item_flex");

    const user_item_userId = document.createElement("div");
    user_item_userId.classList.add("user_item_userId");
    user_item_userId.textContent = teacher.user.userId + "(강사)";

    const user_item_date = document.createElement("div");
    user_item_date.classList.add("user_item_date");
    const createdAt = new Date(teacher.user.createdAt);
    const formattedDateTime = `${createdAt.getFullYear()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
    user_item_date.textContent = formattedDateTime + " 가입";

    const user_item_flex_detail = document.createElement("div");
    user_item_flex_detail.classList.add("user_item_flex_detail");

    const user_item_cash = document.createElement("div");
    user_item_cash.classList.add("user_item_cash");

    axios
      .post("http://localhost:8080/teacherSubscription", { id: teacher.id })
      .then((response) => {
        user_item_cash.textContent = "구독자: " + response.data + "명";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });

    const user_item_lecture = document.createElement("div");
    user_item_lecture.classList.add("user_item_lecture");
    const user_item_total = document.createElement("div");
    user_item_total.classList.add("user_item_lecture");

    axios
      .post("http://localhost:8080/findTeacherLecture", { id: teacher.id })
      .then((response) => {
        user_item_lecture.textContent =
          "영상 업로드 갯수: " + response.data.length + "개";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });

    axios
      .post("http://localhost:8080/findLectureUserByTeacher", {
        id: teacher.id,
      })
      .then((response) => {
        let total_price = 0;
        response.data.forEach((lectureUser) => {
          total_price = total_price + lectureUser.lecture.price;
        });
        user_item_total.textContent =
          "영상 판매금액: " + total_price * 200 + "원";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });

    const user_item_feed = document.createElement("div");
    user_item_feed.classList.add("user_item_lecture");
    user_item_feed.textContent = "피드 갯수: 10개(수정필요)";

    user_item_flex.appendChild(user_item_userId);
    user_item_flex.appendChild(user_item_date);

    user_item_flex_detail.appendChild(user_item_cash);
    user_item_flex_detail.appendChild(user_item_lecture);
    user_item_flex_detail.appendChild(user_item_total);
    user_item_flex_detail.appendChild(user_item_feed);

    user_item.appendChild(user_item_flex);
    user_item.appendChild(user_item_flex_detail);

    user_list_teacher_flex.appendChild(user_item);
  });
}

function showUserDetail(user, user_item) {
  console.log("showUserDetail");
  let remove = document.querySelector(".user_detail");

  if (remove) {
    remove.remove();
  }

  const body = document.createElement("div");
  body.classList.add("user_detail");

  const h3 = document.createElement("h3");
  h3.textContent = "유저 세부 정보";

  const user_detail_userId = document.createElement("div");
  user_detail_userId.classList.add("user_detail_userId");
  user_detail_userId.textContent = user.userId;

  const box1 = document.createElement("div");
  box1.classList.add("user_detail_box");

  const box1_div1 = document.createElement("div");
  box1_div1.textContent = "이름: " + user.userName;

  const box1_div2 = document.createElement("div");
  box1_div2.textContent = "이메일: " + user.email;

  const box1_div3 = document.createElement("div");
  const birthday = new Date(user.birthday);
  const birthdayData = `${birthday.getFullYear()}-${
    birthday.getMonth() + 1
  }-${birthday.getDate()}`;
  box1_div3.textContent = "생일: " + birthdayData;

  const box1_div4 = document.createElement("div");
  const createdAt = new Date(user.createdAt);
  const createdAtData = `${createdAt.getFullYear()}-${
    createdAt.getMonth() + 1
  }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  box1_div4.textContent = "등록 날짜: " + createdAtData;

  const box2 = document.createElement("div");
  box2.classList.add("user_detail_box");

  const box2_div1 = document.createElement("div");
  box2_div1.textContent = "단백질바: " + user.coin + "개";

  const box2_div2 = document.createElement("div");
  const box2_div3 = document.createElement("div");

  axios
    .post("http://localhost:8080/myBuyLecture", { userId: user.userId })
    .then((response) => {
      box2_div2.textContent = "영상 구매수: " + response.data.length + "개";
      let total_price = 0;
      response.data.forEach((lectureUser) => {
        total_price = total_price + lectureUser.lecture.price;
      });
      box2_div3.textContent = "영상 구매금액: " + total_price * 200 + "원";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  const box3 = document.createElement("div");
  box3.classList.add("user_detail_box");

  const box3_div1 = document.createElement("div");
  box3_div1.textContent = "피드 갯수: 10개(수정필요)";

  const box3_div2 = document.createElement("div");
  box3_div2.textContent = "팔로워수: 1명(수정필요)";

  const box3_div3 = document.createElement("div");
  box3_div3.textContent = "팔로잉수: 2명(수정필요)";

  box1.appendChild(box1_div1);
  box1.appendChild(box1_div2);
  box1.appendChild(box1_div3);
  box1.appendChild(box1_div4);

  box2.appendChild(box2_div1);
  box2.appendChild(box2_div2);
  box2.appendChild(box2_div3);

  box3.appendChild(box3_div1);
  box3.appendChild(box3_div2);
  box3.appendChild(box3_div3);

  body.appendChild(h3);
  body.appendChild(user_detail_userId);
  body.appendChild(box1);
  body.appendChild(box2);
  body.appendChild(box3);

  user_item.appendChild(body);
}

function showTeacherDetail(teacher, user_item) {
  console.log("showUserDetail");
  let remove = document.querySelector(".user_detail");

  if (remove) {
    remove.remove();
  }

  const body = document.createElement("div");
  body.classList.add("user_detail");

  const h3 = document.createElement("h3");
  h3.textContent = "강사 세부 정보";

  const user_detail_userId = document.createElement("div");
  user_detail_userId.classList.add("user_detail_userId");
  user_detail_userId.textContent = teacher.user.userId;

  const box1 = document.createElement("div");
  box1.classList.add("user_detail_box");

  const box1_div1 = document.createElement("div");
  box1_div1.textContent = "이름: " + teacher.user.userName;

  const box1_div2 = document.createElement("div");
  box1_div2.textContent = "이메일: " + teacher.user.email;

  const box1_div3 = document.createElement("div");
  const birthday = new Date(teacher.user.birthday);
  const birthdayData = `${birthday.getFullYear()}-${
    birthday.getMonth() + 1
  }-${birthday.getDate()}`;
  box1_div3.textContent = "생일: " + birthdayData;

  const box1_div4 = document.createElement("div");
  const createdAt = new Date(teacher.user.createdAt);
  const createdAtData = `${createdAt.getFullYear()}-${
    createdAt.getMonth() + 1
  }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  box1_div4.textContent = "등록 날짜: " + createdAtData;

  const box2 = document.createElement("div");
  box2.classList.add("user_detail_box");

  const box2_div1 = document.createElement("div");
  box2_div1.textContent = "단백질바: " + teacher.user.coin + "개";

  const box2_div2 = document.createElement("div");
  const box2_div3 = document.createElement("div");

  axios
    .post("http://localhost:8080/myBuyLecture", { userId: teacher.user.userId })
    .then((response) => {
      box2_div2.textContent = "영상 구매수: " + response.data.length + "개";
      let total_price = 0;
      response.data.forEach((lectureUser) => {
        total_price = total_price + lectureUser.lecture.price;
      });
      box2_div3.textContent = "영상 구매금액: " + total_price * 200 + "원";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  const box3 = document.createElement("div");
  box3.classList.add("user_detail_box");

  const box3_div1 = document.createElement("div");
  box3_div1.textContent = "피드 갯수: 10개(수정필요)";

  const box3_div2 = document.createElement("div");
  box3_div2.textContent = "팔로워수: 1명(수정필요)";

  const box3_div3 = document.createElement("div");
  box3_div3.textContent = "팔로잉수: 2명(수정필요)";

  const box4 = document.createElement("div");
  box4.classList.add("user_detail_box");

  const box4_div1 = document.createElement("div");
  axios
    .post("http://localhost:8080/teacherSubscription", { id: teacher.id })
    .then((response) => {
      box4_div1.textContent = "구독자: " + response.data + "명";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  const box4_div2 = document.createElement("div");
  axios
    .post("http://localhost:8080/findTeacherLecture", { id: teacher.id })
    .then((response) => {
      box4_div2.textContent =
        "영상 업로드 갯수: " + response.data.length + "개";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  const box4_div3 = document.createElement("div");
  const box4_div4 = document.createElement("div");
  axios
    .post("http://localhost:8080/findLectureUserByTeacher", { id: teacher.id })
    .then((response) => {
      box4_div3.textContent = "판매건수: " + response.data.length + "건";
      let total_price = 0;
      response.data.forEach((lectureUser) => {
        total_price = total_price + lectureUser.lecture.price;
      });
      box4_div4.textContent = "영상 판매금액: " + total_price * 200 + "원";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  box1.appendChild(box1_div1);
  box1.appendChild(box1_div2);
  box1.appendChild(box1_div3);
  box1.appendChild(box1_div4);

  box2.appendChild(box2_div1);
  box2.appendChild(box2_div2);
  box2.appendChild(box2_div3);

  box3.appendChild(box3_div1);
  box3.appendChild(box3_div2);
  box3.appendChild(box3_div3);

  box4.appendChild(box4_div1);
  box4.appendChild(box4_div2);
  box4.appendChild(box4_div3);
  box4.appendChild(box4_div4);

  body.appendChild(h3);
  body.appendChild(user_detail_userId);
  body.appendChild(box1);
  body.appendChild(box2);
  body.appendChild(box3);
  body.appendChild(box4);

  user_item.appendChild(body);

  user_item.classList.add("no-hover");
}
document.querySelectorAll(".user_item").forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.add("clicked");
    document.querySelectorAll(".user_item").forEach((el) => {
      if (el !== this) el.classList.remove("clicked");
    });
  });
});

// manager_lecture 강의 정보

function create_lecture_detail() {
  create_lecture_detail_all();
  create_lecture_detail_teacher();
}

function create_lecture_detail_all() {
  const user_list_user_flex = document.querySelector(".lecture_list_all_flex");

  allLecture.forEach((lecture, index) => {
    const user_item = document.createElement("div");
    user_item.classList.add("lecture_item");
    user_item.onclick = () => showLectureDetail(lecture, user_item);

    const user_item_flex = document.createElement("div");
    user_item_flex.classList.add("lecture_item_flex");

    const user_item_userId = document.createElement("div");
    user_item_userId.classList.add("lecture_item_userId");
    user_item_userId.textContent = "영상제목: " + lecture.lectureName;

    const user_item_date = document.createElement("div");
    user_item_date.classList.add("lecture_item_date");
    const createdAt = new Date(lecture.createdAt);
    const formattedDateTime = `${createdAt.getFullYear()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
    user_item_date.textContent = formattedDateTime + " 업로드";

    const user_item_flex_detail = document.createElement("div");
    user_item_flex_detail.classList.add("lecture_item_flex_detail");

    const user_item_cash = document.createElement("div");
    user_item_cash.classList.add("lecture_item_cash");
    user_item_cash.textContent =
      "강사 이름: " +
      lecture.teacher.user.userName +
      "(아이디 " +
      lecture.teacher.user.userId +
      ")";

    const user_item_lecture = document.createElement("div");
    user_item_lecture.classList.add("lecture_item_lecture");
    const user_item_total = document.createElement("div");
    user_item_total.classList.add("lecture_item_lecture");

    axios
      .post("http://localhost:8080/buyNumber", { id: lecture.id })
      .then((response) => {
        user_item_lecture.textContent = "판매수: " + response.data + "개";
        user_item_total.textContent =
          "영상 판매금액: " + lecture.price * 200 * response.data + "원";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });

    const user_item_feed = document.createElement("div");
    user_item_feed.classList.add("lecture_item_lecture");
    user_item_feed.textContent =
      "단백질바: " + lecture.price + "개(" + lecture.price * 200 + "원)";

    user_item_flex.appendChild(user_item_userId);
    user_item_flex.appendChild(user_item_date);

    user_item_flex_detail.appendChild(user_item_cash);
    user_item_flex_detail.appendChild(user_item_feed);
    user_item_flex_detail.appendChild(user_item_lecture);
    user_item_flex_detail.appendChild(user_item_total);

    user_item.appendChild(user_item_flex);
    user_item.appendChild(user_item_flex_detail);

    user_list_user_flex.appendChild(user_item);
  });
}

function create_lecture_detail_teacher() {
  const user_list_user_flex = document.querySelector(
    ".lecture_list_today_flex"
  );

  todayLectures.forEach((lecture, index) => {
    const user_item = document.createElement("div");
    user_item.classList.add("lecture_item");
    user_item.onclick = () => showLectureDetailToday(lecture, user_item);

    const user_item_flex = document.createElement("div");
    user_item_flex.classList.add("lecture_item_flex");

    const user_item_userId = document.createElement("div");
    user_item_userId.classList.add("lecture_item_userId");
    user_item_userId.textContent = "영상제목: " + lecture.lectureName;

    const user_item_date = document.createElement("div");
    user_item_date.classList.add("lecture_item_date");
    const createdAt = new Date(lecture.createdAt);
    const formattedDateTime = `${createdAt.getFullYear()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
    user_item_date.textContent = formattedDateTime + " 업로드";

    const user_item_flex_detail = document.createElement("div");
    user_item_flex_detail.classList.add("lecture_item_flex_detail");

    const user_item_cash = document.createElement("div");
    user_item_cash.classList.add("lecture_item_cash");
    user_item_cash.textContent =
      "강사 이름: " +
      lecture.teacher.user.userName +
      "(아이디 " +
      lecture.teacher.user.userId +
      ")";

    const user_item_lecture = document.createElement("div");
    user_item_lecture.classList.add("lecture_item_lecture");
    const user_item_total = document.createElement("div");
    user_item_total.classList.add("lecture_item_lecture");

    axios
      .post("http://localhost:8080/buyNumber", { id: lecture.id })
      .then((response) => {
        user_item_lecture.textContent = "판매수: " + response.data + "개";
        user_item_total.textContent =
          "영상 판매금액: " + lecture.price * 200 * response.data + "원";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });

    const user_item_feed = document.createElement("div");
    user_item_feed.classList.add("lecture_item_lecture");
    user_item_feed.textContent =
      "단백질바: " + lecture.price + "개(" + lecture.price * 200 + "원)";

    user_item_flex.appendChild(user_item_userId);
    user_item_flex.appendChild(user_item_date);

    user_item_flex_detail.appendChild(user_item_cash);
    user_item_flex_detail.appendChild(user_item_feed);
    user_item_flex_detail.appendChild(user_item_lecture);
    user_item_flex_detail.appendChild(user_item_total);

    user_item.appendChild(user_item_flex);
    user_item.appendChild(user_item_flex_detail);

    user_list_user_flex.appendChild(user_item);
  });
}

// function create_lecture_detail_user_taacher(){
//     console.log("create_lecture_detail_user_taacher")
//     const user_list_teacher_flex = document.querySelector(".lecture_list_today_flex");

//     allTeacher.forEach((teacher, index)=>{
//         const user_item = document.createElement("div");
//         user_item.classList.add("lecture_item");
//         user_item.onclick = () => showLecture2Detail(teacher);

//         const user_item_flex = document.createElement("div");
//         user_item_flex.classList.add("lecture_item_flex");

//         const user_item_userId = document.createElement("div");
//         user_item_userId.classList.add("lecture_item_userId");
//         user_item_userId.textContent = teacher.user.userId + "(강사)"

//         const user_item_date = document.createElement("div");
//         user_item_date.classList.add("lecture_item_date");
//         const createdAt = new Date(teacher.user.createdAt);
//         const formattedDateTime = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
//         user_item_date.textContent = formattedDateTime + " 가입"

//         const user_item_flex_detail = document.createElement("div");
//         user_item_flex_detail.classList.add("lecture_item_flex_detail");

//         const user_item_cash = document.createElement("div");
//         user_item_cash.classList.add("lecture_item_cash");

//         axios
//         .post("http://localhost:8080/teacherSubscription", {id: teacher.id})
//         .then((response)=>{
//             user_item_cash.textContent = "구독자: " + response.data + "명"
//         })
//         .catch((error)=>{
//             console.log("에러: ", error)
//         })

//         const user_item_lecture = document.createElement("div");
//         user_item_lecture.classList.add("lecture_item_lecture");
//         const user_item_total = document.createElement("div");
//         user_item_total.classList.add("lecture_item_lecture");

//         axios
//         .post("http://localhost:8080/findTeacherLecture", {id: teacher.id})
//         .then((response)=>{
//             user_item_lecture.textContent = "영상 업로드 갯수: " + response.data.length + "개"
//         })
//         .catch((error)=>{
//             console.log("에러: ", error)
//         })

//         axios
//         .post("http://localhost:8080/findLectureUserByTeacher", {id: teacher.id})
//         .then((response)=>{
//             let total_price = 0
//             response.data.forEach((lectureUser)=>{
//                 total_price = total_price + lectureUser.lecture.price
//             })
//             user_item_total.textContent = "영상 판매금액: " + (total_price * 200) + "원"
//         })
//         .catch((error)=>{
//             console.log("에러: ", error)
//         })

//         const user_item_feed = document.createElement("div");
//         user_item_feed.classList.add("lecture_item_lecture");
//         user_item_feed.textContent = "피드 갯수: 10개(수정필요)"

//         user_item_flex.appendChild(user_item_userId)
//         user_item_flex.appendChild(user_item_date)

//         user_item_flex_detail.appendChild(user_item_cash)
//         user_item_flex_detail.appendChild(user_item_lecture)
//         user_item_flex_detail.appendChild(user_item_total)
//         user_item_flex_detail.appendChild(user_item_feed)

//         user_item.appendChild(user_item_flex)
//         user_item.appendChild(user_item_flex_detail)

//         user_list_teacher_flex.appendChild(user_item)
//     })
// }

function showLectureDetail(lecture, user_item) {
  console.log("showUserDetail");
  let remove = document.querySelector(".lecture_detail");

  if (remove) {
    remove.remove();
  }

  const body = document.createElement("div");
  body.classList.add("lecture_detail");

  const h3 = document.createElement("h3");
  h3.textContent = "영상 세부 정보";

  const user_detail_userId = document.createElement("div");
  user_detail_userId.classList.add("lecture_detail_userId");
  user_detail_userId.textContent = lecture.lectureName;

  const box1 = document.createElement("div");
  box1.classList.add("lecture_detail_box");

  const box1_div1 = document.createElement("div");
  box1_div1.textContent = "설명: " + lecture.description;

  const box1_div2 = document.createElement("div");
  box1_div2.textContent =
    "강사 이름: " +
    lecture.teacher.user.userName +
    "(아이디 " +
    lecture.teacher.user.userId +
    ")";

  const box1_div3 = document.createElement("div");
  box1_div3.textContent =
    "단백질바: " + lecture.price + "개(" + lecture.price * 200 + "원)";

  const box1_div4 = document.createElement("div");
  const createdAt = new Date(lecture.createdAt);
  const createdAtData = `${createdAt.getFullYear()}-${
    createdAt.getMonth() + 1
  }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  box1_div4.textContent = "등록 날짜: " + createdAtData;

  const box2 = document.createElement("div");
  box2.classList.add("lecture_detail_box");

  const box2_div1 = document.createElement("div");
  categoryString = "카테고리: ";
  axios
    .post("http://localhost:8080/findLectureCategory", { id: lecture.id })
    .then((response) => {
      lectureCategory = response.data;
      lectureCategory.forEach((lectureCategory, index) => {
        if (index == 0) {
          categoryString =
            categoryString + lectureCategory.category.categoryName;
        } else {
          categoryString =
            categoryString + ", " + lectureCategory.category.categoryName;
        }
      });
      box2_div1.textContent = categoryString;
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  const box2_div2 = document.createElement("div");
  const box2_div3 = document.createElement("div");
  axios
    .post("http://localhost:8080/buyNumber", { id: lecture.id })
    .then((response) => {
      box2_div2.textContent = "판매수: " + response.data + "개";
      box2_div3.textContent =
        "영상 판매금액: " + lecture.price * 200 * response.data + "원";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  // const box3 = document.createElement("div");
  // box3.classList.add("lecture_detail_box");

  // const box3_div1 = document.createElement("div");
  // box3_div1.textContent = "피드 갯수: 10개(수정필요)"

  // const box3_div2 = document.createElement("div");
  // box3_div2.textContent = "팔로워수: 1명(수정필요)"

  // const box3_div3 = document.createElement("div");
  // box3_div3.textContent = "팔로잉수: 2명(수정필요)"

  // const box4_div1 = document.createElement("div");
  // axios
  // .post("http://localhost:8080/teacherSubscription", {id: teacher.id})
  // .then((response)=>{
  //     box4_div1.textContent = "구독자: " + response.data + "명"
  // })
  // .catch((error)=>{
  //     console.log("에러: ", error)
  // })

  // const box4_div2 = document.createElement("div");
  // axios
  // .post("http://localhost:8080/findTeacherLecture", {id: teacher.id})
  // .then((response)=>{
  //     box4_div2.textContent = "영상 업로드 갯수: " + response.data.length + "개"
  // })
  // .catch((error)=>{
  //     console.log("에러: ", error)
  // })

  // const box4_div3 = document.createElement("div");
  // const box4_div4 = document.createElement("div");
  // axios
  // .post("http://localhost:8080/findLectureUserByTeacher", {id: teacher.id})
  // .then((response)=>{
  //     box4_div3.textContent = "판매건수: " + response.data.length + "건"
  //     let total_price = 0
  //     response.data.forEach((lectureUser)=>{
  //         total_price = total_price + lectureUser.lecture.price
  //     })
  //     box4_div4.textContent = "영상 판매금액: " + (total_price * 200) + "원"
  // })
  // .catch((error)=>{
  //     console.log("에러: ", error)
  // })

  box1.appendChild(box1_div1);
  box1.appendChild(box1_div2);
  box1.appendChild(box1_div3);
  box1.appendChild(box1_div4);

  box2.appendChild(box2_div1);
  box2.appendChild(box2_div2);
  box2.appendChild(box2_div3);

  // box3.appendChild(box3_div1)
  // box3.appendChild(box3_div2)
  // box3.appendChild(box3_div3)

  body.appendChild(h3);
  body.appendChild(user_detail_userId);
  body.appendChild(box1);
  body.appendChild(box2);
  // body.appendChild(box3)
  user_item.appendChild(body);
  lecture_item.classList.add("no-hover");
}
document.querySelectorAll(".lecture_item").forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.add("clicked");
    document.querySelectorAll(".lecture_item").forEach((el) => {
      if (el !== this) el.classList.remove("clicked");
    });
  });
});

// function showLecture2Detail(teacher){
//     console.log("showTeacherDetail")
//     let remove = document.querySelector(".lecture_detail");
//     let find = document.querySelector(".lecture_detail_userId");

//     if (find) {
//         while (remove.firstChild) {
//             remove.removeChild(remove.firstChild);
//         }
//     }

//     const body = document.querySelector(".lecture_detail");

//     const h3 = document.createElement("h3");
//     h3.textContent = "강사 세부 정보"

//     const user_detail_userId = document.createElement("div");
//     user_detail_userId.classList.add("lecture_detail_userId");
//     user_detail_userId.textContent = teacher.user.userId

//     const box1 = document.createElement("div");
//     box1.classList.add("lecture_detail_box");

//     const box1_div1 = document.createElement("div");
//     box1_div1.textContent = "이름: " + teacher.user.userName

//     const box1_div2 = document.createElement("div");
//     box1_div2.textContent = "이메일: " + teacher.user.email

//     const box1_div3 = document.createElement("div");
//     const birthday = new Date(teacher.user.birthday);
//     const birthdayData = `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`;
//     box1_div3.textContent = "생일: " + birthdayData

//     const box1_div4 = document.createElement("div");
//     const createdAt = new Date(teacher.user.createdAt);
//     const createdAtData = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
//     box1_div4.textContent = "등록 날짜: " + createdAtData

//     const box2 = document.createElement("div");
//     box2.classList.add("lecture_detail_box");

//     const box2_div1 = document.createElement("div");
//     box2_div1.textContent = "단백질바: " + teacher.user.coin + "개"

//     const box2_div2 = document.createElement("div");
//     const box2_div3 = document.createElement("div");

//     axios
//     .post("http://localhost:8080/myBuyLecture", {userId: teacher.user.userId})
//     .then((response)=>{
//         box2_div2.textContent = "영상 구매수: " + response.data.length + "개"
//         let total_price = 0;
//         response.data.forEach((lectureUser)=>{
//             total_price = total_price + lectureUser.lecture.price
//         })
//         box2_div3.textContent = "영상 구매금액: " + (total_price * 200) + "원"
//     })
//     .catch((error)=>{
//         console.log("에러: ", error)
//     })

//     const box3 = document.createElement("div");
//     box3.classList.add("lecture_detail_box");

//     const box3_div1 = document.createElement("div");
//     box3_div1.textContent = "피드 갯수: 10개(수정필요)"

//     const box3_div2 = document.createElement("div");
//     box3_div2.textContent = "팔로워수: 1명(수정필요)"

//     const box3_div3 = document.createElement("div");
//     box3_div3.textContent = "팔로잉수: 2명(수정필요)"

//     const box4 = document.createElement("div");
//     box4.classList.add("lecture_detail_box");

//     const box4_div1 = document.createElement("div");
//     axios
//     .post("http://localhost:8080/teacherSubscription", {id: teacher.id})
//     .then((response)=>{
//         box4_div1.textContent = "구독자: " + response.data + "명"
//     })
//     .catch((error)=>{
//         console.log("에러: ", error)
//     })

//     const box4_div2 = document.createElement("div");
//     axios
//     .post("http://localhost:8080/findTeacherLecture", {id: teacher.id})
//     .then((response)=>{
//         box4_div2.textContent = "영상 업로드 갯수: " + response.data.length + "개"
//     })
//     .catch((error)=>{
//         console.log("에러: ", error)
//     })

//     const box4_div3 = document.createElement("div");
//     const box4_div4 = document.createElement("div");
//     axios
//     .post("http://localhost:8080/findLectureUserByTeacher", {id: teacher.id})
//     .then((response)=>{
//         box4_div3.textContent = "판매건수: " + response.data.length + "건"
//         let total_price = 0
//         response.data.forEach((lectureUser)=>{
//             total_price = total_price + lectureUser.lecture.price
//         })
//         box4_div4.textContent = "영상 판매금액: " + (total_price * 200) + "원"
//     })
//     .catch((error)=>{
//         console.log("에러: ", error)
//     })

//     box1.appendChild(box1_div1)
//     box1.appendChild(box1_div2)
//     box1.appendChild(box1_div3)
//     box1.appendChild(box1_div4)

//     box2.appendChild(box2_div1)
//     box2.appendChild(box2_div2)
//     box2.appendChild(box2_div3)

//     box3.appendChild(box3_div1)
//     box3.appendChild(box3_div2)
//     box3.appendChild(box3_div3)

//     box4.appendChild(box4_div1)
//     box4.appendChild(box4_div2)
//     box4.appendChild(box4_div3)
//     box4.appendChild(box4_div4)

//     body.appendChild(h3)
//     body.appendChild(user_detail_userId)
//     body.appendChild(box1)
//     body.appendChild(box2)
//     body.appendChild(box3)
//     body.appendChild(box4)
// }

function showLectureDetailToday(lecture, user_item) {
  console.log("showUserDetail");
  let remove = document.querySelector(".lecture_detail");

  if (remove) {
    remove.remove();
  }

  const body = document.createElement("div");
  body.classList.add("lecture_detail");

  const h3 = document.createElement("h3");
  h3.textContent = "영상 세부 정보";

  const user_detail_userId = document.createElement("div");
  user_detail_userId.classList.add("lecture_detail_userId");
  user_detail_userId.textContent = lecture.lectureName;

  const box1 = document.createElement("div");
  box1.classList.add("lecture_detail_box");

  const box1_div1 = document.createElement("div");
  box1_div1.textContent = "설명: " + lecture.description;

  const box1_div2 = document.createElement("div");
  box1_div2.textContent =
    "강사 이름: " +
    lecture.teacher.user.userName +
    "(아이디 " +
    lecture.teacher.user.userId +
    ")";

  const box1_div3 = document.createElement("div");
  box1_div3.textContent =
    "단백질바: " + lecture.price + "개(" + lecture.price * 200 + "원)";

  const box1_div4 = document.createElement("div");
  const createdAt = new Date(lecture.createdAt);
  const createdAtData = `${createdAt.getFullYear()}-${
    createdAt.getMonth() + 1
  }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  box1_div4.textContent = "등록 날짜: " + createdAtData;

  const box2 = document.createElement("div");
  box2.classList.add("lecture_detail_box");

  const box2_div1 = document.createElement("div");
  categoryString = "카테고리: ";
  axios
    .post("http://localhost:8080/findLectureCategory", { id: lecture.id })
    .then((response) => {
      lectureCategory = response.data;
      lectureCategory.forEach((lectureCategory, index) => {
        if (index == 0) {
          categoryString =
            categoryString + lectureCategory.category.categoryName;
        } else {
          categoryString =
            categoryString + ", " + lectureCategory.category.categoryName;
        }
      });
      box2_div1.textContent = categoryString;
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  const box2_div2 = document.createElement("div");
  const box2_div3 = document.createElement("div");
  axios
    .post("http://localhost:8080/buyNumber", { id: lecture.id })
    .then((response) => {
      box2_div2.textContent = "판매수: " + response.data + "개";
      box2_div3.textContent =
        "영상 판매금액: " + lecture.price * 200 * response.data + "원";
    })
    .catch((error) => {
      console.log("에러: ", error);
    });

  // const box3 = document.createElement("div");
  // box3.classList.add("lecture_detail_box");

  // const box3_div1 = document.createElement("div");
  // box3_div1.textContent = "피드 갯수: 10개(수정필요)"

  // const box3_div2 = document.createElement("div");
  // box3_div2.textContent = "팔로워수: 1명(수정필요)"

  // const box3_div3 = document.createElement("div");
  // box3_div3.textContent = "팔로잉수: 2명(수정필요)"

  // const box4_div1 = document.createElement("div");
  // axios
  // .post("http://localhost:8080/teacherSubscription", {id: teacher.id})
  // .then((response)=>{
  //     box4_div1.textContent = "구독자: " + response.data + "명"
  // })
  // .catch((error)=>{
  //     console.log("에러: ", error)
  // })

  // const box4_div2 = document.createElement("div");
  // axios
  // .post("http://localhost:8080/findTeacherLecture", {id: teacher.id})
  // .then((response)=>{
  //     box4_div2.textContent = "영상 업로드 갯수: " + response.data.length + "개"
  // })
  // .catch((error)=>{
  //     console.log("에러: ", error)
  // })

  // const box4_div3 = document.createElement("div");
  // const box4_div4 = document.createElement("div");
  // axios
  // .post("http://localhost:8080/findLectureUserByTeacher", {id: teacher.id})
  // .then((response)=>{
  //     box4_div3.textContent = "판매건수: " + response.data.length + "건"
  //     let total_price = 0
  //     response.data.forEach((lectureUser)=>{
  //         total_price = total_price + lectureUser.lecture.price
  //     })
  //     box4_div4.textContent = "영상 판매금액: " + (total_price * 200) + "원"
  // })
  // .catch((error)=>{
  //     console.log("에러: ", error)
  // })

  box1.appendChild(box1_div1);
  box1.appendChild(box1_div2);
  box1.appendChild(box1_div3);
  box1.appendChild(box1_div4);

  box2.appendChild(box2_div1);
  box2.appendChild(box2_div2);
  box2.appendChild(box2_div3);

  // box3.appendChild(box3_div1)
  // box3.appendChild(box3_div2)
  // box3.appendChild(box3_div3)

  body.appendChild(h3);
  body.appendChild(user_detail_userId);
  body.appendChild(box1);
  body.appendChild(box2);
  // body.appendChild(box3)

  user_item.appendChild(body);
}

document
  .querySelector(".content_menu_manager_home")
  .addEventListener("click", () => {
    console.log("ㅎㅎ");
    document
      .querySelector(".content_menu_manager_home")
      .classList.add("content_menu_bold");
    document
      .querySelector(".content_menu_manager_user")
      .classList.remove("content_menu_bold");
    document
      .querySelector(".content_menu_manager_lecture")
      .classList.remove("content_menu_bold");

    document.querySelector(".manager_home").classList.remove("hiden");
    document.querySelector(".manager_user").classList.add("hiden");
    document.querySelector(".manager_lecture").classList.add("hiden");
  });

document
  .querySelector(".content_menu_manager_user")
  .addEventListener("click", () => {
    document
      .querySelector(".content_menu_manager_user")
      .classList.add("content_menu_bold");
    document
      .querySelector(".content_menu_manager_home")
      .classList.remove("content_menu_bold");
    document
      .querySelector(".content_menu_manager_lecture")
      .classList.remove("content_menu_bold");

    document.querySelector(".manager_user").classList.remove("hiden");
    document.querySelector(".manager_home").classList.add("hiden");
    document.querySelector(".manager_lecture").classList.add("hiden");
  });

document
  .querySelector(".content_menu_manager_lecture")
  .addEventListener("click", () => {
    document
      .querySelector(".content_menu_manager_lecture")
      .classList.add("content_menu_bold");
    document
      .querySelector(".content_menu_manager_home")
      .classList.remove("content_menu_bold");
    document
      .querySelector(".content_menu_manager_user")
      .classList.remove("content_menu_bold");

    document.querySelector(".manager_lecture").classList.remove("hiden");
    document.querySelector(".manager_home").classList.add("hiden");
    document.querySelector(".manager_user").classList.add("hiden");
  });

// 홈페이지의 유저관리 버튼

document.querySelector(".box_tatal_user").addEventListener("click", () => {
  console.log("전체");
  document
    .querySelector(".content_menu_manager_user")
    .classList.add("content_menu_bold");
  document
    .querySelector(".content_menu_manager_home")
    .classList.remove("content_menu_bold");
  document
    .querySelector(".content_menu_manager_lecture")
    .classList.remove("content_menu_bold");

  document.querySelector(".manager_user").classList.remove("hiden");
  document.querySelector(".manager_home").classList.add("hiden");
  document.querySelector(".manager_lecture").classList.add("hiden");

  console.log(document.querySelector(".user_list_user"));
  document.querySelector(".user_list_user").classList.remove("hiden");
  document.querySelector(".user_list_teacher").classList.remove("hiden");

  document.querySelector(".manager_user_allBtn").id =
    "manager_user_btn_flex_hiden";
  document.querySelector(".manager_user_userBtn").id = "";
  document.querySelector(".manager_user_teacherBtn").id = "";
});

document
  .querySelector(".tatal_user_user")
  .addEventListener("click", (event) => {
    event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
    console.log("유저");
    document
      .querySelector(".content_menu_manager_user")
      .classList.add("content_menu_bold");
    document
      .querySelector(".content_menu_manager_home")
      .classList.remove("content_menu_bold");
    document
      .querySelector(".content_menu_manager_lecture")
      .classList.remove("content_menu_bold");

    document.querySelector(".manager_user").classList.remove("hiden");
    document.querySelector(".manager_home").classList.add("hiden");
    document.querySelector(".manager_lecture").classList.add("hiden");

    document.querySelector(".user_list_user").classList.remove("hiden");
    document.querySelector(".user_list_teacher").classList.add("hiden");

    document.querySelector(".manager_user_userBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_user_allBtn").id = "";
    document.querySelector(".manager_user_teacherBtn").id = "";
  });

document
  .querySelector(".tatal_user_teacher")
  .addEventListener("click", (event) => {
    event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
    console.log("강사");
    document
      .querySelector(".content_menu_manager_user")
      .classList.add("content_menu_bold");
    document
      .querySelector(".content_menu_manager_home")
      .classList.remove("content_menu_bold");
    document
      .querySelector(".content_menu_manager_lecture")
      .classList.remove("content_menu_bold");

    document.querySelector(".manager_user").classList.remove("hiden");
    document.querySelector(".manager_home").classList.add("hiden");
    document.querySelector(".manager_lecture").classList.add("hiden");

    document.querySelector(".user_list_teacher").classList.remove("hiden");
    document.querySelector(".user_list_user").classList.add("hiden");

    document.querySelector(".manager_user_teacherBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_user_allBtn").id = "";
    document.querySelector(".manager_user_userBtn").id = "";
  });

// 유저관리의 버튼
document.querySelector(".manager_user_allBtn").addEventListener("click", () => {
  document.querySelector(".user_list_user").classList.remove("hiden");
  document.querySelector(".user_list_teacher").classList.remove("hiden");

  document.querySelector(".manager_user_allBtn").id =
    "manager_user_btn_flex_hiden";
  document.querySelector(".manager_user_userBtn").id = "";
  document.querySelector(".manager_user_teacherBtn").id = "";
});

document
  .querySelector(".manager_user_userBtn")
  .addEventListener("click", () => {
    document.querySelector(".user_list_user").classList.remove("hiden");
    document.querySelector(".user_list_teacher").classList.add("hiden");

    document.querySelector(".manager_user_userBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_user_allBtn").id = "";
    document.querySelector(".manager_user_teacherBtn").id = "";
  });

document
  .querySelector(".manager_user_teacherBtn")
  .addEventListener("click", () => {
    document.querySelector(".user_list_teacher").classList.remove("hiden");
    document.querySelector(".user_list_user").classList.add("hiden");

    document.querySelector(".manager_user_teacherBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_user_allBtn").id = "";
    document.querySelector(".manager_user_userBtn").id = "";
  });

// 홈페이지의 강의 all 버튼
document.querySelector(".box_tatal_lectures").addEventListener("click", () => {
  document
    .querySelector(".content_menu_manager_lecture")
    .classList.add("content_menu_bold");
  document
    .querySelector(".content_menu_manager_home")
    .classList.remove("content_menu_bold");
  document
    .querySelector(".content_menu_manager_user")
    .classList.remove("content_menu_bold");

  document.querySelector(".manager_lecture").classList.remove("hiden");
  document.querySelector(".manager_home").classList.add("hiden");
  document.querySelector(".manager_user").classList.add("hiden");

  // console.log(document.querySelector(".user_list_user"))
  document.querySelector(".lecture_list_all").classList.remove("hiden");
  document.querySelector(".lecture_list_today").classList.add("hiden");

  document.querySelector(".manager_lecture_allBtn").id =
    "manager_user_btn_flex_hiden";
  document.querySelector(".manager_lecture_todayBtn").id = "";
  document.querySelector(".manager_lecture_teacherBtn").id = "";

  let remove = document.querySelector(".lecture_detail");
  let find = document.querySelector(".lecture_detail_userId");

  if (find) {
    while (remove.firstChild) {
      remove.removeChild(remove.firstChild);
    }
  }
});

// 홈페이지의 강의 today 버튼
document.querySelector(".box_today_upload").addEventListener("click", () => {
  document
    .querySelector(".content_menu_manager_lecture")
    .classList.add("content_menu_bold");
  document
    .querySelector(".content_menu_manager_home")
    .classList.remove("content_menu_bold");
  document
    .querySelector(".content_menu_manager_user")
    .classList.remove("content_menu_bold");

  document.querySelector(".manager_lecture").classList.remove("hiden");
  document.querySelector(".manager_home").classList.add("hiden");
  document.querySelector(".manager_user").classList.add("hiden");

  // console.log(document.querySelector(".user_list_user"))
  document.querySelector(".lecture_list_today").classList.remove("hiden");
  document.querySelector(".lecture_list_all").classList.add("hiden");

  document.querySelector(".manager_lecture_todayBtn").id =
    "manager_user_btn_flex_hiden";
  document.querySelector(".manager_lecture_allBtn").id = "";
  document.querySelector(".manager_lecture_teacherBtn").id = "";

  let remove = document.querySelector(".lecture_detail");
  let find = document.querySelector(".lecture_detail_userId");

  if (find) {
    while (remove.firstChild) {
      remove.removeChild(remove.firstChild);
    }
  }
});

// 강의관리의 버튼
document
  .querySelector(".manager_lecture_allBtn")
  .addEventListener("click", () => {
    document.querySelector(".lecture_list_all").classList.remove("hiden");
    document.querySelector(".lecture_list_today").classList.add("hiden");

    document.querySelector(".manager_lecture_allBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_lecture_todayBtn").id = "";
    document.querySelector(".manager_lecture_teacherBtn").id = "";

    let remove = document.querySelector(".lecture_detail");
    let find = document.querySelector(".lecture_detail_userId");

    if (find) {
      while (remove.firstChild) {
        remove.removeChild(remove.firstChild);
      }
    }
  });

document
  .querySelector(".manager_lecture_todayBtn")
  .addEventListener("click", () => {
    document.querySelector(".lecture_list_today").classList.remove("hiden");
    document.querySelector(".lecture_list_all").classList.add("hiden");

    document.querySelector(".manager_lecture_todayBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_lecture_allBtn").id = "";
    document.querySelector(".manager_lecture_teacherBtn").id = "";

    let remove = document.querySelector(".lecture_detail");
    let find = document.querySelector(".lecture_detail_userId");

    if (find) {
      while (remove.firstChild) {
        remove.removeChild(remove.firstChild);
      }
    }
  });

document
  .querySelector(".manager_lecture_teacherBtn")
  .addEventListener("click", () => {
    document.querySelector(".lecture_list_today").classList.add("hiden");
    document.querySelector(".lecture_list_all").classList.add("hiden");

    document.querySelector(".manager_lecture_teacherBtn").id =
      "manager_user_btn_flex_hiden";
    document.querySelector(".manager_lecture_allBtn").id = "";
    document.querySelector(".manager_lecture_todayBtn").id = "";

    let remove = document.querySelector(".lecture_detail");
    let find = document.querySelector(".lecture_detail_userId");

    if (find) {
      while (remove.firstChild) {
        remove.removeChild(remove.firstChild);
      }
    }
  });
