const result = document.getElementById("result");
// console.log(result);
const input = document.querySelector("input");
//console.log(input);
const form = document.querySelector("form");
//console.log(form);
let meals = [];
async function mealsApp(search) {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);
}
function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>No results</h2>"
  } else {

    meals.length = 24;
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];
        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            ingredients.push(`<span>${ingredient} - ${measure} </span>`);
          }
        }
        //console.log(ingredients);

        return `<ul>
      <li class="card">
      <div>
      <h2>${meal.strMeal}</h2>
      <h4>${meal.strArea}</h4>
      </div>
       <img src=${meal.strMealThumb} alt=${meal.strMeal}>
       <div>
       <p>INGREDIENTS: ${ingredients.join("")}</p>
       <p>PREPARATIONS: ${meal.strInstructions}</p>
       </div>
       <a href="${
         meal.strYoutube
       }" target="_blank">Check out how to prepare your meal on this link</a>
      </li></ul>
      `;
      })
      .join("");
  }
}
input.addEventListener("input", (e) => {
  e.preventDefault();
  mealsApp(e.target.value).then(()=>mealsDisplay());
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
   mealsDisplay();
});

