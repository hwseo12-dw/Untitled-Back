function sessionCreateAll(user){
    sessionSubscription(user)
    // sessionTraning(user)
    sessionMyid(user)
    sessionCoin(user)
}

// 구독 및 영상
function sessionSubscription(user){
    axios
    .post("http://localhost:8080/mySubscription", user)
    .then((response)=>{
        console.log("데이터: ", response.data)
        createMySubscription(response.data)   
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })

    axios
    .post("http://localhost:8080/myBuyLecture", user)
    .then((response)=>{
        console.log("데이터: ", response.data)
        createMyLecture(response.data) 
        createMyLectureReview(response.data)
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })

    axios
    .post("http://localhost:8080/myScrapLecture", user)
    .then((response)=>{
        console.log("데이터: ", response.data)
        createMyLecturescrap(response.data) 
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })
}

function createMySubscription(data){
    const subscriptionBody = document.querySelector(".content_body_subscriptionlist")
    
    data.forEach((data, index)=>{
        const box = document.createElement("div");
        box.classList.add("content_body_subscriptionlist_box");
        box.classList.add("box");

        const image = document.createElement("div");
        const img = document.createElement("img");
        image.classList.add("content_body_subscriptionlist_box_img");
        img.src = data.teacher.user.profileImg;
        
        const name = document.createElement("div");
        name.classList.add("content_body_subscriptionlist_box_name");
        name.textContent = data.teacher.user.userName;

        const butten = document.createElement("div");
        butten.classList.add("content_body_subscriptionlist_box_butten");
        butten.textContent = "자세히보기"

        butten.addEventListener("click",()=>{
            window.location.href = "teacherView.html?id=" + data.teacher.id
        })

        image.appendChild(img);
        box.appendChild(image);
        box.appendChild(name);
        box.appendChild(butten);
        subscriptionBody.appendChild(box);
    })
}

function createMyLecture(data){
    const body = document.querySelector(".content_body_favoriteLecture");

    data.forEach((data, index)=>{
        const box = document.createElement("div");
        box.classList.add("content_body_interestLecture_box");
        box.classList.add("box");
    
        const videoDiv = document.createElement("div");
        const video = document.createElement("video");
        videoDiv.classList.add("content_body_interestLecture_box_img");
        video.src = data.lecture.url;
    
        const div = document.createElement("div");
    
        const lecture_flex = document.createElement("div");
        lecture_flex.classList.add("lecture_flex");
    
        const lecture_teacher_profile = document.createElement("div");
        lecture_teacher_profile.classList.add("lecture_teacher_profile");
        const img = document.createElement("img");
        img.src = data.lecture.teacher.user.profileImg;
    
        lecture_teacher_profile.addEventListener("click", (event) => {
          event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
          window.location.href = "teacherView.html?id=" + data.lecture.teacher.id;
        });
    
        img.addEventListener("click", (event) => {
          event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
          window.location.href = "teacherView.html?id=" + data.lecture.teacher.id;
        });
    
        const div2 = document.createElement("div");
    
        const lecture_title = document.createElement("div");
        lecture_title.classList.add("lecture_title");
        lecture_title.textContent = data.lecture.lectureName;
    
        const lecture_teacher_name = document.createElement("div");
        lecture_teacher_name.classList.add("lecture_teacher_name");
        lecture_teacher_name.textContent = data.lecture.teacher.user.userName;
    
        const lecture_updateTime = document.createElement("div");
        lecture_updateTime.classList.add("lecture_updateTime");
        const createdAt = new Date(data.lecture.createdAt);
        lecture_updateTime.textContent = `${createdAt.getFullYear()}. ${createdAt.getMonth() + 1}. ${createdAt.getDate()}.`;

        videoDiv.appendChild(video);
        lecture_teacher_profile.appendChild(img);
    
        div2.appendChild(lecture_title)
        div2.appendChild(lecture_teacher_name)
        div2.appendChild(lecture_updateTime)
    
        lecture_flex.appendChild(lecture_teacher_profile)
        lecture_flex.appendChild(div2)
    
        div.appendChild(lecture_flex)
    
        box.appendChild(videoDiv)
        box.appendChild(div)
    
        body.appendChild(box)
    
        box.addEventListener("click",()=>{
          window.location.href = "lectureView.html?id=" + data.lecture.id
        })
    })
}

function createMyLecturescrap(data){
    const body = document.querySelector(".content_body_scrapLecture");

    data.forEach((data, index)=>{
        const box = document.createElement("div");
        box.classList.add("content_body_interestLecture_box");
        box.classList.add("box");
    
        const videoDiv = document.createElement("div");
        const video = document.createElement("video");
        videoDiv.classList.add("content_body_interestLecture_box_img");
        video.src = data.lecture.url;
    
        const div = document.createElement("div");
    
        const lecture_flex = document.createElement("div");
        lecture_flex.classList.add("lecture_flex");
    
        const lecture_teacher_profile = document.createElement("div");
        lecture_teacher_profile.classList.add("lecture_teacher_profile");
        const img = document.createElement("img");
        img.src = data.lecture.teacher.user.profileImg;
    
        lecture_teacher_profile.addEventListener("click", (event) => {
          event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
          window.location.href = "teacherView.html?id=" + data.lecture.teacher.id;
        });
    
        img.addEventListener("click", (event) => {
          event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
          window.location.href = "teacherView.html?id=" + data.lecture.teacher.id;
        });
    
        const div2 = document.createElement("div");
    
        const lecture_title = document.createElement("div");
        lecture_title.classList.add("lecture_title");
        lecture_title.textContent = data.lecture.lectureName;
    
        const lecture_teacher_name = document.createElement("div");
        lecture_teacher_name.classList.add("lecture_teacher_name");
        lecture_teacher_name.textContent = data.lecture.teacher.user.userName;
    
        const lecture_updateTime = document.createElement("div");
        lecture_updateTime.classList.add("lecture_updateTime");
        const createdAt = new Date(data.lecture.createdAt);
        lecture_updateTime.textContent = `${createdAt.getFullYear()}. ${createdAt.getMonth() + 1}. ${createdAt.getDate()}.`;

        const lecture_price = document.createElement("div");
        lecture_price.classList.add("lecture_price");
        if(data.lecture.price==0){
          lecture_price.textContent = "무료";
        } else{
          lecture_price.textContent = "단백질바 " + data.lecture.price + "개";
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
          window.location.href = "lectureView.html?id=" + data.lecture.id
        })
    })
}

