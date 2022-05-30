const result = document.getElementById("result");
// console.log(result);
const input = document.querySelector("input");
console.log(input);
const form = document.querySelector("form");
//console.log(form);
let meals = [];
async function mealsApp() {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=beef")
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);
}
function mealsDisplay() {
  meals.length = 15;
  result.innerHTML = meals
    .map(
      (meal) => `<li class="card">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
    <img src=${meal.strMealThumb} alt=${meal.strMeal}>
    <ul></ul>
    </li>
  `
    )
    .join("");
}
input.addEventListener("input", (e) => {
  e.preventDefault();
  mealsApp(e.target.value);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsApp().then(() => mealsDisplay());
});

