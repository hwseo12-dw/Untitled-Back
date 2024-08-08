document.addEventListener("DOMContentLoaded", function () {
  let currentYear, currentMonth, currentDate;

  async function fetchEvents(date) {
    const response = await fetch(`/api/calendar/${date}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async function createEvent(event) {
    const response = await fetch("/api/calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async function deleteEvent(id) {
    const response = await fetch(`/api/calendar/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async function loadEvents(year, month, date) {
    const dateString = `${year}-${padZero(month)}-${padZero(date)}`;
    try {
      const events = await fetchEvents(dateString);
      console.log(events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      year: parseInt(params.get("year")),
      month: parseInt(params.get("month")),
      date: parseInt(params.get("date")),
    };
  }

  function padZero(num) {
    return num.toString().padStart(2, "0");
  }

  function updateDateDisplay(year, month, date) {
    document.querySelector(
      ".content_date_text"
    ).textContent = `${year}. ${padZero(month)}. ${padZero(date)}`;
  }

  function saveData() {
    const data = {
      intake: document.querySelectorAll(".plan_summary_item .plan_value")[0]
        .textContent,
      consumption: document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[1].textContent,
      water: document.querySelectorAll(".plan_summary_item .plan_value")[2]
        .textContent,
      weight: document.querySelectorAll(".plan_summary_item .plan_value")[3]
        .textContent,
      carbs: getItems("carbs"),
      proteins: getItems("proteins"),
      fats: getItems("fats"),
      exercise1: getItems("exercise1"),
      exercise2: getItems("exercise2"),
      exercise3: getItems("exercise3"),
      exercise4: getItems("exercise4"),
    };

    const dateKey = `${currentYear}-${padZero(currentMonth)}-${padZero(
      currentDate
    )}`;
    localStorage.setItem(dateKey, JSON.stringify(data));
  }

  function loadData(year, month, date) {
    const dateKey = `${year}-${padZero(month)}-${padZero(date)}`;
    const data = JSON.parse(localStorage.getItem(dateKey));

    if (data) {
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[0].textContent = data.intake || "0 kcal";
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[1].textContent = data.consumption || "0 kcal";
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[2].textContent = data.water || "0 L";
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[3].textContent = data.weight || "0 kg";
      setItems("carbs", data.carbs || []);
      setItems("proteins", data.proteins || []);
      setItems("fats", data.fats || []);
      setItems("exercise1", data.exercise1 || []);
      setItems("exercise2", data.exercise2 || []);
      setItems("exercise3", data.exercise3 || []);
      setItems("exercise4", data.exercise4 || []);
      updateSummaryValues(); // Load 후 섭취량 및 소모량 계산
    } else {
      // 기록이 없는 경우 초기화
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[0].textContent = "0 kcal";
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[1].textContent = "0 kcal";
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[2].textContent = "0 L";
      document.querySelectorAll(
        ".plan_summary_item .plan_value"
      )[3].textContent = "0 kg";
      setItems("carbs", []);
      setItems("proteins", []);
      setItems("fats", []);
      setItems("exercise1", []);
      setItems("exercise2", []);
      setItems("exercise3", []);
      setItems("exercise4", []);
      updateSummaryValues();
    }
  }

  function navigateToDate(year, month, date) {
    saveData();
    updateDateDisplay(year, month, date);
    loadData(year, month, date);
  }

  function prevDay() {
    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDate);
    currentDateObj.setDate(currentDateObj.getDate() - 1);

    currentYear = currentDateObj.getFullYear();
    currentMonth = currentDateObj.getMonth() + 1;
    currentDate = currentDateObj.getDate();

    navigateToDate(currentYear, currentMonth, currentDate);
  }

  function nextDay() {
    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDate);
    currentDateObj.setDate(currentDateObj.getDate() + 1);

    currentYear = currentDateObj.getFullYear();
    currentMonth = currentDateObj.getMonth() + 1;
    currentDate = currentDateObj.getDate();

    navigateToDate(currentYear, currentMonth, currentDate);
  }

  function registerItem(category) {
    const itemText = prompt("항목을 입력하세요:");
    if (itemText) {
      const container = document.getElementById(`${category}_items`);
      const itemElement = document.createElement("div");
      itemElement.classList.add("meal_item");
      const itemTextElement = document.createElement("span");
      itemTextElement.textContent = itemText;
      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.onclick = function () {
        itemElement.remove();
        updateSummaryValues();
        saveData();
      };
      itemElement.appendChild(itemTextElement);
      itemElement.appendChild(removeButton);
      container.appendChild(itemElement);
      updateSummaryValues();
      saveData();
    }
  }

  function updateWaterIntake() {
    const waterAmountElement = document.getElementById("waterAmount");
    const waterValue = waterAmountElement.textContent;

    const summaryWaterElement = document.querySelectorAll(
      ".plan_summary_item .plan_value"
    )[2];
    summaryWaterElement.textContent = `${waterValue} L`;

    saveData();
  }

  function updateWeight() {
    const weightInput = document.getElementById("weightInput").value;

    const summaryWeightElement = document.querySelectorAll(
      ".plan_summary_item .plan_value"
    )[3];
    summaryWeightElement.textContent = `${weightInput} kg`;

    saveData();
  }

  function getItems(category) {
    const items = [];
    document
      .querySelectorAll(`#${category}_items .meal_item`)
      .forEach((item) => {
        items.push(item.querySelector("span").textContent.trim());
      });
    return items;
  }

  function setItems(category, items) {
    const container = document.getElementById(`${category}_items`);
    container.innerHTML = "";
    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("meal_item");
      const itemTextElement = document.createElement("span");
      itemTextElement.textContent = item;
      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.onclick = function () {
        itemElement.remove();
        updateSummaryValues();
        saveData();
      };
      itemElement.appendChild(itemTextElement);
      itemElement.appendChild(removeButton);
      container.appendChild(itemElement);
    });
    updateSummaryValues(); // SetItems 후 섭취량 및 소모량 계산
  }

  function updateSummaryValues() {
    const carbs = getItems("carbs").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const proteins = getItems("proteins").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const fats = getItems("fats").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const totalIntake = carbs + proteins + fats;

    const exercise1 = getItems("exercise1").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const exercise2 = getItems("exercise2").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const exercise3 = getItems("exercise3").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const exercise4 = getItems("exercise4").reduce(
      (total, item) => total + parseFloat(item),
      0
    );
    const totalConsumption = exercise1 + exercise2 + exercise3 + exercise4;

    document.querySelectorAll(
      ".plan_summary_item .plan_value"
    )[0].textContent = `${totalIntake} kcal`;
    document.querySelectorAll(
      ".plan_summary_item .plan_value"
    )[1].textContent = `${totalConsumption} kcal`;
  }

  const queryParams = getQueryParams();
  currentYear = queryParams.year;
  currentMonth = queryParams.month;
  currentDate = queryParams.date;

  if (currentYear && currentMonth && currentDate) {
    updateDateDisplay(currentYear, currentMonth, currentDate);
    loadData(currentYear, currentMonth, currentDate);

    document
      .querySelector(".content_date_left")
      .addEventListener("click", prevDay);
    document
      .querySelector(".content_date_right")
      .addEventListener("click", nextDay);
  } else {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    currentDate = today.getDate();

    updateDateDisplay(currentYear, currentMonth, currentDate);
    loadData(currentYear, currentMonth, currentDate);
  }

  document.getElementById("decrease").addEventListener("click", function () {
    const waterAmountElement = document.getElementById("waterAmount");
    let currentValue = parseFloat(waterAmountElement.textContent);
    if (currentValue > 0) {
      waterAmountElement.textContent = (currentValue - 0.25).toFixed(2);
    }
  });

  document.getElementById("increase").addEventListener("click", function () {
    const waterAmountElement = document.getElementById("waterAmount");
    let currentValue = parseFloat(waterAmountElement.textContent);
    waterAmountElement.textContent = (currentValue + 0.25).toFixed(2);
  });

  document
    .querySelector(".water_intake button")
    .addEventListener("click", updateWaterIntake);
  document
    .querySelector(".weight button")
    .addEventListener("click", updateWeight);

  // 등록 버튼 이벤트 리스너 추가
  document.querySelectorAll(".meal_controls button").forEach((button) => {
    button.addEventListener("click", function () {
      const category = button.parentElement.parentElement.id;
      registerItem(category);
    });
  });

  // 탭 클릭 이벤트 리스너 추가
  document.querySelectorAll(".tabs ul li").forEach((tab) => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tabs ul li").forEach((tab) => {
        tab.classList.remove("active");
      });
      this.classList.add("active");

      document.querySelectorAll(".detail_section").forEach((section) => {
        section.classList.remove("active");
      });
      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });
});