function createMyLectureReview(data){
    const body = document.querySelector(".content_body_review_box");

    data.forEach((data, index)=>{
        const box = document.createElement("div");
        box.classList.add("content_body_review");

        const image = document.createElement("div");
        const img = document.createElement("video");
        image.classList.add("review_img");
        img.src = data.lecture.url;

        image.addEventListener("click",()=>{
            window.location.href = "lectureView.html?id=" + data.lecture.id
        })
        
        const review_box = document.createElement("div");
        review_box.classList.add("review_box");

        const flex1 = document.createElement("div");
        flex1.classList.add("review_box_flex");
        
        const title1 = document.createElement("div");
        title1.classList.add("review_box_flex_title");
        title1.textContent = "제목: ";

        const value1 = document.createElement("div");
        value1.classList.add("review_box_flex_value");
        value1.textContent = data.lecture.lectureName;


        const flex2 = document.createElement("div");
        flex2.classList.add("review_box_flex");
        
        const title2 = document.createElement("div");
        title2.classList.add("review_box_flex_title");
        title2.textContent = "별점: ";

        const value2 = document.createElement("div");
        if(data.teacherRating===-1){
            value2.classList.add("review_box_flex_value_none");
            value2.textContent = "아직 별점을 작성하지 않았습니다."
        } else{
            value2.classList.add("review_box_flex_value");
            value2.textContent = data.teacherRating;
        }

        const flex3 = document.createElement("div");
        flex3.classList.add("review_box_flex");
        
        const title3 = document.createElement("div");
        title3.classList.add("review_box_flex_title");
        title3.textContent = "리뷰 내용: ";

        const value3 = document.createElement("div");
        if(data.teacherReview==""||data.teacherReview==null||data.teacherReview==" "){
            value3.classList.add("review_box_flex_value_none");
            value3.textContent = "아직 리뷰를 작성하지 않았습니다."
        } else{
            value3.classList.add("review_box_flex_value");
            value3.textContent = data.teacherReview;
        }

        const flex4 = document.createElement("div");
        flex4.classList.add("review_box_flex");
        
        const title4 = document.createElement("div");
        title4.classList.add("review_box_flex_title");
        title4.textContent = "구매일: ";

        const value4 = document.createElement("div");
        value4.classList.add("review_box_flex_value");
        const createdAt = new Date(data.createdAt);
        value4.textContent =  `${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 ${createdAt.getDate()}일`;

        const review_btn_flex = document.createElement("div");
        review_btn_flex.classList.add("review_btn_flex");

        const btn1 = document.createElement("div");
        btn1.classList.add("review_btn");
        btn1.textContent = "수정";

        const btn2 = document.createElement("div");
        btn2.classList.add("review_btn");
        btn2.textContent = "삭제";

        const btn11 = document.createElement("div");
        btn11.classList.add("review_btn");
        btn11.classList.add("hiden")
        btn11.textContent = "완료";
        
        const btn21 = document.createElement("div");
        btn21.classList.add("review_btn");
        btn21.classList.add("hiden")
        btn21.textContent = "취소";

        const inputValue2 = document.createElement("input");
        inputValue2.classList.add("rating_input")
        inputValue2.classList.add("hiden")
        inputValue2.type = "number"
        inputValue2.min = 0
        inputValue2.max = 10
        
        const inputValue3 = document.createElement("textarea");
        inputValue3.classList.add("review_input")
        inputValue3.classList.add("hiden")
        inputValue3.rows = 2
        inputValue3.min = 0
        inputValue3.max = 10
        
        
        image.appendChild(img);
        review_btn_flex.appendChild(btn1); // 수정
        review_btn_flex.appendChild(btn2); // 삭제
        review_btn_flex.appendChild(btn11); // 완료
        review_btn_flex.appendChild(btn21); // 취소

        flex1.appendChild(title1)
        flex1.appendChild(value1)
        flex2.appendChild(title2)
        flex2.appendChild(value2)
        flex3.appendChild(title3)
        flex3.appendChild(value3)
        flex4.appendChild(title4)
        flex4.appendChild(value4)

        flex2.appendChild(inputValue2)
        flex3.appendChild(inputValue3)

        review_box.appendChild(flex1);
        review_box.appendChild(flex4);
        review_box.appendChild(flex2);
        review_box.appendChild(flex3);
        review_box.appendChild(review_btn_flex)

        box.appendChild(image);
        box.appendChild(review_box)

        body.appendChild(box);
        
        title4.classList.add("review_box_flex_title");
        title4.textContent = "구매일: ";


        btn1.addEventListener("click", ()=>{
            value2.classList.add("hiden")
            value3.classList.add("hiden")
            inputValue2.classList.remove("hiden")
            inputValue3.classList.remove("hiden")

            btn1.classList.add("hiden")
            btn2.classList.add("hiden")
            btn11.classList.remove("hiden")
            btn21.classList.remove("hiden")
        })

        btn2.addEventListener("click",()=>{
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

        let changeRating = -1
        let changeReview = ""

        inputValue2.addEventListener("change",(e)=>{
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

        inputValue3.addEventListener("change",(e)=>{
            changeReview = e.target.value;
            console.log(changeReview)
        })

        btn11.addEventListener("click", ()=>{
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

        btn21.addEventListener("click", ()=>{
            value2.classList.remove("hiden")
            value3.classList.remove("hiden")
            btn1.classList.remove("hiden")
            btn2.classList.remove("hiden")

            inputValue2.classList.add("hiden")
            inputValue3.classList.add("hiden")
            btn11.classList.add("hiden")
            btn21.classList.add("hiden")
        })
    })
}

// 1:1 트레이닝
// function sessionTraning(user){
//     axios
//     .post("http://localhost:8080/myCallTraining", user)
//     .then((response)=>{
//         console.log("데이터: ", response.data)
//         createmyCallTraining(response.data)
//     })
//     .catch((error)=>{
//         console.log("에러: ", error)
//     })

//     axios
//     .post("http://localhost:8080/findCalendarDay5", user)
//     .then((response)=>{
//         console.log("ㅎㅎ: ", response.data[0])
//         findCalendarDay5(response.data)
//         if(response.data[0]!=null){
//             const calendar = {
//                 id: response.data[0].id
//             }
//             calendarChartTData(calendar)
//         }
//     })
//     .catch((error)=>{
//         console.log("에러: ", error)
//     })
// }

// function createmyCallTraining(data){
//     const body = document.querySelector(".content_body_traning");
//     if (data.length === 0) {
//         const noDataMessage = document.createElement("div");
//         noDataMessage.textContent = "트레이닝을 신청한 기록이 없습니다.";
//         body.appendChild(noDataMessage);
//         return;
//     }
//     data.forEach((data, index)=>{
//         const content_body_traning_status_grid = document.createElement("div");
//         content_body_traning_status_grid.classList.add("content_body_traning_status_grid");
        
//         const status1 = document.createElement("div");
//         status1.classList.add("content_body_traning_status");
//         status1.textContent = "신청";

//         const status2 = document.createElement("div");
//         status2.classList.add("content_body_traning_status");
//         status2.textContent = "검토";

//         const status3 = document.createElement("div");
//         status3.classList.add("content_body_traning_status");
//         status3.textContent = "승인";

//         const status4 = document.createElement("div");
//         status4.classList.add("content_body_traning_status");
//         status4.textContent = "결제";

//         const status5 = document.createElement("div");
//         status5.classList.add("content_body_traning_status");
//         status5.textContent = "훈련중";

//         const status6 = document.createElement("div");
//         status6.classList.add("content_body_traning_status");
//         status6.textContent = "종료";

//         const content_body_traning_Btn_box = document.createElement("div");
//         content_body_traning_Btn_box.classList.add("content_body_traning_Btn_box");
//         const content_body_traning_cansleBtn1 = document.createElement("div");
//         content_body_traning_cansleBtn1.classList.add("content_body_traning_cansleBtn1");
//         const content_body_traning_Btn2 = document.createElement("div");
//         content_body_traning_Btn2.classList.add("content_body_traning_Btn2");
//         // 미확인
//         if(data.status == "UNCONFIRMED"){
//             status1.classList.add("statuscheck");
//             content_body_traning_status_grid.appendChild(status1);
//             content_body_traning_status_grid.appendChild(status2);
//             content_body_traning_status_grid.appendChild(status3);
//             content_body_traning_status_grid.appendChild(status4);
//             content_body_traning_status_grid.appendChild(status5);
//             content_body_traning_status_grid.appendChild(status6);
//             content_body_traning_cansleBtn1.textContent = "신청취소"
//             content_body_traning_Btn_box.appendChild(content_body_traning_cansleBtn1);
//         }

//         // 확인
//         if(data.status == "CONFIRM"){
//             status1.classList.add("statuscheck");
//             status2.classList.add("statuscheck");
//             content_body_traning_status_grid.appendChild(status1);
//             content_body_traning_status_grid.appendChild(status2);
//             content_body_traning_status_grid.appendChild(status3);
//             content_body_traning_status_grid.appendChild(status4);
//             content_body_traning_status_grid.appendChild(status5);
//             content_body_traning_status_grid.appendChild(status6);
//             content_body_traning_cansleBtn1.textContent = "신청취소"
//             content_body_traning_Btn_box.appendChild(content_body_traning_cansleBtn1);
//         }

//         // 수락
//         if(data.status == "ACCEPT"){
//             status1.classList.add("statuscheck");
//             status2.classList.add("statuscheck");
//             status3.classList.add("statuscheck");
//             status4.classList.add("statuscheck");
//             content_body_traning_status_grid.appendChild(status1);
//             content_body_traning_status_grid.appendChild(status2);
//             content_body_traning_status_grid.appendChild(status3);
//             content_body_traning_status_grid.appendChild(status4);
//             content_body_traning_status_grid.appendChild(status5);
//             content_body_traning_status_grid.appendChild(status6);
//             content_body_traning_cansleBtn1.textContent = "신청취소"
//             content_body_traning_Btn2.textContent = "결제하기"
//             content_body_traning_Btn_box.appendChild(content_body_traning_cansleBtn1);
//             content_body_traning_Btn_box.appendChild(content_body_traning_Btn2);
//         }

//         // 거절
//         if(data.status == "REJECT"){
//             status1.classList.add("statuscheck");
//             status2.classList.add("statuscheck");
//             status3.classList.add("statuscheck");
//             status3.textContent = "반려";
//             content_body_traning_status_grid.appendChild(status1);
//             content_body_traning_status_grid.appendChild(status2);
//             content_body_traning_status_grid.appendChild(status3);
//             content_body_traning_cansleBtn1.textContent = "삭제하기"
//             content_body_traning_Btn2.textContent = "재신청"
//             content_body_traning_Btn_box.appendChild(content_body_traning_cansleBtn1);
//             content_body_traning_Btn_box.appendChild(content_body_traning_Btn2);
//         }
        

//         const content_body_traning_box = document.createElement("div");
//         content_body_traning_box.classList.add("content_body_traning_box");

//         const content_body_traning_box_flex = document.createElement("div");
//         content_body_traning_box_flex.classList.add("content_body_traning_box_flex");

//         const content_body_traning_img = document.createElement("div");
//         content_body_traning_img.classList.add("content_body_traning_img");
//         const img = document.createElement("img");
//         img.src = data.teacher.user.profileImg;

//         const content_body_traning_box_flex_box = document.createElement("div");
//         content_body_traning_box_flex_box.classList.add("content_body_traning_box_flex_box");

//         const content_body_traning_name = document.createElement("div");
//         content_body_traning_name.classList.add("content_body_traning_name");
//         content_body_traning_name.textContent = data.teacher.user.userName;

//         const content_body_traning_profileText = document.createElement("div");
//         content_body_traning_profileText.classList.add("content_body_traning_profileText");
//         content_body_traning_profileText.textContent = data.teacher.user.profileText;

//         const content_body_traning_price = document.createElement("div");
//         content_body_traning_price.classList.add("content_body_traning_price");
//         content_body_traning_price.textContent = data.teacher.price;

//         const deleteData = {
//             id: data.id
//         }
//         content_body_traning_cansleBtn1.addEventListener("click", ()=>{
//             axios
//             .post("http://localhost:8080/deleteCallTraining", deleteData)
//             .then((response)=>{
//                 console.log("데이터: ", response.data)
//                 location.reload()
//             })
//             .catch((error)=>{
//                 console.log("에러: ", error)
//             })
//         })
        

//         content_body_traning_box_flex_box.appendChild(content_body_traning_name);
//         content_body_traning_box_flex_box.appendChild(content_body_traning_profileText);
//         content_body_traning_box_flex_box.appendChild(content_body_traning_price);

//         content_body_traning_img.appendChild(img);
//         content_body_traning_box_flex.appendChild(content_body_traning_img);
//         content_body_traning_box_flex.appendChild(content_body_traning_box_flex_box);
        
//         content_body_traning_box.appendChild(content_body_traning_box_flex);
//         content_body_traning_box.appendChild(content_body_traning_Btn_box);

//         body.appendChild(content_body_traning_status_grid);
//         body.appendChild(content_body_traning_box);
//     })
// }

// function findCalendarDay5(data){
//     const today = new Date();
//     const today0month = today.getMonth() + 1;
//     const today0day = today.getDate();
//     const today0 = `${today0month}월 ${today0day}일`

//     const set1 = new Date(today);
//     set1.setDate(today.getDate() - 1);
//     const today1month = set1.getMonth() + 1;
//     const today1day = set1.getDate();
//     const today1 = `${today1month}월 ${today1day}일`

//     const set2 = new Date(today);
//     set2.setDate(today.getDate() - 2);
//     const today2month = set2.getMonth() + 1;
//     const today2day = set2.getDate();
//     const today2 = `${today2month}월 ${today2day}일`

//     const set3 = new Date(today);
//     set3.setDate(today.getDate() - 3);
//     const today3month = set3.getMonth() + 1;
//     const today3day = set3.getDate();
//     const today3 = `${today3month}월 ${today3day}일`

//     const set4 = new Date(today);
//     set4.setDate(today.getDate() - 4);
//     const today4month = set4.getMonth() + 1;
//     const today4day = set4.getDate();
//     const today4 = `${today4month}월 ${today4day}일`



//     let goal0 = null
//     let goal1 = null
//     let goal2 = null
//     let goal3 = null
//     let goal4 = null
//     let record0 = null
//     let record1 = null
//     let record2 = null
//     let record3 = null
//     let record4 = null

//     let minY = 1000;
//     let maxY = 0;
    
//     if(data[0]!=null){
//         if(data[0].weightGoal!==-1){
//             goal0 = data[0].weightGoal;
//             if(minY>goal0){
//                 minY = goal0
//             }
//             if(maxY<goal0){
//                 maxY = goal0
//             }
//         }
//         if(data[0].weightRecord!==-1){
//             record0 = data[0].weightRecord;
//             if(minY>record0){
//                 minY = record0
//             }
//             if(maxY<record0){
//                 maxY = record0
//             }
//         }
//     }
//     if(data[1]!=null){
//         if(data[1].weightGoal!==-1){
//             goal1 = data[1].weightGoal;
//             if(minY>goal1){
//                 minY = goal1
//             }
//             if(maxY<goal1){
//                 maxY = goal1
//             }
//         }
//         if(data[1].weightRecord!==-1){
//             record1 = data[1].weightRecord;
//             if(minY>record1){
//                 minY = record1
//             }
//             if(maxY<record1){
//                 maxY = record1
//             }
//         }
//     }
//     if(data[2]!=null){
//         if(data[2].weightGoal!==-1){
//             goal2 = data[2].weightGoal;
//             if(minY>goal2){
//                 minY = goal2
//             }
//             if(maxY<goal2){
//                 maxY = goal2
//             }
//         }
//         if(data[2].weightRecord!==-1){
//             record2 = data[2].weightRecord;
//             if(minY>record2){
//                 minY = record2
//             }
//             if(maxY<record2){
//                 maxY = record2
//             }
//         }
//     }
//     if(data[3]!=null){
//         if(data[3].weightGoal!==-1){
//             goal3 = data[3].weightGoal;
//             if(minY>goal3){
//                 minY = goal3
//             }
//             if(maxY<goal3){
//                 maxY = goal3
//             }
//         }
//         if(data[3].weightRecord!==-1){
//             record3 = data[3].weightRecord;
//             if(minY>record3){
//                 minY = record3
//             }
//             if(maxY<record3){
//                 maxY = record3
//             }
//         }
//     }
//     if(data[4]!=null){
//         if(data[4].weightGoal!==-1){
//             goal4 = data[4].weightGoal;
//             if(minY>goal4){
//                 minY = goal4
//             }
//             if(maxY<goal4){
//                 maxY = goal4
//             }
//         }
//         if(data[4].weightRecord!==-1){
//             record4 = data[4].weightRecord;
//             if(minY>record4){
//                 minY = record4
//             }
//             if(maxY<record4){
//                 maxY = record4
//             }
//         }
//     }

//     minY = Math.floor(minY) -1;
//     maxY = Math.floor(maxY) +1;

//     const weightData = {
//         labels: [today4, today3, today2, today1, today0],
//         datasets: [
//           {
//             label: '목표 몸무게(kg)',
//             data: [goal4, goal3, goal2, goal1, goal0], // 예시 데이터, 실제 데이터에 맞게 수정 필요
//             fill: false,
//             borderColor: 'rgb(254, 192, 9)',
//             tension: 0
//           },
//           {
//             label: '달성 몸무게(kg)',
//             data: [record4, record3, record2, record1, record0], // 예시 데이터, 실제 데이터에 맞게 수정 필요
//             fill: false,
//             borderColor: 'rgb(44, 57, 74)',
//             tension: 0
//           }
//         ]
//     };

//     // 그래프 생성
//     const ctx = document.getElementById('weight_chart').getContext('2d');
//     const myChart = new Chart(ctx, {
//       type: 'line',
//       data: weightData,
//       options: {
//         scales: {
//           y: {
//             beginAtZero: false, // Y축이 0부터 시작하지 않도록 설정
//             min: minY,
//             max: maxY,
//             ticks: {
//                 stepSize: 0.5 // Y축 눈금 간격을 10으로 설정
//             }  
//           }
//         }
//       }
//     });    
// }


// function calendarChartTData(data) {
//     let carbohydrateGoal = ""
//     let proteinGoal = ""
//     let fatGoal = ""

//     let carbohydrateRecord = ""
//     let proteinRecord = ""
//     let fatRecord = ""
    
//     let aerobicGoal = ""
//     let muscleGoal = ""
//     let stretchGoal = ""
//     let yogaGoal = ""

//     let aerobicRecord = ""
//     let muscleRecord = ""
//     let stretchRecord = ""
//     let yogaRecord = ""

//     axios.post("http://localhost:8080/findCalendarDietPlanByCalendar", data)
//         .then((response) => {
//             carbohydrateGoal = response.data.carbohydrate;
//             proteinGoal = response.data.protein;
//             fatGoal = response.data.fat;

//             return axios.post("http://localhost:8080/findCalendarDietRecordByCalendar", data);
//         })
//         .then((response) => {
//             carbohydrateRecord = response.data.carbohydrate;
//             proteinRecord = response.data.protein;
//             fatRecord = response.data.fat;

//             return axios.post("http://localhost:8080/findCalendarExercisePlanByCalendar", data);
//         })
//         .then((response) => {
//             aerobicGoal = response.data.aerobic;
//             muscleGoal = response.data.muscle;
//             stretchGoal = response.data.stretch;
//             yogaGoal = response.data.yoga;

//             return axios.post("http://localhost:8080/findCalendarExerciseRecordByCalendar", data);
//         })
//         .then((response) => {
//             aerobicRecord = response.data.aerobic;
//             muscleRecord = response.data.muscle;
//             stretchRecord = response.data.stretch;
//             yogaRecord = response.data.yoga;

//             diet_chart(carbohydrateGoal, proteinGoal, fatGoal, carbohydrateRecord, proteinRecord, fatRecord);
//             exercise_chart(aerobicGoal, muscleGoal, stretchGoal, yogaGoal, aerobicRecord, muscleRecord, stretchRecord, yogaRecord);
//         })
//         .catch((error) => {
//             console.log("에러: ", error);
//         });
// }

// function diet_chart(carbohydrateGoal, proteinGoal, fatGoal, carbohydrateRecord, proteinRecord, fatRecord) {
//     const diet_chart_class = document.getElementById('diet_chart').getContext('2d');
//     const diet_chart = new Chart(diet_chart_class, {
//         type: 'bar',
//         data: {
//             labels: ["탄수화물", "지방", "단백질"],
//             datasets: [{
//                 label: '목표 칼로리(kcal)',
//                 backgroundColor: 'rgba(254, 192, 9, 0.5)',
//                 borderColor: 'rgb(254, 192, 9)',
//                 data: [carbohydrateGoal, fatGoal, proteinGoal],
//                 barThickness: 20,
//                 categoryPercentage: 0.6,
//                 barPercentage: 0.8,
//             }, {
//                 label: '달성 칼로리(kcal)',
//                 backgroundColor: 'rgba(44, 57, 74, 0.5)',
//                 borderColor: 'rgb(44, 57, 74)',
//                 data: [carbohydrateRecord, fatRecord, proteinRecord],
//                 barThickness: 20,
//                 categoryPercentage: 0.6,
//                 barPercentage: 0.8,
//             }]
//         },
//         options: {
//             indexAxis: 'y', // y축을 기준으로 데이터 나열
//             scales: {
//                 x: {
//                     beginAtZero: true,
//                     ticks: {
//                         stepSize: 1,
//                     }
//                 }
//             }
//         }
//     });
// }

// function exercise_chart(aerobicGoal, muscleGoal, stretchGoal, yogaGoal, aerobicRecord, muscleRecord, stretchRecord, yogaRecord) {
//     const exercise_chart_class = document.getElementById('exercise_chart').getContext('2d');
//     const exercise_chart = new Chart(exercise_chart_class, {
//         type: 'bar',
//         data: {
//             labels: ["유산소", "근력운동", "스트레칭", "요가"],
//             datasets: [{
//                 label: '목표 운동량(분)',
//                 backgroundColor: 'rgba(254, 192, 9, 0.5)',
//                 borderColor: 'rgb(254, 192, 9)',
//                 data: [aerobicGoal, muscleGoal, stretchGoal, yogaGoal],
//                 barThickness: 20,
//                 categoryPercentage: 0.6,
//                 barPercentage: 0.8,
//             }, {
//                 label: '달성 운동량(분)',
//                 backgroundColor: 'rgba(44, 57, 74, 0.5)',
//                 borderColor: 'rgb(44, 57, 74)',
//                 data: [aerobicRecord, muscleRecord, stretchRecord, yogaRecord],
//                 barThickness: 20,
//                 categoryPercentage: 0.6,
//                 barPercentage: 0.8,
//             }]
//         },
//         options: {
//             indexAxis: 'y', // y축을 기준으로 데이터 나열
//             scales: {
//                 x: {
//                     beginAtZero: true,
//                     ticks: {
//                         stepSize: 1,
//                     }
//                 }
//             }
//         }
//     });
// }


// 코인충전소
function sessionCoin(user){
    console.log("여기: ", user)
    axios
    .post("http://localhost:8080/findCoin", user)
    .then((response)=>{
        console.log("데이터: ", response.data)
        cash(response.data) 
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })
}

function cash(data){
    const before_cash = document.querySelector(".before_cash");
    before_cash.textContent = data + "개"

    let coin = data;
    let cash = 0;
    const after_cash = document.querySelector(".after_cash");
    const final_price_value = document.querySelector(".final_price_value");
    after_cash.textContent = coin + "개";
    final_price_value.textContent = cash + "원"

    document.querySelector(".cash_box_butten1").addEventListener("click", ()=>{
        coin = coin + 1;
        cash = cash + 200;
        console.log(1)
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원"
    })
    document.querySelector(".cash_box_butten10").addEventListener("click", ()=>{
        coin = coin + 10;
        cash = cash + 2000;
        console.log(2)
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원"
    })
    document.querySelector(".cash_box_butten30").addEventListener("click", ()=>{
        coin = coin + 30;
        cash = cash + 6000;
        console.log(3)
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원"
    })
    document.querySelector(".cash_box_butten50").addEventListener("click", ()=>{
        coin = coin + 50;
        cash = cash + 10000;
        console.log(4)
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원"
    })
    document.querySelector(".cash_box_butten100").addEventListener("click", ()=>{
        coin = coin + 100;
        cash = cash + 20000;
        console.log(5)
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원"
    })
    document.querySelector(".cash_box_butten200").addEventListener("click", ()=>{
        coin = coin + 200;
        cash = cash + 40000;
        console.log(6)
        after_cash.textContent = coin + "개";
        final_price_value.textContent = cash + "원"
    })
    
    document.querySelector(".content_body_cash_butten").addEventListener("click",()=>{
        const changeuser = {
            userId: user.userId,
            coin: coin
        }
        
        axios
        .post("http://localhost:8080/changeCoin", changeuser)
        .then((response)=>{
            console.log("데이터: ", response.data)
            location.reload();
        })
        .catch((error)=>{
            console.log("에러: ", error)
        })
    })
}




// 계정관리
function sessionMyid(user){
    axios
    .post("http://localhost:8080/sendUser", user)
    .then((response)=>{
        console.log("데이터: ", response.data)
        myid1(response.data) 
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })

    axios
    .post("http://localhost:8080/findUserCategory", user)
    .then((response)=>{
        console.log("데이터: ", response.data)
        myid11(response.data) 
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })
}

function myid1(data){
    const myid_value_id = document.querySelector(".myid_value_id");
    const myid_value_name = document.querySelector(".myid_value_name");
    const myid_value_email = document.querySelector(".myid_value_email");
    const myid_value_birthday = document.querySelector(".myid_value_birthday");
    const myid_value_create = document.querySelector(".myid_value_create");
    
    myid_value_id.textContent = data.userId;
    myid_value_name.textContent = data.userName;
    myid_value_email.textContent = data.email;

    const birthday = new Date(data.birthday);
    const formattedDate = `${birthday.getFullYear()}년 ${birthday.getMonth() + 1}월 ${birthday.getDate()}일`;
    myid_value_birthday.textContent = formattedDate;

    const createdAt = new Date(data.createdAt);
    const formattedDateTime = `${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 ${createdAt.getDate()}일 ${createdAt.getHours()}시 ${createdAt.getMinutes()}분 ${createdAt.getSeconds()}초`;
    myid_value_create.textContent = formattedDateTime

    // 프로필 불러오기
    const myid_tap3_value_text = document.querySelector(".myid_tap3_value_text");
    myid_tap3_value_text.value = data.profileText;
}

function myid11(data){
    const myid_value_category = document.querySelector(".myid_value_category");
    let categorys = ""
    data.forEach((categoryUser, index)=>{
        if (index === data.length - 1) {
            categorys = categorys + categoryUser.category.categoryName;
        } else {
            categorys = categorys + categoryUser.category.categoryName + ", ";
        }
    })
    myid_value_category.textContent = categorys;
}
            
let changename = "";
let changepassword = "";
let changeemail = "";
let changebirthday = "";

document.querySelector("#usernameInput").addEventListener("change",(e)=>{
    changename = e.target.value;
    console.log(changename)
})
document.querySelector("#passwordInput").addEventListener("change",(e)=>{
    changepassword = e.target.value;
    console.log(changepassword)
})
document.querySelector("#emailInput").addEventListener("change",(e)=>{
    changeemail = e.target.value;
    console.log(changeemail)
})
document.querySelector("#birthdayInput").addEventListener("change",(e)=>{
    changebirthday = e.target.value;
    console.log(changebirthday)
})

document.querySelector(".myid_tap2_butten").addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
    let interests = [];
    checkboxes.forEach(checkbox => {
        interests.push({
            user: { userId: user.userId },
            category: { categoryName: checkbox.value }
        });
    });

    const promises = [];

    if (interests.length > 0) {
        const interestPromise = axios.post("http://localhost:8080/saveUserCategory", interests)
            .then(response => {
                console.log("데이터: ", response.data);
            })
            .catch(error => {
                console.log("에러: ", error);
            });
        promises.push(interestPromise);
    }

    if (changename !== "") {
        const changeuser = {
            userId: user.userId,
            userName: changename
        };
        const namePromise = axios.post("http://localhost:8080/changeUserName", changeuser)
            .then(response => {
                console.log("데이터: ", response.data);
            })
            .catch(error => {
                console.log("에러: ", error);
            });
        promises.push(namePromise);
    }

    if (changepassword !== "") {
        const changeuser = {
            userId: user.userId,
            password: changepassword
        };
        const passwordPromise = axios.post("http://localhost:8080/changePassword", changeuser)
            .then(response => {
                console.log("데이터: ", response.data);
            })
            .catch(error => {
                console.log("에러: ", error);
            });
        promises.push(passwordPromise);
    }

    if (changeemail !== "") {
        const changeuser = {
            userId: user.userId,
            email: changeemail
        };
        const emailPromise = axios.post("http://localhost:8080/changeUserEmail", changeuser)
            .then(response => {
                console.log("데이터: ", response.data);
            })
            .catch(error => {
                console.log("에러: ", error);
            });
        promises.push(emailPromise);
    }

    if (changebirthday !== "") {
        const changeuser = {
            userId: user.userId,
            birthday: changebirthday
        };
        const birthdayPromise = axios.post("http://localhost:8080/changeUserBirthday", changeuser)
            .then(response => {
                console.log("데이터: ", response.data);
            })
            .catch(error => {
                console.log("에러: ", error);
            });
        promises.push(birthdayPromise);
    }

    try {
        await Promise.all(promises);
        console.log("모든 요청이 완료되었습니다.");
        location.reload();
    } catch (error) {
        console.log("요청 중 에러 발생: ", error);
    }
});

document.querySelector(".myid_tap3_butten").addEventListener("click", ()=>{
    const myid_tap3_value_text = document.querySelector(".myid_tap3_value_text");

    const changeProfileText = {
        userId: user.userId,
        profileText: myid_tap3_value_text.value
    };

    console.log(myid_tap3_value_text.value);

    axios
    .post("http://localhost:8080/changeProfileText", changeProfileText)
    .then((response)=>{
        console.log("데이터: ", response.data)
    })
    .catch((error)=>{
        console.log("에러: ", error)
    })

    // 그림업로드
    // const myid_tap3_value = document.querySelector(".myid_tap3_value");
    // file = myid_tap3_value.files[0];

    // const reader = new FileReader();
    // reader.onload = function(e) {
    //     const dataUrl = e.target.result;
    //     console.log(dataUrl);
    //     const changeProfileImg = {
    //         userId: user.userId,
    //         profileImg: dataUrl
    //     };
    //     axios
    //     .post("http://localhost:8080/changeProfileImg", changeProfileImg)
    //     .then((response)=>{
    //         console.log("데이터: ", response.data)
    //     })
    //     .catch((error)=>{
    //         console.log("에러: ", error)
    //     })
    // };

    // reader.readAsDataURL(file);
    // const myid_tap3_value = document.querySelector(".myid_tap3_value");
    // file = myid_tap3_value.files[0];
    // axios
    // .post("http://localhost:8080/changeProfileImg", file)
    // .then((response)=>{
    //     console.log("데이터: ", response.data)
    // })
    // .catch((error)=>{
    //     console.log("에러: ", error)
    // })

    // const fileInput = document.querySelector(".myid_tap3_value");
    // const file = fileInput.files[0];
    
    // if (file) {
    //     const reader = new FileReader();
    //     reader.onloadend = function() {
    //         const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    //         console.log(base64String);
    //     };
    //     reader.readAsDataURL(file);
    // } else {
    //     alert('Please select a file.');
    // }
})

function profile_edit() {
    document.querySelector(".content_body_myid").classList.remove("hiden")
    // document.querySelector(".content_body_myrecord").classList.add("hiden")
    document.querySelector(".content_body_cash").classList.add("hiden")
    document.querySelector(".content_body_subscription").classList.add("hiden")
    
    document.querySelector(".myid").classList.add("content_menu_bold")
    // document.querySelector(".myrecord").classList.remove("content_menu_bold")
    document.querySelector(".cash").classList.remove("content_menu_bold")
    document.querySelector(".subscription").classList.remove("content_menu_bold")

    document.querySelector(".head_myid").classList.remove("hiden")
    // document.querySelector(".head_myrecord").classList.add("hiden")
    document.querySelector(".head_cash").classList.add("hiden")
    document.querySelector(".head_subscription").classList.add("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")

    // document.querySelector(".content_body_traning").classList.add("hiden")
    // document.querySelector(".traning").classList.remove("content_menu_bold")
    // document.querySelector(".head_traning").classList.add("hiden")

    document.querySelector(".content_body_myid_tap3").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('profile_edit') === 'true') {
        profile_edit();
        sessionStorage.removeItem('profile_edit'); // 실행 후 항목 제거
    }
});










document.querySelector(".subscription").addEventListener("click", ()=>{
    document.querySelector(".content_body_subscription").classList.remove("hiden")
    // document.querySelector(".content_body_traning").classList.add("hiden")
    // document.querySelector(".content_body_myrecord").classList.add("hiden")
    document.querySelector(".content_body_cash").classList.add("hiden")
    document.querySelector(".content_body_myid").classList.add("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")
    
    document.querySelector(".subscription").classList.add("content_menu_bold")
    // document.querySelector(".traning").classList.remove("content_menu_bold")
    // document.querySelector(".myrecord").classList.remove("content_menu_bold")
    document.querySelector(".cash").classList.remove("content_menu_bold")
    document.querySelector(".myid").classList.remove("content_menu_bold")

    document.querySelector(".head_subscription").classList.remove("hiden")
    // document.querySelector(".head_traning").classList.add("hiden")
    // document.querySelector(".head_myrecord").classList.add("hiden")
    document.querySelector(".head_cash").classList.add("hiden")
    document.querySelector(".head_myid").classList.add("hiden")

    document.querySelector(".content_body_subscription_box1").classList.remove("hiden")
    document.querySelector(".content_body_subscription_box2").classList.add("hiden")
    document.querySelector(".content_body_subscription_box3").classList.add("hiden")
    document.querySelector(".content_body_subscription_box4").classList.add("hiden")

    document.querySelector(".content_body_subscription_menu1").classList.add("content_menu_bold")
    document.querySelector(".content_body_subscription_menu2").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu3").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu4").classList.remove("content_menu_bold")
})

// document.querySelector(".traning").addEventListener("click", ()=>{
//     document.querySelector(".content_body_traning").classList.remove("hiden")
//     document.querySelector(".content_body_subscription").classList.add("hiden")
//     document.querySelector(".content_body_myrecord").classList.add("hiden")
//     document.querySelector(".content_body_cash").classList.add("hiden")
//     document.querySelector(".content_body_myid").classList.add("hiden")
    
//     document.querySelector(".traning").classList.add("content_menu_bold")
//     document.querySelector(".subscription").classList.remove("content_menu_bold")
//     document.querySelector(".myrecord").classList.remove("content_menu_bold")
//     document.querySelector(".cash").classList.remove("content_menu_bold")
//     document.querySelector(".myid").classList.remove("content_menu_bold")

//     document.querySelector(".head_traning").classList.remove("hiden")
//     document.querySelector(".head_subscription").classList.add("hiden")
//     document.querySelector(".head_myrecord").classList.add("hiden")
//     document.querySelector(".head_cash").classList.add("hiden")
//     document.querySelector(".head_myid").classList.add("hiden")
//     document.querySelector(".head_subscription1").classList.add("hiden")
//     document.querySelector(".head_subscription2").classList.add("hiden")
//     document.querySelector(".head_subscription3").classList.add("hiden")
// })

// document.querySelector(".myrecord").addEventListener("click", ()=>{
//     document.querySelector(".content_body_myrecord").classList.remove("hiden")
//     document.querySelector(".content_body_subscription").classList.add("hiden")
//     document.querySelector(".content_body_cash").classList.add("hiden")
//     document.querySelector(".content_body_myid").classList.add("hiden")
    
//     document.querySelector(".myrecord").classList.add("content_menu_bold")
//     document.querySelector(".subscription").classList.remove("content_menu_bold")
//     document.querySelector(".cash").classList.remove("content_menu_bold")
//     document.querySelector(".myid").classList.remove("content_menu_bold")

//     document.querySelector(".head_myrecord").classList.remove("hiden")
//     document.querySelector(".head_subscription").classList.add("hiden")
//     document.querySelector(".head_cash").classList.add("hiden")
//     document.querySelector(".head_myid").classList.add("hiden")
//     document.querySelector(".head_subscription1").classList.add("hiden")
//     document.querySelector(".head_subscription2").classList.add("hiden")
//     document.querySelector(".head_subscription3").classList.add("hiden")

//     document.querySelector(".content_body_traning").classList.add("hiden")
//     document.querySelector(".traning").classList.remove("content_menu_bold")
//     document.querySelector(".head_traning").classList.add("hiden")
// })
document.querySelector(".cash").addEventListener("click", ()=>{
    document.querySelector(".content_body_cash").classList.remove("hiden")
    // document.querySelector(".content_body_myrecord").classList.add("hiden")
    document.querySelector(".content_body_subscription").classList.add("hiden")
    document.querySelector(".content_body_myid").classList.add("hiden")
    
    document.querySelector(".cash").classList.add("content_menu_bold")
    // document.querySelector(".myrecord").classList.remove("content_menu_bold")
    document.querySelector(".subscription").classList.remove("content_menu_bold")
    document.querySelector(".myid").classList.remove("content_menu_bold")

    document.querySelector(".head_cash").classList.remove("hiden")
    // document.querySelector(".head_myrecord").classList.add("hiden")
    document.querySelector(".head_subscription").classList.add("hiden")
    document.querySelector(".head_myid").classList.add("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")

    // document.querySelector(".content_body_traning").classList.add("hiden")
    // document.querySelector(".traning").classList.remove("content_menu_bold")
    // document.querySelector(".head_traning").classList.add("hiden")
})
document.querySelector(".myid").addEventListener("click", ()=>{
    document.querySelector(".content_body_myid").classList.remove("hiden")
    // document.querySelector(".content_body_myrecord").classList.add("hiden")
    document.querySelector(".content_body_cash").classList.add("hiden")
    document.querySelector(".content_body_subscription").classList.add("hiden")
    
    document.querySelector(".myid").classList.add("content_menu_bold")
    // document.querySelector(".myrecord").classList.remove("content_menu_bold")
    document.querySelector(".cash").classList.remove("content_menu_bold")
    document.querySelector(".subscription").classList.remove("content_menu_bold")

    document.querySelector(".head_myid").classList.remove("hiden")
    // document.querySelector(".head_myrecord").classList.add("hiden")
    document.querySelector(".head_cash").classList.add("hiden")
    document.querySelector(".head_subscription").classList.add("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")

    // document.querySelector(".content_body_traning").classList.add("hiden")
    // document.querySelector(".traning").classList.remove("content_menu_bold")
    // document.querySelector(".head_traning").classList.add("hiden")
})








document.querySelectorAll(".myid_tap1")[0].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap1").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
    document.querySelector(".content_body_myid_tap3").classList.add("hiden")
})

