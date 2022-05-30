const result = document.getElementById("result");
// console.log(result);
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
  result.innerHTML = meals.map(
    (meal) => `
  <h1>${meal.strMeal}</h1>
  `
  );
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsApp().then(() => mealsDisplay());
});
mealsApp();
