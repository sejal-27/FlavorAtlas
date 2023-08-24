//JS hero section
let text = document.getElementById("text");

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  text.style.top = 40 + value * -0.85 + "%";
});
// carousel
// Fetch data and create carousel cards
document.addEventListener("DOMContentLoaded", function () {
  // Fetch data and create carousel cards for Vegetarian meals
  fetchAndCreateCards("Vegetarian", "card-carousel-1");

  // Fetch data and create carousel cards for Non-Vegetarian meals
  fetchAndCreateCards("Chicken", "card-carousel-2");

  // Fetch data and create carousel cards for Dessert meals
  fetchAndCreateCards("Dessert", "card-carousel-3");
});

function fetchAndCreateCards(category, carouselId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => {
      const carouselInner = document.querySelector(
        `#${carouselId} .carousel-inner`
      );
      carouselInner.innerHTML = "";

      data.meals.forEach((meal, index) => {
        const carouselItemClass =
          index === 0 ? "carousel-item active" : "carousel-item";
        const cardHtml = `
         <div class="${carouselItemClass} col-md-4 col-sm-6">
  <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <button class="btn btn-primary btn-sm view-details" data-mealid="${meal.idMeal}" data-bs-toggle="modal" data-bs-target="#mealModal">Get Recipe</button>
    </div>
  </div>
</div>

        `;
        carouselInner.innerHTML += cardHtml;
      });

      const viewDetailsButtons = document.querySelectorAll(
        `#${carouselId} .view-details`
      );
      viewDetailsButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const mealId = event.target.getAttribute("data-mealid");
          openMealModal(mealId);
        });
      });
    })
    .catch((error) => {
      console.error(`Error fetching ${category} API data:`, error);
    });
}

function removePrevModal() {
  const modalContent = document.querySelector(".modal-content");
  document.querySelector(".modal-content").classList.add("rollOut");
  setTimeout(() => {
    document.getElementById("modal-container").innerHTML = "";
  }, 500);
}

