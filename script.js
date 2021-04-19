
const displayIngredients = meal =>{
    const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const ingridients = array.filter(number => {
      
      return meal[`strIngredient${number}`] !== "" && meal[`strIngredient${number}`]!== null;

      

    })
  const mainDiv =   document.getElementById("ingridients");
  mainDiv.innerHTML ="";
   mainDiv.style.width = "50%";
   mainDiv.style.margin = "30px auto";
   mainDiv.style.background ="white";
   mainDiv.style.paddingBottom = "20px";
   
// Display meal img and name
  const html =`<img src="${meal[`strMealThumb`]}" alt="">
  <h1>${meal[`strMeal`]}</h1>
  <h3>Ingredients</h3>
  <ul></ul>`
 mainDiv.innerHTML = html;


// Display ingredients
  ingridients.forEach(number =>{
      const ulElement = document.querySelector("#ingridients ul");
  const li = document.createElement("li");

  li.innerText = `${meal[`strMeasure${number}`]} ${meal[`strIngredient${number}`]}`

 
  ulElement.appendChild(li);

  })
  

    console.log(ingridients);


}
const getIngridiens = (id) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url).then(response => response.json()).then(data => {
        const [meal] = data.meals;
        console.log(meal);
        displayIngredients(meal)
    })

    
}



const displayMeal = (data) =>{
    document.getElementById("no-meal-found").style.display ="none";
   document.getElementById("ingridients").innerHTML ="";
   document.getElementById("ingridients").style.background ="transparent"
const mealContainer = document.getElementById("allMeal");
mealContainer.innerHTML ="";
document.getElementById("search-field").value ="";



    data.meals.forEach(meal => {
        const html = `<div onclick="(getIngridiens('${meal.idMeal}'))" class="meal">
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        </div>`

        mealContainer.insertAdjacentHTML("beforeend",html)

    });





}


 document.getElementById("search-button").addEventListener("click",function(){
    const searchValue = document.getElementById("search-field").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then(response => response.json()).then(data => {
        console.log(data);
        //searchValue.value ="";
        displayMeal(data);
        
    }).catch(error =>{
        console.log(error);
        document.getElementById("no-meal-found").style.display ="block";
    })
 })