const  API_KEY ="b8de5e26-f75e-4fe6-8fc0-5355af87bce6";
const  API_URL_POPULAR =
"https:kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
"https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";



getMovies(API_URL_POPULAR)

async function getMovies(url) {
    const resp = await fetch(url,{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,          
        },
    });
    const respData = await resp.json();
     showMovies(respData);
}

// rating card
function getClassByRate(voto) {
    if(voto >= 7){
        return "green";
    } else if (voto > 5){
        return "orange";
    }else{
        return "red";
    }
}

 function showMovies(data) {
    const moviesEl = document.querySelector('.movies');
// очищаем предыдкшие фильмы
    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML =`
        <div class="movie__cover-inner">
                <img
                    src="${movie.posterUrlPreview}" 
                    class="movie__cover" 
                    alt="${movie.nameRu}"
                />
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(
                    (genre) => ` ${genre.genre}`
                )}</div>
                    ${
                        movie.rating && 
                        `
                <div class="movie__average movie__average--${getClassByRate(
                    movie.rating
                    )}">${movie.rating}</div>
                    `
                }
        </div>
            `;
             moviesEl.appendChild(movieEl);
    });
};

// поиск

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (a)=> {
    a.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if(search.value) {
        getMovies(apiSearchUrl);

        search.value ="";
    }
})
