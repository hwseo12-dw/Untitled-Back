document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const interestLectureSection = document.querySelector(
    ".content_body_interestLecture"
  );
  const interestLectureTitle = document.querySelector(".interestLectureTitle");

  function loadInterestLectures() {
    axios
      .get("http://localhost:8080/findAllLecture")
      .then((response) => {
        console.log("데이터: ", response.data);
        displayLectures(response.data, interestLectureSection);
        interestLectureTitle.textContent = "맞춤 교육 영상";
      })
      .catch((error) => {
        console.log("에러: ", error);
      });
  }

  function displayLectures(data, section) {
    section.innerHTML = ""; // 기존 내용을 초기화
    data.forEach((lecture) => {
      const box = document.createElement("div");
      box.classList.add("content_body_interestLecture_box", "box");

      const videoDiv = document.createElement("div");
      const video = document.createElement("video");
      videoDiv.classList.add("content_body_interestLecture_box_img");
      video.src = lecture.url;

      const div = document.createElement("div");
      const lectureFlex = document.createElement("div");
      lectureFlex.classList.add("lecture_flex");

      const lectureTeacherProfile = document.createElement("div");
      lectureTeacherProfile.classList.add("lecture_teacher_profile");
      const img = document.createElement("img");
      img.src = lecture.teacher.user.profileImg;

      lectureTeacherProfile.addEventListener("click", (event) => {
        event.stopPropagation();
        window.location.href = "teacherView.html?id=" + lecture.teacher.id;
      });

      img.addEventListener("click", (event) => {
        event.stopPropagation();
        window.location.href = "teacherView.html?id=" + lecture.teacher.id;
      });

      const div2 = document.createElement("div");
      const lectureTitle = document.createElement("div");
      lectureTitle.classList.add("lecture_title");
      lectureTitle.textContent = lecture.lectureName;

      const lectureTeacherName = document.createElement("div");
      lectureTeacherName.classList.add("lecture_teacher_name");
      lectureTeacherName.textContent = lecture.teacher.user.userName;

      const lectureUpdateTime = document.createElement("div");
      lectureUpdateTime.classList.add("lecture_updateTime");
      const createdAt = new Date(lecture.createdAt);
      lectureUpdateTime.textContent = `${createdAt.getFullYear()}. ${
        createdAt.getMonth() + 1
      }. ${createdAt.getDate()}.`;

      const lecturePrice = document.createElement("div");
      lecturePrice.classList.add("lecture_price");
      lecturePrice.textContent =
        lecture.price === 0 ? "무료" : `단백질바 ${lecture.price}개`;

      videoDiv.appendChild(video);
      lectureTeacherProfile.appendChild(img);
      div2.appendChild(lectureTitle);
      div2.appendChild(lectureTeacherName);
      div2.appendChild(lectureUpdateTime);
      lectureFlex.appendChild(lectureTeacherProfile);
      lectureFlex.appendChild(div2);
      div.appendChild(lectureFlex);
      div.appendChild(lecturePrice);
      box.appendChild(videoDiv);
      box.appendChild(div);

      box.addEventListener("click", () => {
        window.location.href = "lectureView.html?id=" + lecture.id;
      });

      section.appendChild(box);
    });
  }

  searchButton.addEventListener("click", function () {
    const query = searchInput.value;
    const searchTypeSelect = document.querySelector(".searchTypeSelect");
    const searchType = searchTypeSelect.value;

    if (query.trim() === "") {
      alert("검색어를 입력해 주세요.");
      return;
    }

    let searchParams = {};
    if (searchType === "강의명") {
      searchParams = { query: query };
      axios
        .get("http://localhost:8080/searchLecture", { params: searchParams })
        .then((response) => {
          console.log("검색 결과: ", response.data);
          if (response.data.length > 0) {
            interestLectureTitle.textContent = "검색 결과";
            displayLectures(response.data, interestLectureSection);
          } else {
            alert("검색 결과가 없습니다.");
            interestLectureTitle.textContent = "맞춤 교육 영상";
            loadInterestLectures();
          }
        })
        .catch((error) => {
          console.error("검색 중 오류 발생: ", error);
          alert("검색 중 오류가 발생했습니다.");
          interestLectureTitle.textContent = "맞춤 교육 영상";
          loadInterestLectures();
        });
    } else if (searchType === "강사명") {
      searchParams = { teacherName: query };
      axios
        .get("http://localhost:8080/searchTeacher", { params: searchParams })
        .then((response) => {
          console.log("검색 결과: ", response.data);
          if (response.data.length > 0) {
            interestLectureTitle.textContent = "검색 결과";
            displayLectures(response.data, interestLectureSection);
          } else {
            alert("검색 결과가 없습니다.");
            interestLectureTitle.textContent = "맞춤 교육 영상";
            loadInterestLectures();
          }
        })
        .catch((error) => {
          console.error("검색 중 오류 발생: ", error);
          alert("검색 중 오류가 발생했습니다. ");
          interestLectureTitle.textContent = "맞춤 교육 영상";
          loadInterestLectures();
        });
    }
  });

  // 페이지 로드 시 기본 맞춤 교육 영상 로드
  loadInterestLectures();
});

