document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchQuery").value;
  if (query) {
    fetchRecipes(query);
  } else {
    alert("Please enter a search term.");
  }
});

// Fetch trending recipes when the page loads
window.onload = function () {
  fetchTrendingRecipes();
  displayMostSearchedRecipes();
};

// Fetch recipes from TheMealDB API
function fetchRecipes(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  document.getElementById("loading").style.display = "block";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById("loading").style.display = "none";
      if (data.meals) {
        displayRecipes(data.meals, "recipeResults");
      } else {
        document.getElementById("recipeResults").innerHTML = `<p>No recipes found for "${query}".</p>`;
      }
    })
    .catch(error => {
      document.getElementById("loading").style.display = "none";
      console.error("Error fetching data:", error);
    });
}

// Fetch trending recipes (using random meals)
function fetchTrendingRecipes() {
  const url = `https://www.themealdb.com/api/json/v1/1/randomselection.php`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        displayRecipes(data.meals, "trendingResults");
      }
    })
    .catch(error => {
      console.error("Error fetching trending recipes:", error);
    });
}

// Display predefined most searched recipes
function displayMostSearchedRecipes() {
  const mostSearchedRecipes = [
    { strMeal: "Pizza", strMealThumb: "https://www.themealdb.com/images/media/meals/1529442513.jpg", strCategory: "Italian", strArea: "Italy", strSource: "#" },
    { strMeal: "Tacos", strMealThumb: "https://www.themealdb.com/images/media/meals/1529441410.jpg", strCategory: "Mexican", strArea: "Mexico", strSource: "#" },
    { strMeal: "Sushi", strMealThumb: "https://www.themealdb.com/images/media/meals/1529442744.jpg", strCategory: "Japanese", strArea: "Japan", strSource: "#" }
  ];

  displayRecipes(mostSearchedRecipes, "mostSearchedResults");
}

// Display recipes in the respective section
function displayRecipes(recipes, sectionId) {
  const resultsDiv = document.getElementById(sectionId);
  resultsDiv.innerHTML = "";

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
      <p>Category: ${recipe.strCategory}</p>
      <p>Area: ${recipe.strArea}</p>
      <a href="${recipe.strSource}" target="_blank">View Recipe</a>
    `;

    resultsDiv.appendChild(recipeCard);
  });
}
