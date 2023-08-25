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
    
    resultCard.classList.add("mt-4");
    resultCard.classList.add("card-body");

    resultCard.innerHTML = `
            <div class="meal-img" id="meal-img"><img class="img-fluid" src="${
              meal.strMealThumb
            } " alt="${meal.strMeal}" /></div>
            <div class="meal-info text-center" id="meal-info">
            <div class="meal-header">
              <h2 class="card-title" id="meal-name"> ${meal.strMeal}</h2>
              <p class="card-text " id="meal-category">Category: ${
                meal.strCategory
              }</p>
              </div>
              <ul class="card-text" id="meal-ingredients">
      ${getIngredientsList(meal)}
    </ul>
              <p class="card-text" id="meal-instructions"> ${
                meal.strInstructions
              }</p> 
      </div>
     
    `;

    return resultCard;
  }

  function getIngredientsList(meal) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li>${meal[`strIngredient${i}`]} - ${
          meal[`strMeasure${i}`]
        }</li>`;
      }
    }
    return ingredients;
  }
});
