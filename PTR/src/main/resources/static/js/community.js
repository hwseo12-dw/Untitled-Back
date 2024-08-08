document.addEventListener("DOMContentLoaded", function () {
  var sidebarLinks = document.querySelectorAll(".sidebar-link");
  var onlineStatusButton = document.getElementById("online-status");
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var section = event.target.getAttribute("data-section");
      alert("You clicked on the " + section + " link!");
    });
  });

  onlineStatusButton.addEventListener("click", function () {
    alert("최근 접속: 38분 전");
  });
});
