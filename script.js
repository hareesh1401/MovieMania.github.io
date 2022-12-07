// MOVIE SEARCH BOT
let searchBox = document.getElementById("search");  
let suggestionList = document.querySelector(".suggestion ul");  
let pageSection = document.querySelector(".page-section");  
let suggestion = document.querySelector(".suggestion");  

//LOAD MOVIES 

async function loadMovies(keyword){
    let URL = `https://www.omdbapi.com/?s=${keyword}&apikey=1a5197`;
    let res = await fetch(`${URL}`);
    let data = await res.json();
    if(data.Response){
        displayMovies(data.Search)
    }else{
        console.log("Link Is not Working")
    }
}

let findMovies = ()=>{
    pageSection.innerHTML=`<p>Released</p>`
    let keyword = searchBox.value.trim()
    if(keyword.length<1){
        suggestion.classList.remove("active")
    }else{
        loadMovies(keyword)
        suggestion.classList.add("active")
    }
}


function displayMovies(movies){
    suggestionList.innerHTML=""
    for(let index = 0;index<movies.length;index++){

       let movieListItem = document.createElement("li")
       movieListItem.id=movies[index].imdbID;
       movieListItem.classList.add("searchList")

       if(movies[index].Poster!='N/A'){
           moviePoster = movies[index].Poster
        }else{
           moviePoster = "notfound.png"
        }
        movieListItem.innerHTML+= `<button class="suggestion-list" >
                                    <div class="thumbnailImg">   
                                    <img src="${moviePoster}" alt="${movies[index].Title}">
                                    </div>
                                        <div class="suggestion-details">
                                            <h3>${movies[index].Title}</h3>
                                            <p>Year :${movies[index].Year}</p>
                                        </div>
                                    </button>`
        suggestionList.appendChild(movieListItem) 
        console.clear()
    }
    loadMovieDetails()
    
}

function loadMovieDetails(){
    let searchList = document.querySelectorAll(".searchList");  
    searchList.forEach(movie =>  {
        movie.addEventListener("click",async ()=>{
            loader.classList.add("active")
            searchBox.value=""
            suggestion.classList.remove("active")
            let pageResult = await fetch(`https://www.omdbapi.com/?i=${movie.id}&apikey=1a5197`)
            let pageDetails= await pageResult.json()
            displayMovieDetails(pageDetails)
        })
    });
}


function displayMovieDetails(movieDetails){

pageSection.innerHTML=` <div class="page-left">
                            <div class="page-img">
                            <img src="${(movieDetails.Poster!='N/A')?movieDetails.Poster:"notfound.png"}" alt="${movieDetails.Title}">
                            </div>
                            </div>
                            <div class="page-right">
                            <h1>${movieDetails.Title}</h1>
                            <p>Year : ${movieDetails.Year} <span>Ratings : ${movieDetails.Rated}</span></p>
                            <p>Released :${movieDetails.Released}</p>
                            <p class="genere">Genre :${movieDetails.Genre}</p>
                            <p>Writer : ${movieDetails.Writer} </p>
                            <p>Actors : ${movieDetails.Actors}</p>
                            <p>Awards : ${movieDetails.Awards} </p>
                            <p>Language : ${movieDetails.Language} </p>
                            <p>Plot : ${movieDetails.Plot} </p>
                        </div>`;
                        page.classList.add("active")
                        loader.classList.remove("active")

}




// INTERACTIONS 



let page = document.querySelector(".page");
let loader = document.querySelector(".loader");
let newPage = ()=>{
                page.classList.add("active")
}
let backPage = ()=>{
    page.classList.remove("active")
}
let preloader = ()=>{
        loader.classList.remove("active")
}
// window.onload=preloader()
window.addEventListener("load",()=>{
    loader.classList.remove("active")
})