document.addEventListener("DOMContentLoaded", function () {
  const searchResults = document.getElementById("search-results");

  const searchTerm = getQueryParam("searchTerm");

  if (searchTerm) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        displaySearchResults(data.meals);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function displaySearchResults(meals) {
    searchResults.innerHTML = "";
    if (meals) {
      meals.forEach((meal) => {
        const resultCard = createResultCard(meal);
        searchResults.appendChild(resultCard);
      });
    } else {
      searchResults.innerHTML = "No results found.";
    }
  }

  function createResultCard(meal) {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");

    resultCard.innerHTML = `
    <div class="container-fluid">
     <div class="card meal-card" id="meal-card">
      <div class="result-img">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      </div>
      <div class="result-details">
        <h3>${meal.strMeal}</h3>
        <p class="result-category result1">Category: ${meal.strCategory}</p>
        <p class="result-ingredients result2">Ingredients: ${getIngredients(meal)}</p>
        <p class="result-instructions result3">Instructions: ${meal.strInstructions}</p>
      </div>
      </div>
      </div>
    `;

    return resultCard;
  }

  function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      }
    }
    return ingredients.join(", ");
  }
});
