const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("id: ", id);

const url = "http://localhost:8080/teacher/" + id;

function sessionCreateAll(user){
  axios
  .get(url)
  .then((response)=>{
      console.log("데이터: ", response.data);
      create(response.data)
  })
  .catch((error)=>{
      console.log("에러 발생: ", error);
  });

  function create(data){
    const lecture_teacher_img = document.querySelector(".content_body_teacher_profile_img");
    const img = document.createElement("img");
    img.src = data.user.profileImg;
    lecture_teacher_img.appendChild(img);
    
    const content_body_teacher_name = document.querySelector(".content_body_teacher_name");
    content_body_teacher_name.textContent = data.user.userName;

    const teacher = {
        id: data.id
    }

    const lecture_teacher_num = document.querySelector(".content_body_teacher_subscription_num");
    axios
    .post("http://localhost:8080/teacherSubscription", teacher)
    .then((data)=>{
        console.log("1: ", data.data);
        lecture_teacher_num.textContent = "구독자 " + data.data + "명";
    })
    .catch((error)=>{
        console.log("에러 발생: ", error);
    });


    const date = document.querySelector(".content_body_teacher_date");
    const createdAt = new Date(data.user.createdAt);
    date.textContent = `가입일 ${createdAt.getFullYear()}. ${createdAt.getMonth() + 1}. ${createdAt.getDate()}.`;



    const content_body_teacher_subscription_btn = document.querySelector(".content_body_teacher_subscription_btn");
    if (user.userId === "anonymousUser") {
      content_body_teacher_subscription_btn.textContent = "구독"
      content_body_teacher_subscription_btn.addEventListener("click", ()=>{
          alert("로그인해주세요.");
          window.location.href = "login.html";
      })
    }else{
      axios
      .post("http://localhost:8080/subscriptionCheck", {user, teacher})
      .then((data)=>{
          console.log("구독여부: ", data.data);
          if(data.data!=""){
              content_body_teacher_subscription_btn.textContent = "구독중"
              content_body_teacher_subscription_btn.addEventListener("click", ()=>{
                  axios
                  .post("http://localhost:8080/subscriptionCansel", {id:data.data.id})
                  .then((data)=>{
                      console.log("구독취소: ", data.data);
                      location.reload()
                  })
                  .catch((error)=>{
                      console.log("에러 발생: ", error);
                  });
              })
          }else{
              content_body_teacher_subscription_btn.textContent = "구독"
              content_body_teacher_subscription_btn.addEventListener("click", ()=>{
                  axios
                  .post("http://localhost:8080/subscription", {user, teacher})
                  .then((data)=>{
                      console.log("구독: ", data.data);
                      location.reload()
                  })
                  .catch((error)=>{
                      console.log("에러 발생: ", error);
                  });
              })
          }
      })
      .catch((error)=>{
          console.log("에러 발생: ", error);
      });
    }

    

    const content_body_teacher_price = document.querySelector(".content_body_teacher_price");
    content_body_teacher_price.textContent = "단백질바 " + data.price + "개";

    const text_value = document.querySelector(".content_body_teacher_profile_text_value");
    text_value.textContent = data.user.profileText

    findTeacherLectureReversed(teacher)
  }




  function findTeacherLectureReversed(teacher){
    axios
    .post("http://localhost:8080/findTeacherLectureReversed", teacher)
    .then((response)=>{
      console.log("데이터: ", response.data)
      teacherLecture(response.data)
    })
    .catch((error)=>{
      console.log("에러: ", error)
    })
  }

  function teacherLecture(data){
    const body = document.querySelector(".content_body_teacher_lecture_grid");

    data.forEach((data, index)=>{
      const box = document.createElement("div");
      box.classList.add("content_body_interestLecture_box");
      box.classList.add("box");

      const videoDiv = document.createElement("div");
      const video = document.createElement("video");
      videoDiv.classList.add("content_body_interestLecture_box_img");
      video.src = data.url;

      const div = document.createElement("div");

      const lecture_flex = document.createElement("div");
      lecture_flex.classList.add("lecture_flex");

      const lecture_teacher_profile = document.createElement("div");
      lecture_teacher_profile.classList.add("lecture_teacher_profile");
      const img = document.createElement("img");
      img.src = data.teacher.user.profileImg;

      lecture_teacher_profile.addEventListener("click", (event) => {
        event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
        window.location.href = "teacherView.html?id=" + data.teacher.id;
      });

      img.addEventListener("click", (event) => {
        event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
        window.location.href = "teacherView.html?id=" + data.teacher.id;
      });

      const div2 = document.createElement("div");

      const lecture_title = document.createElement("div");
      lecture_title.classList.add("lecture_title");
      lecture_title.textContent = data.lectureName;

      const lecture_teacher_name = document.createElement("div");
      lecture_teacher_name.classList.add("lecture_teacher_name");
      lecture_teacher_name.textContent = data.teacher.user.userName;

      const lecture_updateTime = document.createElement("div");
      lecture_updateTime.classList.add("lecture_updateTime");
      const createdAt = new Date(data.createdAt);
      lecture_updateTime.textContent = `${createdAt.getFullYear()}. ${createdAt.getMonth() + 1}. ${createdAt.getDate()}.`;

      const lecture_price = document.createElement("div");
      lecture_price.classList.add("lecture_price");
      if(data.price==0){
        lecture_price.textContent = "무료";
      } else{
        lecture_price.textContent = "단백질바 " + data.price + "개";
      }

      videoDiv.appendChild(video);
      lecture_teacher_profile.appendChild(img);

      div2.appendChild(lecture_title)
      div2.appendChild(lecture_teacher_name)
      div2.appendChild(lecture_updateTime)

      lecture_flex.appendChild(lecture_teacher_profile)
      lecture_flex.appendChild(div2)

      div.appendChild(lecture_flex)
      div.appendChild(lecture_price)

      box.appendChild(videoDiv)
      box.appendChild(div)

      body.appendChild(box)

      box.addEventListener("click",()=>{
        window.location.href = "lectureView.html?id=" + data.id
      })
    })
  }
}


let user = ""

function sessionCurrent(){
    axios
    .get("http://localhost:8080/current", {withCredentials:true})
    .then((response)=>{
        console.log("데이터: ", response);
        if(response.status == 200){
            console.log("데이터: ", response.data);
            const userId = response.data.userId;
            const authority = response.data.authority[0].authority;

            user = {
                userId: userId,
                authority: {authorityName: authority}
            }

            sessionCreateAll(user)
            console.log("유저 정보: ", user);
        }
    })
    .catch((error)=>{
        console.log("에러 발생: ", error);
        alert("로그인해주세요.");
    })
};

sessionCurrent();