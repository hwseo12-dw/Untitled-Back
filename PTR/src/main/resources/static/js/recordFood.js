document.addEventListener("DOMContentLoaded", function () {
  // 현재 날짜를 가져와서 포맷을 설정합니다.
  const today = new Date();
  const formattedDate = `${today.getFullYear()}. ${String(
    today.getMonth() + 1
  ).padStart(2, "0")}. ${String(today.getDate()).padStart(2, "0")}`;
  document.querySelector(".content_date_text").textContent = formattedDate;

  const currentCalendarId = 1; // 현재 캘린더 ID를 설정합니다. 이 부분은 동적으로 변경할 수 있습니다.

  async function fetchMealPlan(calendar_id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/mealplan`, {
        params: { calendar_id },
      });
      const data = response.data;
      updateMealPlan(data);
    } catch (error) {
      console.error("Error fetching meal plan data:", error);
    }
  }

  function updateMealPlan(data) {
    // 각 매크로 영양소의 칼로리 값을 업데이트합니다.
    document.querySelector(
      ".circle-navy + .plan_value"
    ).textContent = `${data.carbohydrate} kcal`;
    document.querySelector(
      ".circle-yellow + .plan_value"
    ).textContent = `${data.protein} kcal`;
    document.querySelector(
      ".circle-white + .plan_value"
    ).textContent = `${data.fat} kcal`;

    // 상세 식단 계획을 업데이트합니다.
    const detailSections = parseDetail(data.detail);
    updateMealItems("#breakfast", detailSections.breakfast);
    updateMealItems("#lunch", detailSections.lunch);
    updateMealItems("#dinner", detailSections.dinner);
  }

  function parseDetail(detail) {
    const sections = detail.split(" ");
    return {
      breakfast: sections.slice(1, sections.indexOf("점심")).join(" "),
      lunch: sections
        .slice(sections.indexOf("점심") + 1, sections.indexOf("저녁"))
        .join(" "),
      dinner: sections.slice(sections.indexOf("저녁") + 1).join(" "),
    };
  }

  function updateMealItems(selector, items) {
    const mealItemsContainer = document.querySelector(
      selector + " .meal_items"
    );
    mealItemsContainer.innerHTML = "";
    items.split(",").forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("meal_item");
      div.innerHTML = `
          <div class="meal_image">
            <img src="https://img.icons8.com/?size=100&id=S0i3PPzA19Jx&format=png&color=000000" alt="${item}">
          </div>
          <div class="meal_text">${item}</div>
        `;
      mealItemsContainer.appendChild(div);
    });
  }

  fetchMealPlan(currentCalendarId);
});