// document.addEventListener("DOMContentLoaded", function () {
//   const notifyButtons = document.querySelectorAll(".notify_button");
//   const searchButton = document.getElementById("searchButton");
//   const searchInput = document.getElementById("searchInput");
//   const filterButton = document.querySelector(".search_filter");
//   const filterCloseButton = document.querySelector(".search_filter_close");
//   const searchBox = document.querySelector(".search_box");
//   );

//   notifyButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       if (this.style.backgroundColor === "rgb(254, 192, 9)") {
//         this.style.backgroundColor = "#eee";
//         alert("알림이 해제되었습니다!");
//       } else {
//         this.style.backgroundColor = "#FEC009";
//         alert("알림이 설정되었습니다!");
//       }
//     });
//   });
// });

// function allLecture(data) {
//   const body = document.querySelector(".content_body_interestLecture");

//   data.forEach((data, index) => {
//     const box = document.createElement("div");
//     box.classList.add("content_body_interestLecture_box");
//     box.classList.add("box");

//     const videoDiv = document.createElement("div");
//     const video = document.createElement("video");
//     videoDiv.classList.add("content_body_interestLecture_box_img");
//     video.src = data.url;

//     const div = document.createElement("div");
//     const lecture_flex = document.createElement("div");
//     lecture_flex.classList.add("lecture_flex");

//     const lecture_teacher_profile = document.createElement("div");
//     lecture_teacher_profile.classList.add("lecture_teacher_profile");
//     const img = document.createElement("img");
//     img.src = data.teacher.user.profileImg;

//     lecture_teacher_profile.addEventListener("click", (event) => {
//       event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
//       window.location.href = "teacherView.html?id=" + data.teacher.id;
//     });

//     img.addEventListener("click", (event) => {
//       event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
//       window.location.href = "teacherView.html?id=" + data.teacher.id;
//     });

//     const div2 = document.createElement("div");

//     const lecture_title = document.createElement("div");
//     lecture_title.classList.add("lecture_title");
//     lecture_title.textContent = data.lectureName;

//     const lecture_teacher_name = document.createElement("div");
//     lecture_teacher_name.classList.add("lecture_teacher_name");
//     lecture_teacher_name.textContent = data.teacher.user.userName;

//     const lecture_updateTime = document.createElement("div");
//     lecture_updateTime.classList.add("lecture_updateTime");
//     const createdAt = new Date(data.createdAt);
//     lecture_updateTime.textContent = `${createdAt.getFullYear()}. ${
//       createdAt.getMonth() + 1
//     }. ${createdAt.getDate()}.`;

//     const lecture_price = document.createElement("div");
//     lecture_price.classList.add("lecture_price");
//     if (data.price == 0) {
//       lecture_price.textContent = "무료";
//     } else {
//       lecture_price.textContent = "단백질바 " + data.price + "개";
//     }

//     videoDiv.appendChild(video);
//     lecture_teacher_profile.appendChild(img);

