// Create the loader element with the provided HTML structure and styles
function createLoader() {
  const loaderContainer = document.getElementById("loader-container");

  const loaderHtml = `
  <div id="loading-overlay">
    <div class="pan-loader">
      <div class="loader"></div>
      <div class="pan-container">
        <div class="pan"></div>
        <div class="handle"></div>
      </div>
      <div class="shadow"></div>
    </div>
    <div class="subtitle"> Please wait while we create a delicious meal for you :)</div> 
    </div>

  `;

  const loaderElement = document.createElement("div");
  loaderElement.innerHTML = loaderHtml;

  loaderContainer.appendChild(loaderElement);
}

// Remove the loader element
function removeLoader() {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.innerHTML = ""; // Remove all content from the container
}

// Display the loader for a specific duration and then remove it
function displayLoaderWithDuration(duration) {
  createLoader(); // Display the loader

  // Remove the loader after the specified duration
  setTimeout(() => {
    removeLoader();
  }, duration);
}

displayLoaderWithDuration(2000);

function fetchRandomMeal() {
  return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => data.meals[0]);
}

function updateMealCard(mealData) {
  const mealImg = document.getElementById("meal-img");
  const mealName = document.getElementById("meal-name");
  const mealCategory = document.getElementById("meal-category");
  const mealInstructions = document.getElementById("meal-instructions");
  const mealIngredients = document.getElementById("meal-ingredients"); 

  mealImg.style.backgroundImage = `url(${mealData.strMealThumb})`;
  mealName.textContent = mealData.strMeal;
  mealCategory.textContent = `Category: ${mealData.strCategory}`;
  mealInstructions.textContent = `Instructions: ${mealData.strInstructions}`;

  // Clear existing ingredients
  mealIngredients.innerHTML = "";
  mealIngredients.innerHTML="Ingredients:";
  // Loop through the ingredients and measures and add them to the list
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    if (ingredient && measure) {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${ingredient} - ${measure}`;
      mealIngredients.appendChild(ingredientItem);
    } else {
      break; // Exit the loop if ingredient or measure is empty
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loading-overlay");
  const mealCard = document.getElementById("meal-card");

  // Fetch and display a random meal on page load
  fetchRandomMeal()
    .then((mealData) => {
      updateMealCard(mealData);
      mealCard.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching random meal:", error);
    });

  // Fetch random meal when button is clicked
  const fetchRandomMealButton = document.getElementById("fetch-random-meal");
  fetchRandomMealButton.addEventListener("click", () => {
    loadingOverlay.style.display = "flex";

    // Fetch random meal data from the API
    fetchRandomMeal()
      .then((mealData) => {
        updateMealCard(mealData);
        loadingOverlay.style.display = "none";
        mealCard.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching random meal:", error);
        loadingOverlay.style.display = "none";
      });
  });
});