document.querySelectorAll(".myid_tap2")[0].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap2").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap3").classList.add("hiden")
})

document.querySelectorAll(".myid_tap3")[0].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap3").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
})

document.querySelectorAll(".myid_tap1")[1].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap1").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
    document.querySelector(".content_body_myid_tap3").classList.add("hiden")
})

document.querySelectorAll(".myid_tap2")[1].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap2").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap3").classList.add("hiden")
})

document.querySelectorAll(".myid_tap3")[1].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap3").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
})

document.querySelectorAll(".myid_tap1")[2].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap1").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
    document.querySelector(".content_body_myid_tap3").classList.add("hiden")
})

document.querySelectorAll(".myid_tap2")[2].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap2").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap3").classList.add("hiden")
})

document.querySelectorAll(".myid_tap3")[2].addEventListener("click", ()=>{
    document.querySelector(".content_body_myid_tap3").classList.remove("hiden")
    document.querySelector(".content_body_myid_tap1").classList.add("hiden")
    document.querySelector(".content_body_myid_tap2").classList.add("hiden")
})


// querySelectorAll을 썼다가 변경
document.querySelector(".content_body_subscription_menu1").addEventListener("click", ()=>{
    document.querySelector(".content_body_subscription_box1").classList.remove("hiden")
    document.querySelector(".content_body_subscription_box2").classList.add("hiden")
    document.querySelector(".content_body_subscription_box3").classList.add("hiden")
    document.querySelector(".content_body_subscription_box4").classList.add("hiden")

    document.querySelector(".content_body_subscription_menu1").classList.add("content_menu_bold")
    document.querySelector(".content_body_subscription_menu2").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu3").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu4").classList.remove("content_menu_bold")

    document.querySelector(".head_subscription").classList.remove("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")
})