//     div2.appendChild(lecture_title);
//     div2.appendChild(lecture_teacher_name);
//     div2.appendChild(lecture_updateTime);

//     lecture_flex.appendChild(lecture_teacher_profile);
//     lecture_flex.appendChild(div2);

//     div.appendChild(lecture_flex);
//     div.appendChild(lecture_price);

//     box.appendChild(videoDiv);
//     box.appendChild(div);

//     body.appendChild(box);

//     box.addEventListener("click", () => {
//       window.location.href = "lectureView.html?id=" + data.id;
//     });
//   });

//   searchButton.addEventListener("click", function () {
//     const query = searchInput.value;
//     searchTypeSelect = document.querySelector(".searchTypeSelect");
//     const searchType = searchTypeSelect.value;

//     let searchParams = "";
//     if (searchType === "강의명") {
//       searchParams = { query: query };
//       axios
//         .get("http://localhost:8080/searchLecture", {
//           params: searchParams,
//         })
//         .then((response) => {
//           console.log("검색 결과: ", response.data);
//           displaySearchResults(response.data);
//         })
//         .catch((error) => {
//           console.error("검색 중 오류 발생: ", error);
//         });
//     } else if (searchType === "강사명") {
//       searchParams = { teacherName: query };
//       axios
//         .get("http://localhost:8080/searchTeacher", {
//           params: searchParams,
//         })
//         .then((response) => {
//           console.log("검색 결과: ", response.data);
//           displaySearchResults(response.data);
//         })
//         .catch((error) => {
//           console.error("검색 중 오류 발생: ", error);
//         });
//     }

//     console.log("a", searchParams);

//     // 검색 시 맞춤 교육 영상을 숨기고 검색 결과만 표시
//     interestLectureSection.classList.add("hidden");
//     relatedVideosSection.classList.remove("hidden");
//   });

//   // function getFilters() {
//   //   const filters = {};
//   //   const interests = Array.from(
//   //     document.querySelectorAll('input[name="interest"]:checked')
//   //   ).map((el) => el.value);
//   //   const uploadDate = document.querySelector(
//   //     'input[name="upload_date"]:checked'
//   //   )?.value;
//   //   const startDate = document.getElementById("start-date").value;
//   //   const endDate = document.getElementById("end-date").value;
//   //   const buy = document.querySelector('input[name="buy"]:checked')?.value;
//   //   const price = document.querySelector('input[name="price"]:checked')?.value;
//   //   const order = document.querySelector('select[name="order"]').value;

//   //   if (interests.length > 0) filters.interests = interests;
//   //   if (uploadDate) filters.uploadDate = uploadDate;
//   //   if (startDate) filters.startDate = startDate;
//   //   if (endDate) filters.endDate = endDate;
//   //   if (buy) filters.buy = buy;
//   //   if (price) filters.price = price;
//   //   if (order) filters.order = order;

//   //   return filters;
//   // }

//   function displaySearchResults(data) {
//     const relatedVideos = document.querySelector(".related_videos");
//     relatedVideos.innerHTML = ""; // 기존 관련 추천 영상 초기화

//     data.forEach((lecture) => {
//       const box = document.createElement("div");
//       box.classList.add("content_body_relatedVideo_box");
//       box.classList.add("box");

//       const videoDiv = document.createElement("div");
//       const video = document.createElement("video");
//       videoDiv.classList.add("content_body_relatedVideo_box_img");
//       video.src = lecture.url;

//       const div = document.createElement("div");
//       const lectureFlex = document.createElement("div");
//       lectureFlex.classList.add("lecture_flex");

//       const lectureTeacherProfile = document.createElement("div");
//       lectureTeacherProfile.classList.add("lecture_teacher_profile");
//       const img = document.createElement("img");
//       img.src = lecture.teacher.user.profileImg;

//       lectureTeacherProfile.addEventListener("click", (event) => {
//         event.stopPropagation();
//         window.location.href = "teacherView.html?id=" + lecture.teacher.id;
//       });

//       img.addEventListener("click", (event) => {
//         event.stopPropagation();
//         window.location.href = "teacherView.html?id=" + lecture.teacher.id;
//       });

