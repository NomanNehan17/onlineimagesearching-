const accessKey = "rf4F1hJVO1G8SQvD0T4mw6ZVmuDXrNNYWoZ2YgOVPfc";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const SearchResults = document.querySelector(".Search-results");
const showMore = document.getElementById("show-more-button");

let inputData = ""
let page = 1;

async function SearchImages (){
    inputData = inputEl.ariaValueMax;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}
    &client_id=${accessKey}`;

   const response = await fetch(url);
   const data = await response.json();

   const results = data.results;
   console.log(results);

   if(page === 1) {
    SearchResults.innerHTML = "";
   }

   results.map((result) => {

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("Search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html ;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    SearchResults.appendChild(imageWrapper);
    
   });

   page++;
   if(page > 1){
    showMore.style.display = "block";
   }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    SearchImages();
});

showMore.addEventListener("click", () =>{
   
    SearchImages();
});