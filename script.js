document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.getElementById("filter-form");
  const categorySelect = document.getElementById("category-select");
  const resultsContainer = document.getElementById("results-container");

  fetchFilterOptions();

  async function fetchFilterOptions() {
    try {
      const categoriesResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const categoriesData = await categoriesResponse.json();
      populateOptions(categorySelect, categoriesData.categories, "strCategory");
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  }

  function populateOptions(selectElement, data, key) {
    selectElement.innerHTML = '<option value="">Any</option>';
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item[key];
      option.textContent = item[key];
      selectElement.appendChild(option);
    });
  }

  filterForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const selectedCategory = categorySelect.value;

    let apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?";
    if (selectedCategory) {
      apiUrl += `c=${selectedCategory}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      displayFilteredResults(data.meals);
    } catch (error) {
      console.error("Error fetching filtered results:", error);
    }
  });

  function displayFilteredResults(meals) {
    resultsContainer.innerHTML = "";

    if (meals) {
      meals.forEach((meal) => {
        const resultCard = createResultCard(meal);
        resultsContainer.appendChild(resultCard);
      });
    } else {
      resultsContainer.innerHTML = "No results found.";
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
              </div>
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

// document.addEventListener("DOMContentLoaded", function () {
//   const filterForm = document.getElementById("filter-form");
//   const categorySelect = document.getElementById("category-select");
//   const ingredientSelect = document.getElementById("ingredient-select"); // New element for ingredient filter
//   const resultsContainer = document.getElementById("results-container");

//   // Fetch options for filters on page load
//   fetchFilterOptions();

//   async function fetchFilterOptions() {
//     try {
//       // Fetch options for categories
//       const categoriesResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
//       const categoriesData = await categoriesResponse.json();
//       populateOptions(categorySelect, categoriesData.categories, "strCategory");

//       // Fetch options for main ingredients
//       const ingredientsResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
//       const ingredientsData = await ingredientsResponse.json();
//       populateOptions(ingredientSelect, ingredientsData.meals, "strIngredient");
//     } catch (error) {
//       console.error("Error fetching filter options:", error);
//     }
//   }

//   function populateOptions(selectElement, data, key) {
//     selectElement.innerHTML = '<option value="">Any</option>';
//     data.forEach((item) => {
//       const option = document.createElement("option");
//       option.value = item[key];
//       option.textContent = item[key];
//       selectElement.appendChild(option);
//     });
//   }

//   filterForm.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const selectedCategory = categorySelect.value;
//     const selectedIngredient = ingredientSelect.value; // Get selected ingredient

//     // Construct API URL with selected filter criteria
//     let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?`;
//     if (selectedCategory) {
//       apiUrl += `c=${selectedCategory}&`;
//     }
//     if (selectedIngredient) {
//       apiUrl += `i=${selectedIngredient}`;
//     }

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       // Display filtered results
//       displayFilteredResults(data.meals);
//     } catch (error) {
//       console.error("Error fetching filtered results:", error);
//     }
//   });
    // Function to create a result card
 
//   function createResultCard(meal) {
//     const resultCard = document.createElement("div");
//     resultCard.classList.add("result-card");
    
//     resultCard.classList.add("mt-4");
//     resultCard.classList.add("card-body");

//     resultCard.innerHTML = `
//             <div class="meal-img" id="meal-img"><img class="img-fluid" src="${
//               meal.strMealThumb
//             } " alt="${meal.strMeal}" /></div>
//             <div class="meal-info text-center" id="meal-info">
//             <div class="meal-header">
//               <h2 class="card-title" id="meal-name"> ${meal.strMeal}</h2>
//               <p class="card-text " id="meal-category">Category: ${
//                 meal.strCategory
//               }</p>
//               </div>
//               <ul class="card-text" id="meal-ingredients">
//       ${getIngredientsList(meal)}
//     </ul>
//               <p class="card-text" id="meal-instructions"> ${
//                 meal.strInstructions
//               }</p> 
//       </div>
     
//     `;

//     return resultCard;
//   }

//   function getIngredientsList(meal) {
//     let ingredients = "";
//     for (let i = 1; i <= 20; i++) {
//       if (meal[`strIngredient${i}`]) {
//         ingredients += `<li>${meal[`strIngredient${i}`]} - ${
//           meal[`strMeasure${i}`]
//         }</li>`;
//       }
//     }
//     return ingredients;
//   }
// });