document.querySelector(".content_body_subscription_menu2").addEventListener("click", ()=>{
    document.querySelector(".content_body_subscription_box2").classList.remove("hiden")
    document.querySelector(".content_body_subscription_box1").classList.add("hiden")
    document.querySelector(".content_body_subscription_box3").classList.add("hiden")
    document.querySelector(".content_body_subscription_box4").classList.add("hiden")

    document.querySelector(".content_body_subscription_menu2").classList.add("content_menu_bold")
    document.querySelector(".content_body_subscription_menu1").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu3").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu4").classList.remove("content_menu_bold")

    document.querySelector(".head_subscription1").classList.remove("hiden")
    document.querySelector(".head_subscription").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")
})

document.querySelector(".content_body_subscription_menu3").addEventListener("click", ()=>{
    document.querySelector(".content_body_subscription_box3").classList.remove("hiden")
    document.querySelector(".content_body_subscription_box1").classList.add("hiden")
    document.querySelector(".content_body_subscription_box2").classList.add("hiden")
    document.querySelector(".content_body_subscription_box4").classList.add("hiden")

    document.querySelector(".content_body_subscription_menu3").classList.add("content_menu_bold")
    document.querySelector(".content_body_subscription_menu1").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu2").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu4").classList.remove("content_menu_bold")

    document.querySelector(".head_subscription2").classList.remove("hiden")
    document.querySelector(".head_subscription").classList.add("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription3").classList.add("hiden")
})

