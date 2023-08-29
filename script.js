const apiKey = "YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"

const dateNow = moment(); // use library to get current data
const currentDate = dateNow.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
let daysBack = 14;
let startDate = moment().subtract(daysBack, "days") // get date from 2 weeks ago
const startRange = startDate.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
console.log("currentDate: " + currentDate)
console.log("starting date: " + startRange)
const gallery = document.querySelector("#gallery");
const searchBar = document.querySelector("#search")
const modal = document.querySelector("#modal")
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalExplanation = document.querySelector("#modalExplanation")
const closeModalButton = document.querySelector("#closeModal");


let obj = {
  date: "454454"
}


function createGalleryItem(photo) {
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("gallery-item");

  const pictureImg = document.createElement("img");
  pictureImg.src = photo.hdurl;

  const pictureTitle = document.createElement("p");
  pictureTitle.textContent = photo.title;
  pictureTitle.classList.add("photo-title");

  pictureCard.appendChild(pictureImg);
  pictureCard.appendChild(pictureTitle);
  pictureCard.dataset.explanation = `${photo.explanation}`
  // console.log(pictureCard.dataset.explanation)
  pictureCard.addEventListener("click", (e) => {
    console.log("Explanation:", pictureCard.dataset.explanation);
    modalImage.src = photo.hdurl; // Update modal image source
    modalTitle.textContent = photo.title; // Update modal title
    modalExplanation.textContent = photo.explanation
    modal.showModal(); // Open the modal
  });

  return pictureCard;
}

function AppendPhotos(photos) {
  photos.forEach((photo) => {
      const pictureCard = createGalleryItem(photo);
      gallery.appendChild(pictureCard);
  });
}

async function fetchPhotos(url){
  try {
      const response = await fetch(url);
      console.log("raw data" + response)
      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
      }
      const photos = await response.json();
      console.log(photos)
      AppendPhotos(photos);
  } catch (error) {
      console.error("Error fetching photos:", error);
  }
};

  const testfetch = async (url) => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log('data:', data);
  }
  function Display(event) {
    event.preventDefault(); // Prevent the form from submitting (which would reload the page)
    gallery.innerHTML = ""
  
    const searchTerm = document.querySelector("#searchInput").value;
    console.log("Search Term:", searchTerm);
  
    // You can use the search term in your further logic, such as updating the API request URL.
    // Example:
    // const updatedUrl = `https://api.nasa.gov/planetary/apod?start_date=${startRange}&end_date=${currentDate}&api_key=${apiKey}&search=${searchTerm}`;
    
    // Call fetchPhotos with the updated URL.
    // fetchPhotos(updatedUrl);
  }

  // comments again

  const searchForm = document.querySelector("#searchForm");
  searchForm.addEventListener("submit", Display);
  closeModalButton.addEventListener("click", () => {
    modal.close();
  });
  function addToFavorites(photo) {
    // Get existing favorites from local storage or initialize an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // Check if the photo is already in favorites by comparing the title
    const isAlreadyFavorite = favorites.some((favorite) => favorite.title === photo.title);
  
    if (!isAlreadyFavorite) {
      // Add the photo to favorites
      favorites.push({
        title: photo.title,
        url: photo.hdurl,
        explanation: photo.explanation,
      });
  
      // Save the updated favorites to local storage
      localStorage.setItem('favorites', JSON.stringify(favorites));
  
      console.log('Added to favorites:', photo.title);
    } else {
      // Provide feedback that the photo is already in favorites
      console.log('This photo is already in favorites:', photo.title);
    }
  }
  const favoriteButton = document.querySelector("#favoriteButton");
favoriteButton.addEventListener("click", () => {
  // Get the current photo from the modal
  const currentPhoto = {
    title: modalTitle.textContent,
    hdurl: modalImage.src,
    explanation: modalExplanation.textContent,
  };

  // Add the current photo to favorites
  addToFavorites(currentPhoto);
});
function showFavorites() {
  // Get favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  if (favorites && favorites.length > 0) {
    console.log('Favorites:');
    favorites.forEach((favorite, index) => {
      console.log(`Favorite ${index + 1}:`);
      console.log('Title:', favorite.title);
      console.log('URL:', favorite.url);
      console.log('Explanation:', favorite.explanation);
      console.log('-------------------------');
    });
  } else {
    console.log('You have no favorites yet.');
  }
}

const showFavoritesButton = document.querySelector("#showFavoritesButton");
showFavoritesButton.addEventListener("click", showFavorites);

  const url1 = "https://api.nasa.gov/planetary/apod?api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY" // base url
  const url2 = `https://api.nasa.gov/planetary/apod?start_date=${startRange}&end_date=${currentDate}&api_key=${apiKey}` //url params are variables
  let url3 = "https://api.nasa.gov/planetary/apod?start_date=2023-08-11&end_date=2023-08-25&api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY" // what the actual url will look like


  fetchPhotos(url2)






