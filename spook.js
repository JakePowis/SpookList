// TO DO

//MUSIC
//Splash Scrren
//Text & Animation

let container = document.getElementById("container");
let object = document.getElementById("object");
let image = document.getElementById("image");
let title = document.getElementById("title");
let button = document.getElementById("button");
let home = document.getElementById("home");
let yearSelect = document.getElementById("yearSelect");

let page1 = document.querySelectorAll(".page1");
let page2 = document.querySelectorAll(".page2");

var movieURL = ""; //completed once year selected
var apiKey = "api_key=c2551dd4c8c115507e20bd6fc206af05"

var year = 2019; // default of 2019

button.addEventListener("click", function() {
  Array.from(page1).forEach(item => {
    item.style.display = "none";
  }); //end for each

  Array.from(page2).forEach(item => {
    item.style.display = "flex";
  }); //end for each

  year = yearSelect.value;
  console.log(year)
  document.getElementById("header").textContent = `the Best Spooks of ${year} were:`;
  document.getElementById("container").style.position = "relative"
  document.getElementById("page").style.marginTop = "5%";

  if (year == "All Time") {
  movieURL = "https://api.themoviedb.org/3/discover/movie?" + apiKey + "&with_genres=27" }
  else {
  movieURL = "https://api.themoviedb.org/3/discover/movie?" + apiKey + "&with_genres=27&primary_release_year=" + year
  + "";}
  console.log("movie URL is: ", movieURL) 
  getMovieData(movieURL)
}); //end event listener

home.addEventListener("click", function() {
  Array.from(page1).forEach(item => {
    item.style.display = "flex";

    
  }); //end for each

  Array.from(page2).forEach(item => {
    item.style.display = "none";
  }); //end for each
  document.getElementById("container").style.position = "fixed";
  document.getElementById("page").style.marginTop = "0%";


}); //end event listener


function getMovieData(url) {

    fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(movieOb) {

    console.log(movieOb)

      //sort by rating
      sortedArr = movieOb.results.sort( (a, b) => {
      return b.vote_average - a.vote_average
      }) //end sort
      console.log("SORTED RESULTS: ", sortedArr)


      //posterURL = "http://image.tmdb.org/t/p/w185//" + movie.Ob.results.poster_path


      document.getElementById('resultContainer').innerHTML = sortedArr.map(function(movie) {
      return `
      <div id="result">
      <div id="filmInfo">
      <div><span id="film">${movie.title}</span></div>
      <div ><span>Rating:&nbsp</span><span id="rating">${movie.vote_average+1}</span></div>
      <div class="summary"><span id="summary">${movie.overview}</span></div>
      <div class="date"><span>Release date:&nbsp</span> <span id="date">${movie.release_date}</span></div>
      </div>
      <img id="pic"src=http://image.tmdb.org/t/p/w500/${movie.poster_path}><img>
      </div>
      `;
      
      })//end map
    
    
    
    })//end movie ob function
    .then()
    .catch(function(error) {
      console.log("ERROR IS:", error);
    })
  };