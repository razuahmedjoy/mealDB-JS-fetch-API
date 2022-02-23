const searchFoodBtn = document.getElementById("searchFood");
const loadDishes = async () => {

    const searchText = document.getElementById("searchText").value
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => showResult(data));
    const res = await fetch(url);
    const data = await res.json();
    showResult(data);

}
searchFoodBtn.addEventListener("click", loadDishes)
const showResult = data => {
    const meals = data.meals
    const dishBox = document.getElementById("dishes");
    dishBox.innerHTML = "";

    if (data.meals == null) {
        dishBox.innerHTML = `<p class="alert bg-warning text-center"> No dishes found with your keyword, Try searching with another keyword </p>`
        return;
    }

    for (const meal of meals) {

        const div = document.createElement("div")
        div.classList.add("col-lg-3")
        div.classList.add("col-md-4")
        div.classList.add("col-sm-6")
        div.innerHTML = `
                        <div class="card mb-2">
                            <img onclick="loadMealDetail(${meal.idMeal})" src="${meal.strMealThumb}" class="card-img-top" height="200" width="200" alt="${meal.strMeal}">
                            <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                                </div>
                        </div>
                   `


        dishBox.appendChild(div);
    }
}

const loadMealDetail = async mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;


    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => showDetails(data.meals[0]))

    // using another way
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.meals[0])
}


const showDetails = (meal) => {
    const mealDetails = document.getElementById("mealdetails")

    mealDetails.textContent = ""
    const div = document.createElement("div")
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" height="200" width="200" alt="${meal.strMeal}">
        <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Details </a>
            </div>

    `
    mealDetails.appendChild(div)
}