const urlNotice = "http://localhost:8080/findNotice";
const urlQna = "http://localhost:8080/findInquiry";

let dataList = [];
let pageCurrent = 1;
let pageEnd = 1;
const itemsPerPage = 10;

function getNotice() {
  document.querySelector(".head_subtitle").textContent = "홈 > 고객센터 > 공지사항";
  document.querySelector(".content_body_title h1").textContent = "공지사항";
  toggleFontWeight();
  axios.post(urlNotice)
  .then((response)=>{
    console.log("응답 Response: ", response);
    dataList = response.data;
    pageEnd = Math.ceil(dataList.length / itemsPerPage);
    displayPageNum();
    displayProducts(1);
  })
  .catch((error)=>{
    console.log("에러 발생: ", error);
  });
}

function getQna() {
  document.querySelector(".head_subtitle").textContent = "홈 > 고객센터 > Q&A";
  document.querySelector(".content_body_title h1").textContent = "Q&A";  
  toggleFontWeight();
  axios.get(urlQna)
  .then((response)=>{
    console.log("응답 Response: ", response);
    dataList = response.data;
    pageEnd = Math.ceil(dataList.length / itemsPerPage);
    displayPageNum();
    displayProducts(1);
  })
  .catch((error)=>{
    console.log("에러 발생: ", error);
  });
}

function displayProducts(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;
  const data = dataList.length > 0 ? dataList.filter((d,i)=>i>=startIndex && i<=endIndex) : [];
  console.log(data);
  if (data.length > 0) {
    const tbody = document.querySelector(".content_body_table tbody");
    tbody.innerHTML = "";
    const modal = document.querySelector(".modal");
    const modalTitle = document.querySelector(".modal_title");
    const modalWriter = document.querySelector(".modal_writer");
    const modalText = document.querySelector(".modal_text");
    const backdrop = document.querySelector(".backdrop");
    data.forEach((d, index)=>{
      // 태그 요소 생성
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      const title = document.createElement("td");
      const writer = document.createElement("td");
      const dTime = document.createElement("td");
      // 클래스이름 생성

      // 태그속성추가      
      id.textContent = ((page-1)*itemsPerPage) + index + 1;
      title.textContent = d.title;
      writer.textContent = d.user? d.user.userId : "관리자";
      dTime.textContent = formatPurchaseDate(d.createdAt);
      // appendChild 부모자식 위치 설정
      tr.appendChild(id);
      tr.appendChild(title);
      tr.appendChild(writer);
      tr.appendChild(dTime);
      tbody.appendChild(tr);

      tr.addEventListener('click', ()=>{
        modalTitle.textContent = d.title;
        modalWriter.textContent = d.user? d.user.userId : "관리자";
        modalText.innerHTML = d.text.replace(/\n/g, '<br>');
        modal.classList.remove("hidden");
        backdrop.classList.remove("hidden");
      })
    })
    document.querySelector(".close_btn").addEventListener('click', ()=>{
      modal.classList.add("hidden");
      backdrop.classList.add("hidden");
    })
    document.querySelector(".backdrop").addEventListener('click', ()=>{
      modal.classList.add("hidden");
      backdrop.classList.add("hidden");
    })
  }  
}

function formatPurchaseDate(purchaseTime) {
  const date = new Date(purchaseTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function toggleFontWeight() {
  const noticeBtn = document.querySelector(".notice_btn");
  noticeBtn.classList.contains("bold") ? noticeBtn.classList.remove("bold") : noticeBtn.classList.add("bold");
  const qnaBtn = document.querySelector(".qna_btn");
  qnaBtn.classList.contains("bold") ? qnaBtn.classList.remove("bold") : qnaBtn.classList.add("bold");
}

function displayPageNum() {
  const pages = document.querySelector(".content_body_page_num");
  pages.innerHTML = "";
  for(let i=0; i<pageEnd; i++) {
    const num = document.createElement("div");
    num.classList.add("num_box");
    num.textContent = i+1;
    pages.appendChild(num);
    num.addEventListener('click', ()=> {
      displayProducts(i+1);
      pageCurrent = i+1;
      changePageColor();
    });
  }
  changePageColor();
}

function changePageColor() {
  const boxes = document.querySelectorAll(".num_box");
  console.log(boxes);
  boxes.forEach((b,i)=>{
    if (i == pageCurrent-1) {
      b.style.backgroundColor = "#fec009";
    }else {
      b.style.backgroundColor = "#ffffff";
    }
  })
}

document.querySelector(".content_body_page_left").addEventListener('click', ()=>{
  pageCurrent = pageCurrent > 1 ? pageCurrent-1 : pageCurrent;
  console.log(pageCurrent);
  changePageColor();
  displayProducts(pageCurrent);
});
document.querySelector(".content_body_page_right").addEventListener('click', ()=>{
  pageCurrent = pageCurrent < pageEnd ? pageCurrent+1 : pageCurrent;
  console.log(pageCurrent);
  changePageColor();
  displayProducts(pageCurrent);
});

document.querySelector(".notice_btn").addEventListener('click', getNotice);
document.querySelector(".qna_btn").addEventListener('click', getQna);

getNotice();