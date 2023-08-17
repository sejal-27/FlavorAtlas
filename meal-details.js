const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("mealId");

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then((response) => response.json())
  .then((data) => {
    const meal = data.meals[0];
    const mealDetailsContainer = document.getElementById(
      "meal-details-container"
    );
    mealDetailsContainer.innerHTML = `
          <div class="meal_detail_box">
          <div class="heading">
          <h1>${meal.strMeal}</h1></div>
          <div class="image">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          </div><div class="data_box"><p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        </div>
        </div>`;
  })
  .catch((error) => {
    console.error("Error fetching meal details:", error);
  });
