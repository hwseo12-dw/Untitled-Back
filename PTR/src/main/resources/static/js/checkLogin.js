function sessionCurrent(){
    const checkLogin = document.querySelector(".checkLogin");
    axios
    .get("http://localhost:8080/current", {withCredentials:true})
    .then((response)=>{
        console.log("데이터: ", response);
        if(response.status == 200){
            console.log("데이터: ", response.data);
            const userId = response.data.userId;
            const authority = response.data.authority[0].authority;

            const user = {
                userId: userId,
                authority: {authorityName: authority}
            }

            if (user.userId === "anonymousUser") {
                checkLogin.textContent = "로그인"
            }else{
                checkLogin.textContent = "로그아웃"
            }
            console.log("유저 정보: ", user);
        }
    })
    .catch((error)=>{
        console.log("에러 발생: ", error);
        alert("로그인해주세요.");
    })
};

sessionCurrent();