//       const div2 = document.createElement("div");
//       const lectureTitle = document.createElement("div");
//       lectureTitle.classList.add("lecture_title");
//       lectureTitle.textContent = lecture.lectureName;

//       const lectureTeacherName = document.createElement("div");
//       lectureTeacherName.classList.add("lecture_teacher_name");
//       lectureTeacherName.textContent = lecture.teacher.user.userName;

//       const lectureUpdateTime = document.createElement("div");
//       lectureUpdateTime.classList.add("lecture_updateTime");
//       const createdAt = new Date(lecture.createdAt);
//       lectureUpdateTime.textContent = `${createdAt.getFullYear()}. ${
//         createdAt.getMonth() + 1
//       }. ${createdAt.getDate()}.`;

//       const lecturePrice = document.createElement("div");
//       lecturePrice.classList.add("lecture_price");
//       lecturePrice.textContent =
//         lecture.price === 0 ? "무료" : `단백질바 ${lecture.price}개`;

//       videoDiv.appendChild(video);
//       lectureTeacherProfile.appendChild(img);

//       div2.appendChild(lectureTitle);
//       div2.appendChild(lectureTeacherName);
//       div2.appendChild(lectureUpdateTime);

//       lectureFlex.appendChild(lectureTeacherProfile);
//       lectureFlex.appendChild(div2);

//       div.appendChild(lectureFlex);
//       div.appendChild(lecturePrice);

//       box.appendChild(videoDiv);
//       box.appendChild(div);

//       relatedVideos.appendChild(box);

//       box.addEventListener("click", () => {
//         window.location.href = "lectureView.html?id=" + lecture.id;
//       });
//     });
//   }

//   // 맞춤 교육 영상 서비스
//   // let userCategoryList = []

//   // axios
//   // .post("http://localhost:8080/findUserCategory", user)
//   // .then((response)=>{
//   //   console.log("데이터: ", response.data)
//   //   findUserCategory(response.data)
//   // })
//   // .catch((error)=>{
//   //   console.log("에러: ", error)
//   // })

//   // function findUserCategory(data){
//   //   data.forEach((data, index)=>{
//   //     const category = {
//   //       categoryName: data.category
//   //     }
//   //     userCategoryList.add(category)
//   //   })
//   // }

//   // axios
//   // .post("http://localhost:8080/findLectureAllByCategoryIn", user)
//   // .then((response)=>{
//   //     console.log("데이터: ", response.data)
//   //     createMyLecturescrap(response.data)
//   // })
//   // .catch((error)=>{
//   //     console.log("에러: ", error)
//   // })

//   // function createMyLecturescrap(data){
//   //     const lectureBody = document.querySelector(".content_body_scrapLecture");

//   //     data.forEach((data, index)=>{
//   //         const box = document.createElement("div");
//   //         box.classList.add("content_body_scrapLecture_box");
//   //         box.classList.add("box");

//   //         const image = document.createElement("div");
//   //         const img = document.createElement("video");
//   //         image.classList.add("content_body_scrapLecture_box_img");
//   //         img.src = data.lecture.url;

//   //         const name = document.createElement("div");
//   //         name.classList.add("content_body_scrapLecture_box_title");
//   //         name.textContent = data.lecture.lectureName;

//   //         image.appendChild(img);
//   //         box.appendChild(image);
//   //         box.appendChild(name);
//   //         lectureBody.appendChild(box);
//   //     })
//   // }

//   document.querySelector(".search_filter").addEventListener("click", () => {
//     document.querySelector(".search_filter").classList.add("hiden");
//     document.querySelector(".search_filter_close").classList.remove("hiden");
//     document.querySelector(".search_box").classList.remove("hiden");
//   });

//   document
//     .querySelector(".search_filter_close")
//     .addEventListener("click", () => {
//       document.querySelector(".search_filter").classList.remove("hiden");
//       document.querySelector(".search_filter_close").classList.add("hiden");
//       document.querySelector(".search_box").classList.add("hiden");
//     });
// }
