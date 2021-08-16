const API_URL =
  "https://newsapi.org/v2/top-headlines?category=sports&language=en&sortBy=popularity&apiKey=5254e603dbcf4933b3acd9b65d6079be";

const SEARCH_API =
  'https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=5254e603dbcf4933b3acd9b65d6079be&query="';

const main = document.getElementById("container");
const form = document.getElementById("form");
const search = document.getElementById("search");

getNews(API_URL);

async function getNews(url) {
  const res = await fetch(url);
  const data = await res.json();

  showNews(data.articles);
}

function showNews(infos) {
  main.innerHTML = "";

  infos.forEach(info => {
    const {
      author,
      source,
      description,
      urlToImage,
      publishedAt,
      title,
      url
    } = info;

    const newsEl = document.createElement("div");
    newsEl.classList.add("content");

    newsEl.innerHTML = `
    <div class="image-content">
    <img src="${urlToImage}" alt="${author}">
    <h2>${title}</h2>
    </div>
    <div class="image-alone">
    <img src="${urlToImage}" alt="${author}">
    </div>
    <div class="detailed-info">
    <div class="source-header">
    <h4>${source.name}</h4>
    <h4>${publishedAt}</h4>
    </div>
    <div class="overview">
    <h3><a href="${url}">${title}</a></h3>
    <p>${description}</p>
    </div>
    <div class="source-bottom">
    <h3>Author: <span> ${replaceNull(author)}</span></h3>
    <h4>${replaceNull(source.id)}</h4>
    </div>
    </div>
    `;
    main.appendChild(newsEl);
  });
}

function replaceNull(letter) {
  if (letter == null) {
    return "";
  } else {
    return letter;
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getNews(
      "https://newsapi.org/v2/top-headlines?category=sports" +
        "&q=" +
        searchTerm +
        "&language=en&sortBy=popularity&apiKey=5254e603dbcf4933b3acd9b65d6079be"
    );

    search.value = "";
  } else {
    window.location.reload();
  }
});
