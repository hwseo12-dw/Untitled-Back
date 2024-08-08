document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signUpForm");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막음

    const signupData = {
      userId: document.getElementById("id").value,
      password: document.getElementById("password").value,
      userName: document.getElementById("name").value,
      userEmail: document.getElementById("email").value,
      birthday: document.getElementById("birthday").value,
    };

    console.log("a");

    axios
      .post("http://localhost:8080/signup", signupData)
      .then((response) => {
        console.log("데이터: ", response.data);
        if (response.status === 201) {
          alert("회원가입이 완료되었습니다!");
          window.location.href = "/ptr/login.html"; // 회원가입 성공 시 로그인 페이지로 리디렉션
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
        }
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  });
});