function openMealModal(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      const modalHtml = `
        <div class="modal fade " id="mealModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content d-flex flex-column">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
                <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close" onclick="removePrevModal()"></button>
              </div>
              <div class="modal-body d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row flex-xxl-row">
                <img src="${meal.strMealThumb}" class="meal-img" alt="${meal.strMeal}" />
                <div class="data  d-flex flex-column">
                  <p><strong>Category:</strong> ${meal.strCategory}</p>
                  <p><strong>Area:</strong> ${meal.strArea}</p>
                  <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const modalContainer = document.getElementById("modal-container");
      // modalContainer.innerHTML = "";
      modalContainer.innerHTML = modalHtml;

      const modal = new bootstrap.Modal(document.getElementById("mealModal"));
      modal.show();

      const modalContent = document.querySelector(".modal-content");
      modalContent.classList.add("rollIn");

      modal._element.addEventListener("hidden.bs.modal", function () {
        document.body.style.overflow = "auto";
        document.body.style.padding = 0; // Reset body overflow to default
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching meal details:", error);
    });
}

//loader
("use strict");

let toRadians = (deg) => (deg * Math.PI) / 180;
let map = (val, a1, a2, b1, b2) => b1 + ((val - a1) * (b2 - b1)) / (a2 - a1);

class Pizza {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    this.sliceCount = 6;
    this.sliceSize = 80;

    this.width =
      this.height =
      this.canvas.height =
      this.canvas.width =
        this.sliceSize * 2 + 50;
    this.center = (this.height / 2) | 0;

    this.sliceDegree = 360 / this.sliceCount;
    this.sliceRadians = toRadians(this.sliceDegree);
    this.progress = 0;
    this.cooldown = 10;
  }

  update() {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (--this.cooldown < 0)
      this.progress += this.sliceRadians * 0.01 + this.progress * 0.07;

    ctx.save();
    ctx.translate(this.center, this.center);

    for (let i = this.sliceCount - 1; i > 0; i--) {
      let rad;
      if (i === this.sliceCount - 1) {
        let ii = this.sliceCount - 1;

        rad = this.sliceRadians * i + this.progress;

        ctx.strokeStyle = "#FBC02D";
        cheese(ctx, rad, 0.9, ii, this.sliceSize, this.sliceDegree);
        cheese(ctx, rad, 0.6, ii, this.sliceSize, this.sliceDegree);
        cheese(ctx, rad, 0.5, ii, this.sliceSize, this.sliceDegree);
        cheese(ctx, rad, 0.3, ii, this.sliceSize, this.sliceDegree);
      } else rad = this.sliceRadians * i;

      // border
      ctx.beginPath();
      ctx.lineCap = "butt";
      ctx.lineWidth = 11;
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
      ctx.strokeStyle = "#F57F17";
      ctx.stroke();

      // slice
      let startX = this.sliceSize * Math.cos(rad);
      let startY = this.sliceSize * Math.sin(rad);
      let endX = this.sliceSize * Math.cos(rad + this.sliceRadians);
      let endY = this.sliceSize * Math.sin(rad + this.sliceRadians);
      let varriation = [0.9, 0.7, 1.1, 1.2];
      ctx.fillStyle = "#FBC02D";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(startX, startY);
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 0.3;
      ctx.stroke();

      // meat
      let x = this.sliceSize * 0.65 * Math.cos(rad + this.sliceRadians / 2);
      let y = this.sliceSize * 0.65 * Math.sin(rad + this.sliceRadians / 2);
      ctx.beginPath();
      ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI);
      ctx.fillStyle = "#D84315";
      ctx.fill();
    }

    ctx.restore();

    if (this.progress > this.sliceRadians) {
      ctx.translate(this.center, this.center);
      ctx.rotate((-this.sliceDegree * Math.PI) / 180);
      ctx.translate(-this.center, -this.center);

      this.progress = 0;
      this.cooldown = 20;
    }
  }
}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
  let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - 0.2);
  let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - 0.2);
  let x2 = sliceSize * multi * Math.cos(rad + 0.2);
  let y2 = sliceSize * multi * Math.sin(rad + 0.2);

  let csx = sliceSize * Math.cos(rad);
  let csy = sliceSize * Math.sin(rad);

  var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy));
  ctx.beginPath();
  ctx.lineCap = "round";

  let percentage = map(d, 15, 70, 1.2, 0.2);

  let tx = x1 + (x2 - x1) * percentage;
  let ty = y1 + (y2 - y1) * percentage;
  ctx.moveTo(x1, y1);
  ctx.lineTo(tx, ty);

  tx = x2 + (x1 - x2) * percentage;
  ty = y2 + (y1 - y2) * percentage;
  ctx.moveTo(x2, y2);
  ctx.lineTo(tx, ty);

  ctx.lineWidth = map(d, 0, 100, 20, 2);
  ctx.stroke();
}

let pizza = new Pizza("pizza");

(function update() {
  requestAnimationFrame(update);
  pizza.update();
})();
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("loading");
  const loadingOverlay = document.getElementById("loading-overlay");
  setTimeout(function () {
    loadingOverlay.style.display = "none";
    document.body.classList.remove("loading");
  }, 1500);
});

//searchbar
document.addEventListener("DOMContentLoaded", function () {
   const searchForm = document.getElementById("search-form");
   const searchInput = document.getElementById("search-input");
   searchForm.addEventListener("submit", function (event) {
     event.preventDefault();
     const searchTerm = searchInput.value.trim();
     if (searchTerm !== "") {
       // Navigate to the new page with the search term as a parameter
       window.location.href = `search-results.html?searchTerm=${encodeURIComponent(
         searchTerm
       )}`;
     }
   });
 });

//datalist
const suggestionsList = document.getElementById("suggestions");
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();

  if (query.length > 1) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();

    if (data.meals) {
      const mealNames = data.meals.map((meal) => meal.strMeal);
      populateSuggestions(mealNames);
    }
  } else {
    clearSuggestions();
  }
});

function populateSuggestions(suggestions) {
  suggestionsList.innerHTML = "";
  suggestions.forEach((suggestion) => {
    const option = document.createElement("option");
    option.value = suggestion;
    suggestionsList.appendChild(option);
  });
}

function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

// document.addEventListener("DOMContentLoaded", function () {
//   const searchForm = document.getElementById("search-form");
//   const searchInput = document.getElementById("search-input");

//   searchForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const searchTerm = searchInput.value;

//     if (searchTerm.trim() === "") {
//       return; // Don't proceed if search term is empty
//     }
//     // Redirect to the searchresult page with the search term as query parameter
//     window.location.href = `search-results.html?search=${encodeURIComponent(searchTerm)}`;
//   });
// });
