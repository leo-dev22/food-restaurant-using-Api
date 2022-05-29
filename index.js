//comme toujours ,on teste le lien de l'api
const result = document.getElementById("result");
console.log(result);
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

const fetchMeals = async (search) => {
  await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=meat" + search
  )
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);
};

function mealsDisplay() {
  //pour limiter le nombre de plats de menu
  meals.length === null
    ? (result.innerHTML = "<h2>Aucun resultat</h2>")
    : ((meals.length = 24),
      (result.innerHTML = meals
        .map((meal) => {
          let ingredients = [];
          for (i = 1; i < 21; i++) {
            if (meal[`strIngredient${i}`]) {
              let ingredient = meal[`strIngredient${i}`];
              let measure = meal[`strMeasure${i}`];
              ingredients.push(`<li>${ingredient}-${measure}</li>`);
            }
          }

          return `
          <li class="card-meal">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
            <ul>${ingredients.join("")}</ul>
          </li>`;
        })
        .join("")));
}
input.addEventListener("input", (e) => {
  e.preventDefault();
  fetchMeals(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
