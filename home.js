fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian").then(
  (data) => {
    console.log(data);
  }
);
//JS hero section
let text = document.getElementById("text");

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  text.style.top = 40 + value * -0.85 + "%";
});
//carousel
// Fetch the API data for Vegetarian meals
// Fetch data and create carousel cards
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian")
  .then((response) => response.json())
  .then((data) => {
    const carouselInner = document.querySelector(
      "#card-carousel-1 .carousel-inner"
    );

    // Clear any existing content
    carouselInner.innerHTML = "";

    // Loop through the meals and create carousel cards
    data.meals.forEach((meal, index) => {
      const carouselItemClass =
        index === 0 ? "carousel-item active" : "carousel-item";
      const cardHtml = `
        <div class="${carouselItemClass}">
          <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Meal ID: ${meal.idMeal}</p>
              <button class="btn btn-primary btn-sm view-details" data-mealid="${meal.idMeal}" data-bs-toggle="modal" data-bs-target="#mealModal">View Details</button>
            </div>
          </div>
        </div>
      `;
      carouselInner.innerHTML += cardHtml;
    });

    // Attach click event listener to the "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll(".view-details");
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const mealId = event.target.getAttribute("data-mealid");
        // Call a function to show the modal with meal details using the mealId
        openMealModal(mealId);
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching API data:", error);
  });

// Function to show modal with meal details
function openMealModal(mealId) {
  // Fetch meal details using the mealId
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      // Create modal content using the fetched data
      const modalHtml = `
        <div class="modal fade" id="mealModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
              </div>
              <div class="modal-body">
                <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}" />
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
      // Add the modal content to the modal container
      const modalContainer = document.getElementById("modal-container");
      modalContainer.innerHTML = modalHtml;

      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById("mealModal"));
      modal.show();
    })
    .catch((error) => {
      console.error("Error fetching meal details:", error);
    });
}

// Fetch the API data for Non- Vegetarian meals
// Fetch data and create carousel cards
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
  .then((response) => response.json())
  .then((data) => {
    const carouselInner = document.querySelector(
      "#card-carousel-2 .carousel-inner"
    );

    // Clear any existing content
    carouselInner.innerHTML = "";

    // Loop through the meals and create carousel cards
    data.meals.forEach((meal, index) => {
      const carouselItemClass =
        index === 0 ? "carousel-item active" : "carousel-item";
      const cardHtml = `
        <div class="${carouselItemClass}">
          <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Meal ID: ${meal.idMeal}</p>
              <button class="btn btn-primary btn-sm view-details" data-mealid="${meal.idMeal}" data-bs-toggle="modal" data-bs-target="#mealModal">View Details</button>
            </div>
          </div>
        </div>
      `;
      carouselInner.innerHTML += cardHtml;
    });

    // Attach click event listener to the "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll(".view-details");
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const mealId = event.target.getAttribute("data-mealid");
        // Call a function to show the modal with meal details using the mealId
        openMealModal(mealId);
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching API data:", error);
  });

// Function to show modal with meal details
function openMealModal(mealId) {
  // Fetch meal details using the mealId
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      // Create modal content using the fetched data
      const modalHtml = `
        <div class="modal fade" id="mealModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
              </div>
              <div class="modal-body">
                <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}" />
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
      // Add the modal content to the modal container
      const modalContainer = document.getElementById("modal-container");
      modalContainer.innerHTML = modalHtml;

      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById("mealModal"));
      modal.show();
    })
    .catch((error) => {
      console.error("Error fetching meal details:", error);
    });
}

// fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
//   .then((response) => response.json()) // Parse the response as JSON
//   .then((data) => {
//     const carouselInner = document.querySelector(
//       "#card-carousel-2 .carousel-inner"
//     );

// Clear any existing content
//     carouselInner.innerHTML = "";

// Loop through the meals and create carousel cards
//     data.meals.forEach((meal, index) => {
//       const carouselItemClass =
//         index === 0 ? "carousel-item active" : "carousel-item";
//       const cardHtml = `
//     <div class="${carouselItemClass}">
//       <div class="card">
//         <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
//         <div class="card-body">
//           <h5 class="card-title">${meal.strMeal}</h5>
//           <p class="card-text">Meal ID: ${meal.idMeal}</p>
//         </div>
//       </div>
//     </div>
//   `;
//       carouselInner.innerHTML += cardHtml;
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching API data:", error);
//   });

// Fetching the API data for Desserts
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
  .then((response) => response.json())
  .then((data) => {
    const carouselInner = document.querySelector(
      "#card-carousel-3 .carousel-inner"
    );

    // Clear any existing content
    carouselInner.innerHTML = "";

    // Loop through the meals and create carousel cards
    data.meals.forEach((meal, index) => {
      const carouselItemClass =
        index === 0 ? "carousel-item active" : "carousel-item";
      const cardHtml = `
        <div class="${carouselItemClass}">
          <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Meal ID: ${meal.idMeal}</p>
              <button class="btn btn-primary btn-sm view-details" data-mealid="${meal.idMeal}" data-bs-toggle="modal" data-bs-target="#mealModal">View Details</button>
            </div>
          </div>
        </div>
      `;
      carouselInner.innerHTML += cardHtml;
    });

    // Attach click event listener to the "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll(".view-details");
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const mealId = event.target.getAttribute("data-mealid");
        // Call a function to show the modal with meal details using the mealId
        openMealModal(mealId);
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching API data:", error);
  });

// Function to show modal with meal details
function openMealModal(mealId) {
  // Fetch meal details using the mealId
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      // Create modal content using the fetched data
      const modalHtml = `
        <div class="modal fade" id="mealModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
              </div>
              <div class="modal-body">
                <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}" />
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
      // Add the modal content to the modal container
      const modalContainer = document.getElementById("modal-container");
      modalContainer.innerHTML = modalHtml;

      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById("mealModal"));
      modal.show();
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
  }, 3500);
});
