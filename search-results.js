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
        const resultItem = document.createElement("div");
        resultItem.classList.add("search-result");
        resultItem.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <h3>${meal.strMeal}</h3>
        `;
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = "No results found.";
    }
  }
});
