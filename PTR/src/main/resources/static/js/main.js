axios
.get("http://localhost:8080/findAllLecture")
.then((response)=>{
    console.log("데이터: ", response.data)
    const recentVideo = response.data.slice(0,3);
    console.log(recentVideo);
    displayRecientVideo(recentVideo);

})
.catch((error)=>{
    console.log("에러 발생: ", error)
})

function displayRecientVideo(recentVideo){
    const videos = document.querySelector(".videos");
    recentVideo.forEach((recentVideo)=>{
        const video = document.createElement("video");
        video.classList.add("video");
        video.src = recentVideo.url;
        videos.appendChild(video);

        video.addEventListener("click",()=>{
            window.location.href = "lectureView.html?id=" + recentVideo.id;
        })
    })
}

axios
.get("http://localhost:8080/getRecentFeed")
.then((response)=>{
    console.log("데이터: ", response.data)
    const recentFeed = response.data.slice(0,3);
    console.log(recentFeed);
    displayRecientFeed(recentFeed);
})
.catch((error)=>{
    console.log("에러 발생: ", error)
})

function displayRecientFeed(recentFeed){
    const feeds = document.querySelector(".feeds");
    recentFeed.forEach((recentFeed)=>{
        const feed = document.createElement("img");
        feed.classList.add("feed");
        feed.src = recentFeed.image;
        feeds.appendChild(feed);
    })
}