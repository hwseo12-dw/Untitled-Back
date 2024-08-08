function sessionCreateAll(user){

    function checkLogin(user) {
    
        if (user.userId == "anonymousUser") {
            alert("로그인해주세요.");
            window.location.href = "/ptr/login.html";
        }
    }

    document.querySelector(".profile_edit_btn").addEventListener("click", ()=>{
        sessionStorage.setItem('profile_edit', 'true');
        window.location.href = 'mypage.html';
    })

document.querySelector(".footer_feedMenu_feedHomeBtn").addEventListener("click", ()=>{
    document.querySelector(".content_feed").classList.remove("hiden");
    document.querySelector(".content_feed2").classList.add("hiden");
    document.querySelector(".content_createFeed").classList.add("hiden");
    document.querySelector(".content_myFeed").classList.add("hiden");
    document.querySelector(".content_scrapFeed").classList.add("hiden");
    document.querySelector(".content_follower").classList.add("hiden");
    document.querySelector(".content_following").classList.add("hiden");
    document.querySelector(".content_feedMore").classList.add("hiden");
    document.querySelector(".content_feedMore_likeList").classList.add("hiden");
    document.querySelector(".content_updateFeed").classList.add("hiden");
})
document.querySelector(".footer_feedMenu_createFeedBtn").addEventListener("click", ()=>{
    checkLogin(user);
    document.querySelector(".content_feed").classList.add("hiden");
    document.querySelector(".content_feed2").classList.add("hiden");
    document.querySelector(".content_createFeed").classList.remove("hiden");
    document.querySelector(".content_myFeed").classList.add("hiden");
    document.querySelector(".content_scrapFeed").classList.add("hiden");
    document.querySelector(".content_follower").classList.add("hiden");
    document.querySelector(".content_following").classList.add("hiden");
    document.querySelector(".content_feedcommentbox").classList.add("hiden");
    document.querySelector(".content_feedMore").classList.add("hiden");
    document.querySelector(".content_feedMore_likeList").classList.add("hiden");
    document.querySelector(".content_updateFeed").classList.add("hiden");
})
document.querySelector(".footer_feedMenu_myFeedBtn").addEventListener("click", ()=>{
    checkLogin(user);
    document.querySelector(".content_feed").classList.add("hiden");
    document.querySelector(".content_feed2").classList.add("hiden");
    document.querySelector(".content_createFeed").classList.add("hiden");
    document.querySelector(".content_myFeed").classList.remove("hiden");
    document.querySelector(".content_scrapFeed").classList.add("hiden");
    document.querySelector(".content_follower").classList.add("hiden");
    document.querySelector(".content_following").classList.add("hiden");
    document.querySelector(".content_feedcommentbox").classList.add("hiden");
    document.querySelector(".content_feedMore").classList.add("hiden");
    document.querySelector(".content_feedMore_likeList").classList.add("hiden");
    document.querySelector(".content_updateFeed").classList.add("hiden");
})
document.querySelector(".footer_feedMenu_scrapFeedBtn").addEventListener("click", ()=>{
    checkLogin(user);
    document.querySelector(".content_feed").classList.add("hiden");
    document.querySelector(".content_feed2").classList.add("hiden");
    document.querySelector(".content_createFeed").classList.add("hiden");
    document.querySelector(".content_myFeed").classList.add("hiden");
    document.querySelector(".content_scrapFeed").classList.remove("hiden");
    document.querySelector(".content_follower").classList.add("hiden");
    document.querySelector(".content_following").classList.add("hiden");
    document.querySelector(".content_feedcommentbox").classList.add("hiden");
    document.querySelector(".content_feedMore").classList.add("hiden");
    document.querySelector(".content_feedMore_likeList").classList.add("hiden");
    document.querySelector(".content_updateFeed").classList.add("hiden");
})
document.querySelector(".content_follower_backBtn").addEventListener("click", ()=>{
    document.querySelector(".content_follower").classList.add("hiden");
    document.querySelector(".content_myFeed").classList.remove("hiden");
})
document.querySelector(".content_following_backBtn").addEventListener("click", ()=>{
    document.querySelector(".content_following").classList.add("hiden");
    document.querySelector(".content_myFeed").classList.remove("hiden");
})
document.querySelector(".content_feedcomment_closeBtn").addEventListener("click",()=>{
    document.querySelector(".content_feedcommentbox").classList.add("hiden");
})

let text = "";
//피드 홈
axios
.get("http://localhost:8080/feed", {withCredentials: true})
.then((response) => {
    console.log("데이터: ", response.data);
    displayFeed(response.data);
})
.catch((error)=>{
    console.log("에러발생: ", error);
})

//피드 작성
document.querySelector("#text-large").addEventListener("change",(e)=>{
    console.log(e.target.value);
    text = e.target.value;
})

document.querySelector(".content_createFeed_createBtn").addEventListener("click",()=>{
    const data = {
        user : {
            userId: user.userId
        },
        text:text
    }
    axios
    .post("http://localhost:8080/feed", data, {withCredentials: true})
    .then((response) => {
        console.log("서버 응답: ", response.data);
        alert("성공적으로 전송되었습니다.");
        location.reload();

    })
    .catch((error) => {
        console.log("에러 발생: ", error);
        alert("에러가 발생했습니다.");
    });
})

// 스크랩
axios
.post("http://localhost:8080/feedScrap/user", {userId: user.userId}, {withCredentials: true})
.then((response) => {
    console.log("데이터: ", response.data);
    displayScrap(response.data);
})
.catch((error)=>{
    console.log("에러발생: ", error);
})

// 마이페이지
const content_createFeed_userPhoto = document.querySelector(".content_createFeed_userPhoto");
const content_createFeed_myId = document.querySelector(".content_createFeed_myId");
const content_myFeed_profile_img = document.getElementById("content_myFeed_profile_img");
const content_myFeed_profile_id = document.querySelector(".content_myFeed_profile_id");
const content_myFeed_profile_text = document.querySelector(".content_myFeed_profile_text");
axios
.post("http://localhost:8080/sendUser", {userId: user.userId}, {withCredentials: true})
.then((response) => {
    console.log("데이터: ", response.data);
    
    content_myFeed_profile_img.src = response.data.profileImg;
    content_myFeed_profile_id.textContent = response.data.userId;
    content_myFeed_profile_text.textContent = response.data.profileText;
    content_createFeed_myId.textContent = response.data.userId;
    content_createFeed_userPhoto.src = response.data.profileImg;
})
.catch((error)=>{
    console.log("에러발생: ", error);
})

const content_myFeed_profile_box_numberOfFeed = document.querySelector(".content_myFeed_profile_box_numberOfFeed");
axios
.post("http://localhost:8080/numberOfFeed", {userId: user.userId}, {withCredentials:true})
.then((response)=>{
    console.log("데이터: ", response.data);
    content_myFeed_profile_box_numberOfFeed.textContent = response.data;

})
.catch((error)=>{
    console.log("에러발생: ", error);
})

const content_myFeed_profile_box_numberOfFollower = document.querySelector(".content_myFeed_profile_box_numberOfFollower");
axios
.post("http://localhost:8080/numberOfFollowByUser", {userId: user.userId}, {withCredentials:true})
.then((response)=>{
    console.log("데이터111: ",response.data);
    content_myFeed_profile_box_numberOfFollower.textContent = response.data;
})
.catch((error)=>{
    console.log("에러발생: ", error);
})

const content_myFeed_profile_box_numberOfFollowing = document.querySelector(".content_myFeed_profile_box_numberOfFollowing");
axios
.post("http://localhost:8080/numberOfFollowByUser2", {userId: user.userId}, {withCredentials:true})
.then((response)=>{
    console.log("데이터: ", response.data);
    content_myFeed_profile_box_numberOfFollowing.textContent = response.data;
})
.catch((error)=>{
    console.log("에러발생: ", error);
})

axios
.post("http://localhost:8080/feed/id", {userId: user.userId}, {withCredentials: true})
.then((response) => {
    console.log("데이터: ", response.data);
    displayMyFeed(response.data);
})
.catch((error)=>{
    console.log("에러발생: ", error);
})


//팔로워 조회
document.querySelector(".content_myFeed_profile_box_numberOfFollower").addEventListener("click",()=>{
    document.querySelector(".content_myFeed").classList.add("hiden");
    document.querySelector(".content_follower").classList.remove("hiden");

    axios
    .post("http://localhost:8080/userFollow/user", {userId: user.userId}, {withCredentials: true})
    .then((response) => {
        console.log("데이터: ", response.data);
        displayFollower(response.data);
        
    })
    .catch((error)=>{
        console.log("에러발생: ", error);
    })
})

//팔로잉 조회
document.querySelector(".content_myFeed_profile_box_numberOfFollowing").addEventListener("click",()=>{
    document.querySelector(".content_myFeed").classList.add("hiden");
    document.querySelector(".content_following").classList.remove("hiden");


    axios
    .post("http://localhost:8080/userFollow/user2", {userId: user.userId}, {withCredentials: true})
    .then((response) => {
        console.log("데이터: ", response.data);
        displayFollowing(response.data);
        
    })
    .catch((error)=>{
        console.log("에러발생: ", error);
    })
})

//메서드
function displayFeed(data){
    const feedbody = document.querySelector(".content_feed");
    data.forEach((feed)=>{
        console.log(feed);
        //태그 요소 생성
        const content_feed = document.createElement("div");
        const content_feedheader = document.createElement("div");
        const content_feedheader_left = document.createElement("div");
        const content_feedheader_userPhoto = document.createElement("img");
        const content_feedheader_userId = document.createElement("div");
        const content_feedheader_date = document.createElement("div");
        const content_feedheader_moreBtn = document.createElement("div");
        const dot1 = document.createElement("div");
        const dot2 = document.createElement("div");
        const dot3 = document.createElement("div");
        const content_feedPhoto = document.createElement("img");
        const content_feedfooter = document.createElement("div");
        const content_feedfooter_left = document.createElement("div");
        const content_feedfooter_text = document.createElement("div");
        const content_feedfooter_right = document.createElement("div");
        const content_feedfooter_likeBtn = document.createElement("img");
        const content_feedfooter_like = document.createElement("div");
        const content_feedfooter_commentBtn = document.createElement("img");
        const content_feedfooter_comment = document.createElement("div");
        const content_feedfooter_scrapBtn = document.createElement("img");
        const content_feedheader_a = document.createElement("div");
        //클래스 이름
        content_feed.classList.add("content_feed");
        content_feedheader.classList.add("content_feedheader");
        content_feedheader_left.classList.add("content_feedheader_left");
        content_feedheader_userPhoto.classList.add("content_feedheader_userPhoto");
        content_feedheader_userId.classList.add("content_feedheader_userId");
        content_feedheader_date.classList.add("content_feedheader_date");
        content_feedheader_moreBtn.classList.add("content_feedheader_moreBtn");
        dot1.classList.add("dot");
        dot2.classList.add("dot");
        dot3.classList.add("dot");
        content_feedPhoto.classList.add("content_feedPhoto");
        content_feedfooter.classList.add("content_feedfooter");
        content_feedfooter_left.classList.add("content_feedfooter_left");
        content_feedfooter_text.classList.add("content_feedfooter_text");
        content_feedfooter_right.classList.add("content_feedfooter_right");
        content_feedfooter_likeBtn.classList.add("content_feedfooter_likeBtn");
        content_feedfooter_like.classList.add("content_feedfooter_like");
        content_feedfooter_commentBtn.classList.add("content_feedfooter_commentBtn");
        content_feedfooter_comment.classList.add("content_feedfooter_comment");
        content_feedfooter_scrapBtn.classList.add("content_feedfooter_scrapBtn");
        
       //태그 속성
        axios
        .post("http://localhost:8080/numberOfFeedLike", {id:feed.id}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            content_feedfooter_like.textContent = response.data;

        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
        axios
        .post("http://localhost:8080/numberOfFeedComment", {id:feed.id}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            content_feedfooter_comment.textContent = response.data;

        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })

        //좋아요버튼
        axios
        .post("http://localhost:8080/checkFeedLikeClick", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            if(response.data == true){
                content_feedfooter_likeBtn.src = "/img/redheart.png";
                //조아요 취소
                content_feedfooter_likeBtn.addEventListener("click", ()=>{
                    axios
                    .delete("http://localhost:8080/feedLike", {data:{feed:{id:feed.id },user:{userId:user.userId }}, withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }else{
                content_feedfooter_likeBtn.src = "/img/heart.png";
                //조아요
                content_feedfooter_likeBtn.addEventListener("click", ()=>{
                    checkLogin(user);
                    axios
                    .post("http://localhost:8080/feedLike", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
        //스크랩버튼
        axios
        .post("http://localhost:8080/checkFeedScrapClick", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            if(response.data == true){
                content_feedfooter_scrapBtn.src = "/img/blackbookmark.png";
                //스크랩취소
                content_feedfooter_scrapBtn.addEventListener("click",()=>{
                    axios
                    .delete("http://localhost:8080/feedScrap", {data:{feed:{id:feed.id },user:{userId:user.userId }}, withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }else{
                content_feedfooter_scrapBtn.src = "/img/bookmark.png";
                content_feedfooter_scrapBtn.addEventListener("click",()=>{
                    checkLogin(user);
                    axios
                    .post("http://localhost:8080/feedScrap", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })

        content_feedheader_userPhoto.src = feed.user.profileImg;
        content_feedheader_userId.textContent = feed.user.userId;
        content_feedheader_date.textContent = feed.createdAt;
        content_feedPhoto.src = feed.image;
        content_feedfooter_text.textContent = feed.text;

        content_feedfooter_commentBtn.src = "/img/comment.png";
        
        content_feedfooter_commentBtn.addEventListener("click",()=>{
            document.querySelector(".content_feedcommentbox").classList.remove("hiden");
            axios
            .post("http://localhost:8080/getFeedComment", {id:feed.id}, {withCredentials:true})
            .then((response)=>{
                console.log("데이터: ", response.data);
                displayComments(response.data);
            })
            .catch((error)=>{
                console.log("에러발생: ", error);
            })

            function displayComments(data){
                const commentFooter = document.querySelector(".content_feedcomment_footer");
                commentFooter.innerHTML = ''

                const commentText = document.createElement("textarea");
                commentText.id = "commentText"
                commentText.placeholder = "댓글을 작성하세요"

                const content_feedcomment_forwardBtn = document.createElement("div");
                content_feedcomment_forwardBtn.classList.add("content_feedcomment_forwardBtn")
                content_feedcomment_forwardBtn.textContent = "댓글달기"

                commentFooter.appendChild(commentText);
                commentFooter.appendChild(content_feedcomment_forwardBtn);

                const commentBody = document.querySelector(".content_feedcomment_body");
                commentBody.innerHTML = ''; // 기존 댓글 초기화
                data.forEach((comment)=>{
                    //태그 요소 생성
                    const content_feedcomment = document.createElement("div");
                    const content_feedcomment_userPhoto = document.createElement("img");
                    const content_feedcomment_user = document.createElement("div");
                    const content_feedcomment_userId = document.createElement("div");
                    const content_feedcomment_text = document.createElement("div");
                    const content_feedcomment_right = document.createElement("div");
                    const content_feedcomment_likeBtn = document.createElement("img");
                    const content_feedcomment_like = document.createElement("div");
                    const content_feedcomment_deleteComment = document.createElement("img");
                    
                    //클래스 이름
                    content_feedcomment.classList.add("content_feedcomment");
                    content_feedcomment_userPhoto.classList.add("content_feedcomment_userPhoto");
                    content_feedcomment_user.classList.add("content_feedcomment_user");
                    content_feedcomment_userId.classList.add("content_feedcomment_userId");
                    content_feedcomment_text.classList.add("content_feedcomment_text");
                    content_feedcomment_right.classList.add("content_feedcomment_right");
                    content_feedcomment_likeBtn.classList.add("content_feedcomment_likeBtn");
                    content_feedcomment_like.classList.add("content_feedcomment_like");
                    content_feedcomment_deleteComment.classList.add("content_feedcomment_deleteComment");
                    //태그속성
                    content_feedcomment_userPhoto.src = comment.user.profileImg;
                    content_feedcomment_userId.textContent = comment.user.userId;
                    content_feedcomment_text.textContent = comment.text;

                    
                    //댓글 좋아요 개수
                    axios
                    .post("http://localhost:8080/numberOfFeedCommentLike", {id:comment.id}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        content_feedcomment_like.textContent = response.data;
                    
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                     //좋아요버튼
                    axios
                    .post("http://localhost:8080/checkFeedCommentLikeClick", {feedComment:{id:comment.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        if(response.data == true){
                            content_feedcomment_likeBtn.src = "/img/redheart.png";
                            //조아요 취소
                            content_feedcomment_likeBtn.addEventListener("click", ()=>{
                                axios
                                .delete("http://localhost:8080/feedCommentLike", {data:{feedComment:{id:comment.id },user:{userId:user.userId }}, withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();


                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                        }else{
                            content_feedcomment_likeBtn.src = "/img/heart.png";
                            //조아요
                            content_feedcomment_likeBtn.addEventListener("click", ()=>{
                                checkLogin(user);
                                axios
                                .post("http://localhost:8080/feedCommentLike", {feedComment:{id:comment.id}, user:{userId: user.userId}}, {withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();

                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                        }
                        

                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                    
                    
                    //부모자식설정
                    commentBody.appendChild(content_feedcomment);
                    content_feedcomment.appendChild(content_feedcomment_userPhoto);
                    content_feedcomment.appendChild(content_feedcomment_user);
                    content_feedcomment_user.appendChild(content_feedcomment_userId);
                    content_feedcomment_user.appendChild(content_feedcomment_text);
                    content_feedcomment.appendChild(content_feedcomment_right);
                    content_feedcomment_right.appendChild(content_feedcomment_likeBtn);
                    content_feedcomment_right.appendChild(content_feedcomment_like);

                    if(comment.user.userId == user.userId){
                        content_feedcomment_deleteComment.src = "/img/closeBtn.png";
                        content_feedcomment_right.appendChild(content_feedcomment_deleteComment);

                        //댓글 삭제버튼
                        content_feedcomment_deleteComment.addEventListener("click",()=>{
                            axios
                            .post("http://localhost:8080/feedCommentLikeByFeedComment", {id:comment.id}, {withCredentials:true})
                            .then((response)=> {
                                console.log("데이터: ", response.data);
                                axios
                                .post("http://localhost:8080/deleteFeedComment", {id:comment.id}, {withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                            .catch((error)=>{
                                console.log("에러발생: ", error)
                            })
                            
                        })
                    }
                })
                document.querySelector("#commentText").addEventListener("change",(e)=>{
                    console.log(e.target.value);
                    text = e.target.value;
                })
                
                document.querySelector(".content_feedcomment_forwardBtn").addEventListener("click",()=>{
                    checkLogin(user);
                    const data1 = {
                        user : {
                            userId: user.userId
                        },
                        text:text,
                        feed : {
                            id:feed.id
                        }
                    }
                    axios
                    .post("http://localhost:8080/feedComment", data1, {withCredentials: true})
                    .then((response) => {
                        console.log("서버 응답: ", response.data);
                    })
                    .catch((error) => {
                        console.log("에러 발생: ", error);
                    });
                })
            }
            
        })
        
        //부모 자식 위치
        feedbody.appendChild(content_feed);
        content_feed.appendChild(content_feedheader);
        content_feedheader.appendChild(content_feedheader_left);
        content_feedheader_left.appendChild(content_feedheader_userPhoto);
        content_feedheader_left.appendChild(content_feedheader_a);
        content_feedheader_a.appendChild(content_feedheader_userId);
        content_feedheader_a.appendChild(content_feedheader_date);

        if(feed.user.userId == user.userId){
            content_feedheader.appendChild(content_feedheader_moreBtn);
            content_feedheader_moreBtn.appendChild(dot1);
            content_feedheader_moreBtn.appendChild(dot2);
            content_feedheader_moreBtn.appendChild(dot3);

            //더보기
            content_feedheader_moreBtn.addEventListener("click",()=>{
                document.querySelector(".content_feedMore").classList.remove("hiden");

                const content_feedMore_closeBtn = document.querySelector(".content_feedMore_closeBtn");
                content_feedMore_closeBtn.addEventListener("click",()=>{
                    document.querySelector(".content_feedMore").classList.add("hiden");
                })

                const content_feedMore_changeBtn = document.querySelector(".content_feedMore_changeBtn");
                content_feedMore_changeBtn.addEventListener("click",()=>{
                    document.querySelector(".content_updateFeed").classList.remove("hiden");
                    document.querySelector(".content_feed").classList.add("hiden");
                    document.querySelector(".content_feedMore").classList.add("hiden");

                    const content_updateFeed_userPhoto = document.querySelector(".content_updateFeed_userPhoto");
                    const content_updateFeed_myId = document.querySelector(".content_updateFeed_myId");

                    axios
                    .post("http://localhost:8080/sendUser", {userId: user.userId}, {withCredentials: true})
                    .then((response) => {
                        console.log("데이터: ", response.data);
                        content_updateFeed_userPhoto.src = response.data.profileImg;
                        content_updateFeed_myId.textContent = response.data.userId;
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                    //피드 수정
                    document.querySelector("#text-large2").addEventListener("change",(e)=>{
                        console.log(e.target.value);
                        text = e.target.value;
                    })

                    document.querySelector(".content_updateFeed_createBtn").addEventListener("click",()=>{
                        const data = {
                            user : {
                                userId: user.userId
                            },
                            text:text,
                            id:feed.id,
                            image:feed.image
                        }
                        axios
                        .put("http://localhost:8080/feed", data, {withCredentials: true})
                        .then((response) => {
                            console.log("서버 응답: ", response.data);
                            alert("성공적으로 전송되었습니다.");
                            location.reload();
                        })
                        .catch((error) => {
                            console.log("에러 발생: ", error);
                            alert("에러가 발생했습니다.");
                        
                        })
                    })
                    

                })
                
                //피드 삭제
                const content_feedMore_delete = document.querySelector(".content_feedMore_delete");
                content_feedMore_delete.addEventListener("click", () => {

                    axios
                    .post("http://localhost:8080/deleteFeedScrapByFeed", {id: feed.id}, {withCredentials:true})
                    .then((response) => {
                        console.log("데이터: ", response.data);
                        axios
                        .post("http://localhost:8080/deleteFeedLikeByFeed", {id: feed.id}, {withCredentials:true})
                        .then((response)=>{
                            console.log("데이터: ", response.data);
                            axios
                            .post("http://localhost:8080/deleteFeedCommentLikeByFeed", {id: feed.id}, {withCredentials:true})
                            .then((response)=>{
                                console.log("데이터: ",response.data);
                                axios
                                .post("http://localhost:8080/deleteFeedCommentByFeed", {id: feed.id}, {withCredentials:true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    axios
                                    .post("http://localhost:8080/deleteFeed", { id: feed.id }, { withCredentials: true })
                                    .then((response) => {
                                        console.log("데이터: ", response.data);
                                        location.reload();
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
                    })
                    .catch((error) => {
                        console.log("에러: ", error);
                    });
                });

                //좋아요 확인
                const content_feedMore_likeCheck = document.querySelector(".content_feedMore_likeCheck");
                content_feedMore_likeCheck.addEventListener("click",()=>{
                    document.querySelector(".content_feedMore_likeList").classList.remove("hiden");

                    const content_feedMore_likeList_closeBtn = document.querySelector(".content_feedMore_likeList_closeBtn");
                    content_feedMore_likeList_closeBtn.addEventListener("click",()=>{
                        document.querySelector(".content_feedMore_likeList").classList.add("hiden");
                    })

                    
                    axios
                    .post("http://localhost:8080/getFeedLike", {id:feed.id}, {withCredentials:true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        const likebody = document.querySelector(".content_feedMore_like")
                        response.data.forEach(like => {
                        likebody.innerHTML = "";
                        // const likebody = document.querySelector(".content_feedMore_like");
                        
                        //태그 요소
                        const content_feedMore_like = document.createElement("div");
                        const content_feedMore_like_userPhoto = document.createElement("img");
                        const content_feedMore_like_userId = document.createElement("div");
                        
                        //클래스 이름
                        content_feedMore_like.classList.add("content_feedMore_like");
                        content_feedMore_like_userPhoto.classList.add("content_feedMore_like_userPhoto");
                        content_feedMore_like_userId.classList.add("content_feedMore_like_userId");

                        //태그 속성
                        content_feedMore_like_userPhoto.src = like.user.profileImg;
                        content_feedMore_like_userId.textContent = like.user.userId;

                        //부모자식
                        likebody.appendChild(content_feedMore_like_userPhoto);
                        likebody.appendChild(content_feedMore_like_userId);

                        });
                        
                    })
                    .catch((error)=>{
                        console.log("에러: ", error);
                    })
                })

            })
        }
        

        content_feed.appendChild(content_feedPhoto);
        content_feed.appendChild(content_feedfooter);
        content_feedfooter.appendChild(content_feedfooter_left);
        content_feedfooter_left.appendChild(content_feedfooter_text);
        content_feedfooter.appendChild(content_feedfooter_right);
        content_feedfooter_right.appendChild(content_feedfooter_likeBtn);
        content_feedfooter_right.appendChild(content_feedfooter_like);
        content_feedfooter_right.appendChild(content_feedfooter_commentBtn);
        content_feedfooter_right.appendChild(content_feedfooter_comment);
        content_feedfooter_right.appendChild(content_feedfooter_scrapBtn);

        })
}
function displayScrap(data){
    const feedbody = document.querySelector(".content_scrapFeed_feeds");
    data.forEach((feed)=>{
        console.log(feed);
        //태그 요소 생성
        const content_scrapFeed_feed = document.createElement("img");
        
        //클래스 이름
        content_scrapFeed_feed.classList.add("content_scrapFeed_feed");
        
       //태그 속성
        content_scrapFeed_feed.src = feed.feed.image;

        content_scrapFeed_feed.addEventListener("click",()=>{

            document.querySelector(".content_scrapFeed").classList.add("hiden");
            document.querySelector(".content_feed2").classList.remove("hiden");
            console.log(feed);
            renderFeed(feed.feed);
            
        })
        
        //부모 자식 위치
        feedbody.appendChild(content_scrapFeed_feed);

        })

    function renderFeed(feed){
        console.log(feed);
        const feedbody = document.querySelector(".content_feed2");
        feedbody.innerHTML = "";
    
        const content_feed2 = document.createElement("div");
        const content_feedheader = document.createElement("div");
        const content_feedheader_left = document.createElement("div");
        const content_feedheader_userPhoto = document.createElement("img");
        const content_feedheader_userId = document.createElement("div");
        const content_feedheader_date = document.createElement("div");
        const content_feedheader_moreBtn = document.createElement("div");
        const dot1 = document.createElement("div");
        const dot2 = document.createElement("div");
        const dot3 = document.createElement("div");
        const content_feedPhoto = document.createElement("img");
        const content_feedfooter = document.createElement("div");
        const content_feedfooter_left = document.createElement("div");
        const content_feedfooter_text = document.createElement("div");
        const content_feedfooter_right = document.createElement("div");
        const content_feedfooter_likeBtn = document.createElement("img");
        const content_feedfooter_like = document.createElement("div");
        const content_feedfooter_commentBtn = document.createElement("img");
        const content_feedfooter_comment = document.createElement("div");
        const content_feedfooter_scrapBtn = document.createElement("img");
        const content_feedheader_a = document.createElement("div");
        //클래스 이름
        content_feed2.classList.add("content_feed2");
        content_feedheader.classList.add("content_feedheader");
        content_feedheader_left.classList.add("content_feedheader_left");
        content_feedheader_userPhoto.classList.add("content_feedheader_userPhoto");
        content_feedheader_userId.classList.add("content_feedheader_userId");
        content_feedheader_date.classList.add("content_feedheader_date");
        content_feedheader_moreBtn.classList.add("content_feedheader_moreBtn");
        dot1.classList.add("dot");
        dot2.classList.add("dot");
        dot3.classList.add("dot");
        content_feedPhoto.classList.add("content_feedPhoto");
        content_feedfooter.classList.add("content_feedfooter");
        content_feedfooter_left.classList.add("content_feedfooter_left");
        content_feedfooter_text.classList.add("content_feedfooter_text");
        content_feedfooter_right.classList.add("content_feedfooter_right");
        content_feedfooter_likeBtn.classList.add("content_feedfooter_likeBtn");
        content_feedfooter_like.classList.add("content_feedfooter_like");
        content_feedfooter_commentBtn.classList.add("content_feedfooter_commentBtn");
        content_feedfooter_comment.classList.add("content_feedfooter_comment");
        content_feedfooter_scrapBtn.classList.add("content_feedfooter_scrapBtn");
        
       //태그 속성
        axios
        .post("http://localhost:8080/numberOfFeedLike", {id:feed.id}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            content_feedfooter_like.textContent = response.data;
    
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
        axios
        .post("http://localhost:8080/numberOfFeedComment", {id:feed.id}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            content_feedfooter_comment.textContent = response.data;
    
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })

        //좋아요버튼
        axios
        .post("http://localhost:8080/checkFeedLikeClick", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            if(response.data == true){
                content_feedfooter_likeBtn.src = "/img/redheart.png";
                //조아요 취소
                content_feedfooter_likeBtn.addEventListener("click", ()=>{
                    axios
                    .delete("http://localhost:8080/feedLike", {data:{feed:{id:feed.id },user:{userId:user.userId }}, withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }else{
                content_feedfooter_likeBtn.src = "/img/heart.png";
                //조아요
                content_feedfooter_likeBtn.addEventListener("click", ()=>{
                    axios
                    .post("http://localhost:8080/feedLike", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
        //스크랩버튼
        axios
        .post("http://localhost:8080/checkFeedScrapClick", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            if(response.data == true){
                content_feedfooter_scrapBtn.src = "/img/blackbookmark.png";
                //스크랩취소
                content_feedfooter_scrapBtn.addEventListener("click",()=>{
                    axios
                    .delete("http://localhost:8080/feedScrap", {data:{feed:{id:feed.id },user:{userId:user.userId }}, withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }else{
                content_feedfooter_scrapBtn.src = "/img/bookmark.png";
                content_feedfooter_scrapBtn.addEventListener("click",()=>{
                    axios
                    .post("http://localhost:8080/feedScrap", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
    
        content_feedheader_userPhoto.src = feed.user.profileImg;
        content_feedheader_userId.textContent = feed.user.userId;
        content_feedheader_date.textContent = feed.createdAt;
        content_feedPhoto.src = feed.image;
        content_feedfooter_text.textContent = feed.text;
    
        content_feedfooter_commentBtn.src = "/img/comment.png";
        
        content_feedfooter_commentBtn.addEventListener("click",()=>{
            document.querySelector(".content_feedcommentbox").classList.remove("hiden");
            axios
            .post("http://localhost:8080/getFeedComment", {id:feed.id}, {withCredentials:true})
            .then((response)=>{
                console.log("데이터: ", response.data);
                displayComments(response.data);
            })
            .catch((error)=>{
                console.log("에러발생: ", error);
            })

            function displayComments(data){
                const commentFooter = document.querySelector(".content_feedcomment_footer");
                commentFooter.innerHTML = ''

                const commentText = document.createElement("textarea");
                commentText.id = "commentText"
                commentText.placeholder = "댓글을 작성하세요"

                const content_feedcomment_forwardBtn = document.createElement("div");
                content_feedcomment_forwardBtn.classList.add("content_feedcomment_forwardBtn")
                content_feedcomment_forwardBtn.textContent = "댓글달기"

                commentFooter.appendChild(commentText);
                commentFooter.appendChild(content_feedcomment_forwardBtn);

                const commentBody = document.querySelector(".content_feedcomment_body");
                commentBody.innerHTML = ''; // 기존 댓글 초기화
                data.forEach((comment)=>{
                    //태그 요소 생성
                    const content_feedcomment = document.createElement("div");
                    const content_feedcomment_userPhoto = document.createElement("img");
                    const content_feedcomment_user = document.createElement("div");
                    const content_feedcomment_userId = document.createElement("div");
                    const content_feedcomment_text = document.createElement("div");
                    const content_feedcomment_right = document.createElement("div");
                    const content_feedcomment_likeBtn = document.createElement("img");
                    const content_feedcomment_like = document.createElement("div");
                    const content_feedcomment_deleteComment = document.createElement("img");
                    
                    //클래스 이름
                    content_feedcomment.classList.add("content_feedcomment");
                    content_feedcomment_userPhoto.classList.add("content_feedcomment_userPhoto");
                    content_feedcomment_user.classList.add("content_feedcomment_user");
                    content_feedcomment_userId.classList.add("content_feedcomment_userId");
                    content_feedcomment_text.classList.add("content_feedcomment_text");
                    content_feedcomment_right.classList.add("content_feedcomment_right");
                    content_feedcomment_likeBtn.classList.add("content_feedcomment_likeBtn");
                    content_feedcomment_like.classList.add("content_feedcomment_like");
                    content_feedcomment_deleteComment.classList.add("content_feedcomment_deleteComment");
                    //태그속성
                    content_feedcomment_userPhoto.src = comment.user.profileImg;
                    content_feedcomment_userId.textContent = comment.user.userId;
                    content_feedcomment_text.textContent = comment.text;

                    
                    //댓글 좋아요 개수
                    axios
                    .post("http://localhost:8080/numberOfFeedCommentLike", {id:comment.id}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        content_feedcomment_like.textContent = response.data;
                    
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                     //좋아요버튼
                    axios
                    .post("http://localhost:8080/checkFeedCommentLikeClick", {feedComment:{id:comment.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        if(response.data == true){
                            content_feedcomment_likeBtn.src = "/img/redheart.png";
                            //조아요 취소
                            content_feedcomment_likeBtn.addEventListener("click", ()=>{
                                axios
                                .delete("http://localhost:8080/feedCommentLike", {data:{feedComment:{id:comment.id },user:{userId:user.userId }}, withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                        }else{
                            content_feedcomment_likeBtn.src = "/img/heart.png";
                            //조아요
                            content_feedcomment_likeBtn.addEventListener("click", ()=>{
                                axios
                                .post("http://localhost:8080/feedCommentLike", {feedComment:{id:comment.id}, user:{userId: user.userId}}, {withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                        }
                        

                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                    
                    
                    //부모자식설정
                    commentBody.appendChild(content_feedcomment);
                    content_feedcomment.appendChild(content_feedcomment_userPhoto);
                    content_feedcomment.appendChild(content_feedcomment_user);
                    content_feedcomment_user.appendChild(content_feedcomment_userId);
                    content_feedcomment_user.appendChild(content_feedcomment_text);
                    content_feedcomment.appendChild(content_feedcomment_right);
                    content_feedcomment_right.appendChild(content_feedcomment_likeBtn);
                    content_feedcomment_right.appendChild(content_feedcomment_like);

                    if(comment.user.userId == user.userId){
                        content_feedcomment_deleteComment.src = "/img/closeBtn.png";
                        content_feedcomment_right.appendChild(content_feedcomment_deleteComment);

                        //댓글 삭제버튼
                        content_feedcomment_deleteComment.addEventListener("click",()=>{
                            axios
                            .post("http://localhost:8080/feedCommentLikeByFeedComment", {id:comment.id}, {withCredentials:true})
                            .then((response)=> {
                                console.log("데이터: ", response.data);
                                axios
                                .post("http://localhost:8080/deleteFeedComment", {id:comment.id}, {withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                            .catch((error)=>{
                                console.log("에러발생: ", error)
                            })
                            
                        })
                    }
                })
                document.querySelector("#commentText").addEventListener("change",(e)=>{
                    console.log(e.target.value);
                    text = e.target.value;
                })
                
                document.querySelector(".content_feedcomment_forwardBtn").addEventListener("click",()=>{
                    const data1 = {
                        user : {
                            userId: user.userId
                        },
                        text:text,
                        feed : {
                            id:feed.id
                        }
                    }
                    axios
                    .post("http://localhost:8080/feedComment", data1, {withCredentials: true})
                    .then((response) => {
                        console.log("서버 응답: ", response.data);
                    })
                    .catch((error) => {
                        console.log("에러 발생: ", error);
                    });
                })
            }
        })
        
        //부모 자식 위치
        feedbody.appendChild(content_feed2);
        content_feed2.appendChild(content_feedheader);
        content_feedheader.appendChild(content_feedheader_left);
        content_feedheader_left.appendChild(content_feedheader_userPhoto);
        content_feedheader_left.appendChild(content_feedheader_a);
        content_feedheader_a.appendChild(content_feedheader_userId);
        content_feedheader_a.appendChild(content_feedheader_date);

        if(feed.user.userId == user.userId){
            content_feedheader.appendChild(content_feedheader_moreBtn);
            content_feedheader_moreBtn.appendChild(dot1);
            content_feedheader_moreBtn.appendChild(dot2);
            content_feedheader_moreBtn.appendChild(dot3);

            //더보기
            content_feedheader_moreBtn.addEventListener("click",()=>{
                document.querySelector(".content_feedMore").classList.remove("hiden");

                const content_feedMore_closeBtn = document.querySelector(".content_feedMore_closeBtn");
                content_feedMore_closeBtn.addEventListener("click",()=>{
                    document.querySelector(".content_feedMore").classList.add("hiden");
                })

                const content_feedMore_changeBtn = document.querySelector(".content_feedMore_changeBtn");
                content_feedMore_changeBtn.addEventListener("click",()=>{
                    document.querySelector(".content_updateFeed").classList.remove("hiden");
                    document.querySelector(".content_feed").classList.add("hiden");
                    document.querySelector(".content_feedMore").classList.add("hiden");

                    const content_updateFeed_userPhoto = document.querySelector(".content_updateFeed_userPhoto");
                    const content_updateFeed_myId = document.querySelector(".content_updateFeed_myId");

                    axios
                    .post("http://localhost:8080/sendUser", {userId: user.userId}, {withCredentials: true})
                    .then((response) => {
                        console.log("데이터: ", response.data);
                        content_updateFeed_userPhoto.src = response.data.profileImg;
                        content_updateFeed_myId.textContent = response.data.userId;
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                    //피드 수정
                    document.querySelector("#text-large2").addEventListener("change",(e)=>{
                        console.log(e.target.value);
                        text = e.target.value;
                    })

                    document.querySelector(".content_updateFeed_createBtn").addEventListener("click",()=>{
                        const data = {
                            user : {
                                userId: user.userId
                            },
                            text:text,
                            id:feed.id,
                            image:feed.image
                        }
                        axios
                        .put("http://localhost:8080/feed", data, {withCredentials: true})
                        .then((response) => {
                            console.log("서버 응답: ", response.data);
                            alert("성공적으로 전송되었습니다.");
                            location.reload();
                        })
                        .catch((error) => {
                            console.log("에러 발생: ", error);
                            alert("에러가 발생했습니다.");
                        
                        })
                    })
                    

                })

                const content_feedMore_delete = document.querySelector(".content_feedMore_delete");
                content_feedMore_delete.addEventListener("click", () => {
                    axios
                    .post("http://localhost:8080/deleteFeed", { id: feed.id }, { withCredentials: true })
                    .then((response) => {
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error) => {
                        console.log("에러: ", error);
                    });
                });
                const content_feedMore_likeCheck = document.querySelector(".content_feedMore_likeCheck");
                content_feedMore_likeCheck.addEventListener("click",()=>{
                    document.querySelector(".content_feedMore_likeList").classList.remove("hiden");

                    const content_feedMore_likeList_closeBtn = document.querySelector(".content_feedMore_likeList_closeBtn");
                    content_feedMore_likeList_closeBtn.addEventListener("click",()=>{
                        document.querySelector(".content_feedMore_likeList").classList.add("hiden");
                    })

                    
                    axios
                    .post("http://localhost:8080/getFeedLike", {id:feed.id}, {withCredentials:true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        const likebody = document.querySelector(".content_feedMore_like")
                        response.data.forEach(like => {
                            likebody.innerHTML = "";
                        // const likebody = document.querySelector(".content_feedMore_like");
                        
                        //태그 요소
                        const content_feedMore_like = document.createElement("div");
                        const content_feedMore_like_userPhoto = document.createElement("img");
                        const content_feedMore_like_userId = document.createElement("div");
                        
                        //클래스 이름
                        content_feedMore_like.classList.add("content_feedMore_like");
                        content_feedMore_like_userPhoto.classList.add("content_feedMore_like_userPhoto");
                        content_feedMore_like_userId.classList.add("content_feedMore_like_userId");

                        //태그 속성
                        content_feedMore_like_userPhoto.src = like.user.profileImg;
                        content_feedMore_like_userId.textContent = like.user.userId;

                        //부모자식
                        likebody.appendChild(content_feedMore_like_userPhoto);
                        likebody.appendChild(content_feedMore_like_userId);

                        });
                        
                    })
                    .catch((error)=>{
                        console.log("에러: ", error);
                    })
                })

            })
        }

        //부모 자식 위치
        feedbody.appendChild(content_feed2);
        content_feed2.appendChild(content_feedheader);
        content_feedheader.appendChild(content_feedheader_left);
        content_feedheader_left.appendChild(content_feedheader_userPhoto);
        content_feedheader_left.appendChild(content_feedheader_a);
        content_feedheader_a.appendChild(content_feedheader_userId);
        content_feedheader_a.appendChild(content_feedheader_date);
        content_feedheader.appendChild(content_feedheader_moreBtn);
        content_feedheader_moreBtn.appendChild(dot1);
        content_feedheader_moreBtn.appendChild(dot2);
        content_feedheader_moreBtn.appendChild(dot3);
        content_feed2.appendChild(content_feedPhoto);
        content_feed2.appendChild(content_feedfooter);
        content_feedfooter.appendChild(content_feedfooter_left);
        content_feedfooter_left.appendChild(content_feedfooter_text);
        content_feedfooter.appendChild(content_feedfooter_right);
        content_feedfooter_right.appendChild(content_feedfooter_likeBtn);
        content_feedfooter_right.appendChild(content_feedfooter_like);
        content_feedfooter_right.appendChild(content_feedfooter_commentBtn);
        content_feedfooter_right.appendChild(content_feedfooter_comment);
        content_feedfooter_right.appendChild(content_feedfooter_scrapBtn);
        
    }
}
function displayMyFeed(data){
    const feedbody = document.querySelector(".content_myFeed_myfeeds");
    data.forEach((feed)=>{
        console.log(feed);
        //태그 요소 생성
        const content_myFeed_feed = document.createElement("img");
        
        //클래스 이름
        content_myFeed_feed.classList.add("content_myFeed_feed");
        
       //태그 속성
       content_myFeed_feed.src = feed.image;

       content_myFeed_feed.addEventListener("click",()=>{

            document.querySelector(".content_myFeed").classList.add("hiden");
            document.querySelector(".content_feed2").classList.remove("hiden");
            console.log(feed);
            renderFeed(feed);
            
        })
        
        //부모 자식 위치
        feedbody.appendChild(content_myFeed_feed);

        })

    function renderFeed(feed){
        console.log(feed);
        const feedbody = document.querySelector(".content_feed2");
        feedbody.innerHTML = "";
    
        const content_feed2 = document.createElement("div");
        const content_feedheader = document.createElement("div");
        const content_feedheader_left = document.createElement("div");
        const content_feedheader_userPhoto = document.createElement("img");
        const content_feedheader_userId = document.createElement("div");
        const content_feedheader_date = document.createElement("div");
        const content_feedheader_moreBtn = document.createElement("div");
        const dot1 = document.createElement("div");
        const dot2 = document.createElement("div");
        const dot3 = document.createElement("div");
        const content_feedPhoto = document.createElement("img");
        const content_feedfooter = document.createElement("div");
        const content_feedfooter_left = document.createElement("div");
        const content_feedfooter_text = document.createElement("div");
        const content_feedfooter_right = document.createElement("div");
        const content_feedfooter_likeBtn = document.createElement("img");
        const content_feedfooter_like = document.createElement("div");
        const content_feedfooter_commentBtn = document.createElement("img");
        const content_feedfooter_comment = document.createElement("div");
        const content_feedfooter_scrapBtn = document.createElement("img");
        const content_feedheader_a = document.createElement("div");
        //클래스 이름
        content_feed2.classList.add("content_feed2");
        content_feedheader.classList.add("content_feedheader");
        content_feedheader_left.classList.add("content_feedheader_left");
        content_feedheader_userPhoto.classList.add("content_feedheader_userPhoto");
        content_feedheader_userId.classList.add("content_feedheader_userId");
        content_feedheader_date.classList.add("content_feedheader_date");
        content_feedheader_moreBtn.classList.add("content_feedheader_moreBtn");
        dot1.classList.add("dot");
        dot2.classList.add("dot");
        dot3.classList.add("dot");
        content_feedPhoto.classList.add("content_feedPhoto");
        content_feedfooter.classList.add("content_feedfooter");
        content_feedfooter_left.classList.add("content_feedfooter_left");
        content_feedfooter_text.classList.add("content_feedfooter_text");
        content_feedfooter_right.classList.add("content_feedfooter_right");
        content_feedfooter_likeBtn.classList.add("content_feedfooter_likeBtn");
        content_feedfooter_like.classList.add("content_feedfooter_like");
        content_feedfooter_commentBtn.classList.add("content_feedfooter_commentBtn");
        content_feedfooter_comment.classList.add("content_feedfooter_comment");
        content_feedfooter_scrapBtn.classList.add("content_feedfooter_scrapBtn");
        
       //태그 속성
        axios
        .post("http://localhost:8080/numberOfFeedLike", {id:feed.id}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            content_feedfooter_like.textContent = response.data;
    
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
        axios
        .post("http://localhost:8080/numberOfFeedComment", {id:feed.id}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            content_feedfooter_comment.textContent = response.data;
    
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
    
        //좋아요버튼
        axios
        .post("http://localhost:8080/checkFeedLikeClick", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            if(response.data == true){
                content_feedfooter_likeBtn.src = "/img/redheart.png";
                //조아요 취소
                content_feedfooter_likeBtn.addEventListener("click", ()=>{
                    axios
                    .delete("http://localhost:8080/feedLike", {data:{feed:{id:feed.id },user:{userId:user.userId }}, withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }else{
                content_feedfooter_likeBtn.src = "/img/heart.png";
                //조아요
                content_feedfooter_likeBtn.addEventListener("click", ()=>{
                    axios
                    .post("http://localhost:8080/feedLike", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
        //스크랩버튼
        axios
        .post("http://localhost:8080/checkFeedScrapClick", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
        .then((response)=>{
            console.log("데이터: ", response.data);
            if(response.data == true){
                content_feedfooter_scrapBtn.src = "/img/blackbookmark.png";
                //스크랩취소
                content_feedfooter_scrapBtn.addEventListener("click",()=>{
                    axios
                    .delete("http://localhost:8080/feedScrap", {data:{feed:{id:feed.id },user:{userId:user.userId }}, withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }else{
                content_feedfooter_scrapBtn.src = "/img/bookmark.png";
                content_feedfooter_scrapBtn.addEventListener("click",()=>{
                    axios
                    .post("http://localhost:8080/feedScrap", {feed:{id:feed.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })
                })
            }
        })
        .catch((error)=>{
            console.log("에러발생: ", error);
        })
 
        content_feedheader_userPhoto.src = feed.user.profileImg;
        content_feedheader_userId.textContent = feed.user.userId;
        content_feedheader_date.textContent = feed.createdAt;
        content_feedPhoto.src = feed.image;
        content_feedfooter_text.textContent = feed.text;
    
        content_feedfooter_commentBtn.src = "/img/comment.png";
        
        content_feedfooter_commentBtn.addEventListener("click",()=>{
            document.querySelector(".content_feedcommentbox").classList.remove("hiden");
            axios
            .post("http://localhost:8080/getFeedComment", {id:feed.id}, {withCredentials:true})
            .then((response)=>{
                console.log("데이터: ", response.data);
                displayComments(response.data);
            })
            .catch((error)=>{
                console.log("에러발생: ", error);
            })

            function displayComments(data){
                const commentFooter = document.querySelector(".content_feedcomment_footer");
                commentFooter.innerHTML = ''

                const commentText = document.createElement("textarea");
                commentText.id = "commentText"
                commentText.placeholder = "댓글을 작성하세요"

                const content_feedcomment_forwardBtn = document.createElement("div");
                content_feedcomment_forwardBtn.classList.add("content_feedcomment_forwardBtn")
                content_feedcomment_forwardBtn.textContent = "댓글달기"

                commentFooter.appendChild(commentText);
                commentFooter.appendChild(content_feedcomment_forwardBtn);
                

                const commentBody = document.querySelector(".content_feedcomment_body");
                commentBody.innerHTML = ''; // 기존 댓글 초기화
                data.forEach((comment)=>{
                    //태그 요소 생성
                    const content_feedcomment = document.createElement("div");
                    const content_feedcomment_userPhoto = document.createElement("img");
                    const content_feedcomment_user = document.createElement("div");
                    const content_feedcomment_userId = document.createElement("div");
                    const content_feedcomment_text = document.createElement("div");
                    const content_feedcomment_right = document.createElement("div");
                    const content_feedcomment_likeBtn = document.createElement("img");
                    const content_feedcomment_like = document.createElement("div");
                    const content_feedcomment_deleteComment = document.createElement("img");
                    
                    //클래스 이름
                    content_feedcomment.classList.add("content_feedcomment");
                    content_feedcomment_userPhoto.classList.add("content_feedcomment_userPhoto");
                    content_feedcomment_user.classList.add("content_feedcomment_user");
                    content_feedcomment_userId.classList.add("content_feedcomment_userId");
                    content_feedcomment_text.classList.add("content_feedcomment_text");
                    content_feedcomment_right.classList.add("content_feedcomment_right");
                    content_feedcomment_likeBtn.classList.add("content_feedcomment_likeBtn");
                    content_feedcomment_like.classList.add("content_feedcomment_like");
                    content_feedcomment_deleteComment.classList.add("content_feedcomment_deleteComment");
                    //태그속성
                    content_feedcomment_userPhoto.src = comment.user.profileImg;
                    content_feedcomment_userId.textContent = comment.user.userId;
                    content_feedcomment_text.textContent = comment.text;

                    
                    //댓글 좋아요 개수
                    axios
                    .post("http://localhost:8080/numberOfFeedCommentLike", {id:comment.id}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        content_feedcomment_like.textContent = response.data;
                    
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                     //좋아요버튼
                    axios
                    .post("http://localhost:8080/checkFeedCommentLikeClick", {feedComment:{id:comment.id}, user:{userId: user.userId}}, {withCredentials: true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        if(response.data == true){
                            content_feedcomment_likeBtn.src = "/img/redheart.png";
                            //조아요 취소
                            content_feedcomment_likeBtn.addEventListener("click", ()=>{
                                axios
                                .delete("http://localhost:8080/feedCommentLike", {data:{feedComment:{id:comment.id },user:{userId:user.userId }}, withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                        }else{
                            content_feedcomment_likeBtn.src = "/img/heart.png";
                            //조아요
                            content_feedcomment_likeBtn.addEventListener("click", ()=>{
                                axios
                                .post("http://localhost:8080/feedCommentLike", {feedComment:{id:comment.id}, user:{userId: user.userId}}, {withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                        }
                        

                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                    
                    
                    //부모자식설정
                    commentBody.appendChild(content_feedcomment);
                    content_feedcomment.appendChild(content_feedcomment_userPhoto);
                    content_feedcomment.appendChild(content_feedcomment_user);
                    content_feedcomment_user.appendChild(content_feedcomment_userId);
                    content_feedcomment_user.appendChild(content_feedcomment_text);
                    content_feedcomment.appendChild(content_feedcomment_right);
                    content_feedcomment_right.appendChild(content_feedcomment_likeBtn);
                    content_feedcomment_right.appendChild(content_feedcomment_like);

                    if(comment.user.userId == user.userId){
                        content_feedcomment_deleteComment.src = "/img/closeBtn.png";
                        content_feedcomment_right.appendChild(content_feedcomment_deleteComment);

                        //댓글 삭제버튼
                        content_feedcomment_deleteComment.addEventListener("click",()=>{
                            axios
                            .post("http://localhost:8080/feedCommentLikeByFeedComment", {id:comment.id}, {withCredentials:true})
                            .then((response)=> {
                                console.log("데이터: ", response.data);
                                axios
                                .post("http://localhost:8080/deleteFeedComment", {id:comment.id}, {withCredentials: true})
                                .then((response)=>{
                                    console.log("데이터: ", response.data);
                                    location.reload();
                                })
                                .catch((error)=>{
                                    console.log("에러발생: ", error);
                                })
                            })
                            .catch((error)=>{
                                console.log("에러발생: ", error)
                            })
                            
                        })
                    }
                })
                document.querySelector("#commentText").addEventListener("change",(e)=>{
                    console.log(e.target.value);
                    text = e.target.value;
                })
                
                document.querySelector(".content_feedcomment_forwardBtn").addEventListener("click",()=>{
                    const data1 = {
                        user : {
                            userId: user.userId
                        },
                        text:text,
                        feed : {
                            id:feed.id
                        }
                    }
                    axios
                    .post("http://localhost:8080/feedComment", data1, {withCredentials: true})
                    .then((response) => {
                        console.log("서버 응답: ", response.data);
                    })
                    .catch((error) => {
                        console.log("에러 발생: ", error);
                    });
                })
            }
        })
        
        //부모 자식 위치
        feedbody.appendChild(content_feed2);
        content_feed2.appendChild(content_feedheader);
        content_feedheader.appendChild(content_feedheader_left);
        content_feedheader_left.appendChild(content_feedheader_userPhoto);
        content_feedheader_left.appendChild(content_feedheader_a);
        content_feedheader_a.appendChild(content_feedheader_userId);
        content_feedheader_a.appendChild(content_feedheader_date);

        if(feed.user.userId == user.userId){
            content_feedheader.appendChild(content_feedheader_moreBtn);
            content_feedheader_moreBtn.appendChild(dot1);
            content_feedheader_moreBtn.appendChild(dot2);
            content_feedheader_moreBtn.appendChild(dot3);

            //더보기
            content_feedheader_moreBtn.addEventListener("click",()=>{
                document.querySelector(".content_feedMore").classList.remove("hiden");

                const content_feedMore_closeBtn = document.querySelector(".content_feedMore_closeBtn");
                content_feedMore_closeBtn.addEventListener("click",()=>{
                    document.querySelector(".content_feedMore").classList.add("hiden");
                })

                const content_feedMore_changeBtn = document.querySelector(".content_feedMore_changeBtn");
                content_feedMore_changeBtn.addEventListener("click",()=>{
                    document.querySelector(".content_updateFeed").classList.remove("hiden");
                    document.querySelector(".content_feed").classList.add("hiden");
                    document.querySelector(".content_feedMore").classList.add("hiden");

                    const content_updateFeed_userPhoto = document.querySelector(".content_updateFeed_userPhoto");
                    const content_updateFeed_myId = document.querySelector(".content_updateFeed_myId");

                    axios
                    .post("http://localhost:8080/sendUser", {userId: user.userId}, {withCredentials: true})
                    .then((response) => {
                        console.log("데이터: ", response.data);
                        content_updateFeed_userPhoto.src = response.data.profileImg;
                        content_updateFeed_myId.textContent = response.data.userId;
                    })
                    .catch((error)=>{
                        console.log("에러발생: ", error);
                    })

                    //피드 수정
                    document.querySelector("#text-large2").addEventListener("change",(e)=>{
                        console.log(e.target.value);
                        text = e.target.value;
                    })

                    document.querySelector(".content_updateFeed_createBtn").addEventListener("click",()=>{
                        const data = {
                            user : {
                                userId: user.userId
                            },
                            text:text,
                            id:feed.id,
                            image:feed.image
                        }
                        axios
                        .put("http://localhost:8080/feed", data, {withCredentials: true})
                        .then((response) => {
                            console.log("서버 응답: ", response.data);
                            alert("성공적으로 전송되었습니다.");
                            location.reload();
                        })
                        .catch((error) => {
                            console.log("에러 발생: ", error);
                            alert("에러가 발생했습니다.");
                        
                        })
                    })
                    

                })

                const content_feedMore_delete = document.querySelector(".content_feedMore_delete");
                content_feedMore_delete.addEventListener("click", () => {
                    axios
                    .post("http://localhost:8080/deleteFeed", { id: feed.id }, { withCredentials: true })
                    .then((response) => {
                        console.log("데이터: ", response.data);
                        location.reload();
                    })
                    .catch((error) => {
                        console.log("에러: ", error);
                    });
                });
                const content_feedMore_likeCheck = document.querySelector(".content_feedMore_likeCheck");
                content_feedMore_likeCheck.addEventListener("click",()=>{
                    document.querySelector(".content_feedMore_likeList").classList.remove("hiden");

                    const content_feedMore_likeList_closeBtn = document.querySelector(".content_feedMore_likeList_closeBtn");
                    content_feedMore_likeList_closeBtn.addEventListener("click",()=>{
                        document.querySelector(".content_feedMore_likeList").classList.add("hiden");
                    })

                    
                    axios
                    .post("http://localhost:8080/getFeedLike", {id:feed.id}, {withCredentials:true})
                    .then((response)=>{
                        console.log("데이터: ", response.data);
                        const likebody = document.querySelector(".content_feedMore_like")
                        response.data.forEach(like => {
                        likebody.innerHTML = "";
                        // const likebody = document.querySelector(".content_feedMore_like");
                        
                        //태그 요소
                        const content_feedMore_like = document.createElement("div");
                        const content_feedMore_like_userPhoto = document.createElement("img");
                        const content_feedMore_like_userId = document.createElement("div");
                        
                        //클래스 이름
                        content_feedMore_like.classList.add("content_feedMore_like");
                        content_feedMore_like_userPhoto.classList.add("content_feedMore_like_userPhoto");
                        content_feedMore_like_userId.classList.add("content_feedMore_like_userId");

                        //태그 속성
                        content_feedMore_like_userPhoto.src = like.user.profileImg;
                        content_feedMore_like_userId.textContent = like.user.userId;

                        //부모자식
                        likebody.appendChild(content_feedMore_like_userPhoto);
                        likebody.appendChild(content_feedMore_like_userId);

                        });
                        
                    })
                    .catch((error)=>{
                        console.log("에러: ", error);
                    })
                })

            })
        }

        //부모 자식 위치
        feedbody.appendChild(content_feed2);
        content_feed2.appendChild(content_feedheader);
        content_feedheader.appendChild(content_feedheader_left);
        content_feedheader_left.appendChild(content_feedheader_userPhoto);
        content_feedheader_left.appendChild(content_feedheader_a);
        content_feedheader_a.appendChild(content_feedheader_userId);
        content_feedheader_a.appendChild(content_feedheader_date);
        content_feedheader.appendChild(content_feedheader_moreBtn);
        content_feedheader_moreBtn.appendChild(dot1);
        content_feedheader_moreBtn.appendChild(dot2);
        content_feedheader_moreBtn.appendChild(dot3);
        content_feed2.appendChild(content_feedPhoto);
        content_feed2.appendChild(content_feedfooter);
        content_feedfooter.appendChild(content_feedfooter_left);
        content_feedfooter_left.appendChild(content_feedfooter_text);
        content_feedfooter.appendChild(content_feedfooter_right);
        content_feedfooter_right.appendChild(content_feedfooter_likeBtn);
        content_feedfooter_right.appendChild(content_feedfooter_like);
        content_feedfooter_right.appendChild(content_feedfooter_commentBtn);
        content_feedfooter_right.appendChild(content_feedfooter_comment);
        content_feedfooter_right.appendChild(content_feedfooter_scrapBtn);
        
    }
}
function displayFollower(data){
    const follower = document.querySelector(".content_follower_follower");
    follower.innerHTML = "";
    data.forEach((follow)=>{
        console.log(follower);

        const content_follower_left = document.createElement("div");
        const content_follower_userPhoto = document.createElement("img");
        const content_follower_user = document.createElement("div");
        const content_follower_userId = document.createElement("div");
        const content_follower_userName = document.createElement("div");
        const content_follower_right = document.createElement("div");
        const content_follower_deleteFollower = document.createElement("div");

        content_follower_left.classList.add("content_follower_left");
        content_follower_userPhoto.classList.add("content_follower_userPhoto");
        content_follower_user.classList.add("content_follower_user");
        content_follower_userId.classList.add("content_follower_userId");
        content_follower_userName.classList.add("content_follower_userName");
        content_follower_right.classList.add("content_follower_right");
        content_follower_deleteFollower.classList.add("content_follower_deleteFollower");

        content_follower_userPhoto.src = follow.user2.profileImg;
        content_follower_userId.textContent = follow.user2.userId;
        content_follower_userName.textContent = follow.user2.userName;
        content_follower_deleteFollower.textContent = "삭제";
        content_follower_deleteFollower.addEventListener("click",()=>{
            axios
            .delete("/userFollow", {data:{ id: follow.id }}, {withCredentials: true})
            .then((response) => {
                console.log("데이터: ", response.data);

            })
            .catch((error)=>{
                console.log("에러발생: ", error);
            })
        })

        follower.appendChild(content_follower_left);
        content_follower_left.appendChild(content_follower_userPhoto);
        content_follower_left.appendChild(content_follower_user);
        content_follower_user.appendChild(content_follower_userId);
        content_follower_user.appendChild(content_follower_userName);
        follower.appendChild(content_follower_right);
        content_follower_right.appendChild(content_follower_deleteFollower);
    })
}
function displayFollowing(data){
    const following = document.querySelector(".content_following_following");
    following.innerHTML = "";
    data.forEach((follow)=>{
        console.log(following);
        
        const content_following_left = document.createElement("div");
        const content_following_userPhoto = document.createElement("img");
        const content_following_user = document.createElement("div");
        const content_following_userId = document.createElement("div");
        const content_following_userName = document.createElement("div");
        const content_following_right = document.createElement("div");
        const content_following_deleteFollowing = document.createElement("div");

        content_following_left.classList.add("content_following_left");
        content_following_userPhoto.classList.add("content_following_userPhoto");
        content_following_user.classList.add("content_following_user");
        content_following_userId.classList.add("content_following_userId");
        content_following_userName.classList.add("content_following_userName");
        content_following_right.classList.add("content_following_right");
        content_following_deleteFollowing.classList.add("content_following_deleteFollowing");

        content_following_userPhoto.src = follow.user.profileImg;
        content_following_userId.textContent = follow.user.userId;
        content_following_userName.textContent = follow.user.userName;
        content_following_deleteFollowing.textContent = "삭제";
        content_following_deleteFollowing.addEventListener("click",()=>{
            axios
            .delete("/userFollow", {data:{ id: follow.id }}, {withCredentials: true})
            .then((response) => {
                console.log("데이터: ", response.data);
                

            })
            .catch((error)=>{
                console.log("에러발생: ", error);
            })
        })

        following.appendChild(content_following_left);
        content_following_left.appendChild(content_following_userPhoto);
        content_following_left.appendChild(content_following_user);
        content_following_user.appendChild(content_following_userId);
        content_following_user.appendChild(content_following_userName);
        following.appendChild(content_following_right);
        content_following_right.appendChild(content_following_deleteFollowing); 
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

            // if(user.authority.authorityName == "ROLE_ADMIN"){
            //     document.querySelector(".admin_page_move").classList.remove("hiden")
            //     console.log("admin")
            // }else{
            //     console.log("none")
            // }
        }
    })
    .catch((error)=>{
        console.log("에러 발생: ", error);
        alert("로그인해주세요.");
    })
};

sessionCurrent();