document.addEventListener("DOMContentLoaded", function () {
  // 현재 날짜를 가져와서 포맷을 설정합니다.
  const today = new Date();
  const formattedDate = `${today.getFullYear()}. ${String(
    today.getMonth() + 1
  ).padStart(2, "0")}. ${String(today.getDate()).padStart(2, "0")}`;
  document.querySelector(".content_date_text").textContent = formattedDate;

  async function fetchExercisePlan(date) {
    try {
      const response = await axios.get(
        `http://localhost:8080/ptr/exerciseplan`,
        {
          params: { date },
        }
      );
      const data = response.data;
      updateExercisePlan(data);
    } catch (error) {
      console.error("Error fetching exercise plan data:", error);
    }
  }

  function updateExercisePlan(data) {
    updateExerciseItems("#cardio", data.cardio);
    updateExerciseItems("#strength", data.strength);
    updateExerciseItems("#stretching", data.stretching);
    updateExerciseItems("#yoga", data.yoga);
  }

  function updateExerciseItems(selector, items) {
    const exerciseItemsContainer = document.querySelector(
      selector + " .exercise_items"
    );
    exerciseItemsContainer.innerHTML = "";
    items.split(",").forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("exercise_item");
      div.textContent = item;
      exerciseItemsContainer.appendChild(div);
    });
  }

  fetchExercisePlan(formattedDate);
});