document.querySelector(".content_body_subscription_menu4").addEventListener("click", ()=>{
    document.querySelector(".content_body_subscription_box4").classList.remove("hiden")
    document.querySelector(".content_body_subscription_box1").classList.add("hiden")
    document.querySelector(".content_body_subscription_box2").classList.add("hiden")
    document.querySelector(".content_body_subscription_box3").classList.add("hiden")

    document.querySelector(".content_body_subscription_menu4").classList.add("content_menu_bold")
    document.querySelector(".content_body_subscription_menu1").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu2").classList.remove("content_menu_bold")
    document.querySelector(".content_body_subscription_menu3").classList.remove("content_menu_bold")

    document.querySelector(".head_subscription3").classList.remove("hiden")
    document.querySelector(".head_subscription").classList.add("hiden")
    document.querySelector(".head_subscription1").classList.add("hiden")
    document.querySelector(".head_subscription2").classList.add("hiden")
})





























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
            if (user.userId === "anonymousUser") {
                alert("로그인해주세요.");
                window.location.href = "login.html";
            }else{
                sessionCreateAll(user)
            }
            console.log("유저 정보: ", user);

            if(user.authority.authorityName == "ROLE_ADMIN"){
                document.querySelector(".admin_page_move").classList.remove("hiden")
                console.log("admin")
            }else{
                console.log("none")
            }
        }
    })
    .catch((error)=>{
        console.log("에러 발생: ", error);
        alert("로그인해주세요.");
    })
};

sessionCurrent();