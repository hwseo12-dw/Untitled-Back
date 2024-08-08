document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupButton = document.getElementById("signupButton");

  document.querySelector("#loginBtn").addEventListener("click", () => {
    const loginData = {
      userId: document.getElementById("userId").value,
      password: document.getElementById("password").value,
    };
    console.log(loginData);
    axios
      .post("http://localhost:8080/user/login", loginData)
      .then((response) => {
        if (response.status === 200) {
          alert("로그인 성공!");
          // window.location.href = "/ptr/main.html"; // 로그인 성공 시 메인 페이지로 리디렉션
          window.location.href = "/ptr/lecture.html";
        } else {
          alert("로그인 실패. 다시 시도해 주세요.");
        }
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        alert("로그인 중 오류가 발생했습니다.");
      });
    console.log("a");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginData = {
      userId: document.getElementById("userId").value,
      password: document.getElementById("password").value,
    };

    // 폼 데이터가 유효할 경우 서버로 전송하는 로직 추가
  });

  signupButton.addEventListener("click", function () {
    window.location.href = "signUp.html";
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  

  document.querySelector("#logoutButton").addEventListener("click", () => {
    axios
    .post("http://localhost:8080/user/logout")
    .then((response) => {
      if (response.status === 200) {
        alert("로그아웃 성공!");
        // window.location.href = "/ptr/main.html"; // 로그인 성공 시 메인 페이지로 리디렉션
        window.location.href = "/ptr/lecture.html";
      } else {
        alert("로그아웃 실패. 다시 시도해 주세요.");
      }
    })
    .catch((error) => {
      console.error("에러발생: ", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    });
    console.log("a");
  });
});







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

        const checkLogin = document.querySelector(".checkLogin");
        const head_subtitle = document.querySelector(".head_subtitle");
        if (user.userId === "anonymousUser") {
          checkLogin.textContent = "로그인"
          head_subtitle.textContent = "홈 > 로그인"
          document.querySelector("#loginForm").classList.remove("hidden")
          document.querySelector("#signupButton").classList.remove("hidden")
          document.querySelector("#logoutButton").classList.add("hidden")
        }else{
          checkLogin.textContent = "로그아웃"
          head_subtitle.textContent = "홈 > 로그아웃"
          document.querySelector("#loginForm").classList.add("hidden")
          document.querySelector("#signupButton").classList.add("hidden")
          document.querySelector("#logoutButton").classList.remove("hidden")
          document.querySelector(".logout_text").textContent = user.userId + "님 환영합니다."
        }
      }
  })
  .catch((error)=>{
      console.log("에러 발생: ", error);
      alert("로그인해주세요.");
  })
};

sessionCurrent();