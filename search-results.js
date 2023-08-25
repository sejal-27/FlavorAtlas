document.addEventListener("DOMContentLoaded", async function () {
  const searchResults = document.getElementById("search-results");
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get("searchTerm"); // Use "searchTerm" instead of "search"

  if (!searchTerm) {
    searchResults.innerHTML = "No search term found.";
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();

    if (data.meals) {
      displaySearchResults(data.meals);
    } else {
      searchResults.innerHTML = "No results found.";
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }

  function displaySearchResults(meals) {
    searchResults.innerHTML = "";

    meals.forEach((meal) => {
      const resultCard = createResultCard(meal);
      searchResults.appendChild(resultCard);
    });
  }

  function createResultCard(mealData) {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");
    resultCard.classList.add("mt-4");
    resultCard.classList.add("card-body");
    resultCard.classList.add("d-flex");
    resultCard.classList.add("flex-column");
    resultCard.classList.add("flex-sm-row");
    resultCard.classList.add("flex-md-row");
    resultCard.classList.add("flex-lg-row");
    resultCard.classList.add("flex-xl-row");
        

    resultCard.innerHTML = `
      <div class="meal-img" style="background-image: url(${mealData.strMealThumb})"></div>
      <div class="meal-info text-center">
        <div class="meal-header">
          <h2 class="card-title ">${mealData.strMeal}</h2>
          <p class="card-text" id="meal-category">Category: ${mealData.strCategory}</p>
        </div>
        <ul class="card-text" id="meal-ingredients">
          ${getIngredientsList(mealData)}
        </ul>
        <p class="card-text" id="meal-instructions">${mealData.strInstructions}</p>
      </div>
    `;

    return resultCard;
  }

  function getIngredientsList(mealData) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (mealData[`strIngredient${i}`]) {
        ingredients += `<li>${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}</li>`;
      }
    }
    return ingredients;
  }
});
