
let baseUrl = "https://www.omdbapi.com/";
let apiKey;
let loader = document.getElementsByClassName("loader")[0];

const form = document.getElementsByTagName("form")[0];
const container = document.getElementsByClassName("card-container")[0];

async function fetchData(search) {
    let url = `${baseUrl}?s=${search}&apikey=${apiKey}`

    let response = await fetch(url);
    let data = await response.json();
    loader.classList.remove("hide");
    if (data.Response == "False") {
        loader.classList.add("hide");
        alert(data.Error);
    }
    else {
        addDataToUI(data.Search);
    }
}

form.addEventListener("submit", (e) => {

    e.preventDefault();
    loader.classList.remove("hide");
    const apiSearchBar = document.getElementById("apiKey").value.trim();
    const searchBar = document.getElementById("search").value.trim();

    apiKey = apiSearchBar;

    fetchData(searchBar);
})

function addDataToUI(data) {
    container.innerHTML = "";

    let count = 1;
    data.forEach((element) => {
        let card = document.createElement("a");
        card.className = "card";
        card.href = `https://www.imdb.com/title/${element.imdbID}/`

        card.innerHTML = `
        <div class="poster-img">
        <img src="${element.Poster === 'N/A'? `N_A.jpg` : element.Poster}" alt="Something Went Wrong">
        </div>

        <div class="lower">
            <h1 id="item-no">${count}</h1>
            <h2 class="movie-name">${element.Title}(${element.Year})</h2>
        </div>`

        count++;

        container.appendChild(card);
        loader.classList.add("hide");
    })
}