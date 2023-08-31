import * as THREE from 'three';

const dateNow = moment(); // use library to get current data
const currentDate = dateNow.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
let daysBack = 14;
let startDate = moment().subtract(daysBack, "days"); // get date from 2 weeks ago
const startRange = startDate.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
console.log("currentDate: " + currentDate);
console.log("starting date: " + startRange);
const apiKey = "YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"
const gallery = document.querySelector("#gallery");
const searchBar = document.querySelector("#search");
const modal = document.querySelector("#modal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalExplanation = document.querySelector("#modalExplanation");
const closeModalButton = document.querySelector("#closeModal");
// console.log(close)
let obj = {
  date: "454454",
};
const container = document.querySelector(".background")
const loader = new  THREE.TextureLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
const particlesGeometry = new THREE.BufferGeometry();
const counts = 3000

const positions = new Float32Array(counts * 3)

for (let i = 0; i < counts * 3; i++){
  positions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
)

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.01
particlesMaterial.sizeAttenuation = true

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
function resizeRenderer() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;


  renderer.setSize(newWidth, newHeight);

 
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
}


window.addEventListener("resize", resizeRenderer);

// Initial call to set up the renderer and camera sizes
resizeRenderer();






const canvas = renderer.domElement;
canvas.classList.add("background-canvas");
container.appendChild(canvas);


const geometry = new THREE.PlaneGeometry(6, 6, 25, 5);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  map: loader.load("bg2.png")
})
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
camera.position.z = 5

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();


function animate() {
  const time = clock.getElapsedTime()
  const elapsedTime = clock.getElapsedTime()

  particles.position.y = -elapsedTime * 0.02;

  for(let i = 0; i < count; i++){
    // const x = geometry.attributes.position.getX(i)
    // const y = geometry.attributes.position.getY(i)

    // geometry.attributes.position.setZ(i, -y * time * 0.3)
    // geometry.computeVertexNormals()
    // geometry.attributes.position.needsUpdate = true
  }
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
// function animate() {
//   const time = clock.getElapsedTime();

//   particles.geometry.attributes.position.array.forEach((_, index) => {
//     const x = positions[index * 3];
//     const y = positions[index * 3 + 1];
//     const z = positions[index * 3 + 2];
//     particles.position.y = -elapsedTime * 0.02;
    
//     // Update the z-coordinate of the particles based on the time
//     positions[index * 3 + 2] = z - y * time * 0.3;
//   });

//   particles.geometry.attributes.position.needsUpdate = true;

//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

animate()




function createGalleryItem(photo, index) {
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("gallery-item");
  const pictureImg = document.createElement("img");
  pictureImg.src = photo.hdurl;
  const pictureTitle = document.createElement("p");
  pictureTitle.textContent = photo.title;
  pictureTitle.classList.add("photo-title");
  pictureCard.appendChild(pictureImg);
  pictureCard.appendChild(pictureTitle);
  pictureCard.dataset.explanation = `${photo.explanation}`;
  // console.log(pictureCard.dataset.explanation)
  pictureCard.addEventListener("click", (e) => {
    console.log("Explanation:", pictureCard.dataset.explanation);
    modalImage.src = photo.hdurl; // Update modal image source
    modalTitle.textContent = photo.title; // Update modal title
    modalExplanation.textContent = photo.explanation;
    modal.showModal(); // Open the modal
  });
  if(index <= 6) pictureCard.dataset.aos = "fade"
  else pictureCard.dataset.aos = "slide-left"
  let offset = index % 3 * 200 + 1000
  pictureCard.setAttribute("data-aos-duration", `${offset}`)
  return pictureCard;
}
function AppendPhotos(photos) {
  photos.forEach((photo, index) => {
    const pictureCard = createGalleryItem(photo,index);
    gallery.appendChild(pictureCard);
  });
}
async function fetchPhotos(url) {
  try {
    const response = await fetch(url);
    console.log("raw data" + response);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const photos = await response.json();
    console.log(photos);
    AppendPhotos(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
}
const testfetch = async (url) => {
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log("data:", data);
};
async function Display(event) {
  event.preventDefault(); // Prevent the form from submitting (which would reload the page)
  // gallery.innerHTML = ""
  // const response = await fetch(url4)
  const searchTerm = document.querySelector("#searchInput").value;
  console.log("Search Term:", searchTerm);
  gallery.innerHTML = "";
  let url5 = `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`;
  const response = await fetch(url5);
  const search = await response.json();
  console.log(search);
  console.log(search.collection.items);
  for (let i = 0; i < 10; i++) {
    let pictureCard = createPhoto(search.collection.items[i], i);
    gallery.append(pictureCard);
    // console.log(search.collection.items[i].href)
    // console.log(search.collection.items[i].data[0].title)
  }
  // const searchTerm = document.querySelector("#searchInput").value;
  // console.log("Search Term:", searchTerm);
  // You can use the search term in your further logic, such as updating the API request URL.
  // Example:
  // const updatedUrl = `https://api.nasa.gov/planetary/apod?start_date=${startRange}&end_date=${currentDate}&api_key=${apiKey}&search=${searchTerm}`;
  // Call fetchPhotos with the updated URL.
  // fetchPhotos(updatedUrl);
}
function createPhoto(search, index) {
  console.log(search.links[0].href);
  const image = search.links[0].href;
  console.log(image);
  const title = search.data[0].title;
  const explanation = search.data[0].description;
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("gallery-item");
  const pictureImg = document.createElement("img");
  pictureImg.src = image;
  const pictureTitle = document.createElement("p");
  pictureTitle.textContent = title;
  pictureTitle.classList.add("photo-title");
  pictureCard.appendChild(pictureImg);
  pictureCard.appendChild(pictureTitle);
  pictureCard.dataset.explanation = `${explanation}`;
  // console.log(pictureCard.dataset.explanation)
  pictureCard.addEventListener("click", (e) => {
    console.log("Explanation:", pictureCard.dataset.explanation);
    modalImage.src = image; // Update modal image source
    modalTitle.textContent = title; // Update modal title
    modalExplanation.textContent = explanation;
    modal.showModal();
  });
  pictureCard.dataset.aos = "slide-left"
  let offset = index % 3 * 200 + 1000
  pictureCard.setAttribute("data-aos-duration", `${offset}`)
  return pictureCard;
}
// comments again
const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", Display);
closeModalButton.addEventListener("click", () => {
  modal.close();
});
function addToFavorites(photo) {
  // Get existing favorites from local storage or initialize an empty array
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Check if the photo is already in favorites by comparing the title
  const isAlreadyFavorite = favorites.some(
    (favorite) => favorite.title === photo.title
  );
  if (!isAlreadyFavorite) {
    // Add the photo to favorites
    favorites.push({
      title: photo.title,
      url: photo.hdurl,
      explanation: photo.explanation,
    });
    // Save the updated favorites to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Added to favorites:", photo.title);
  } else {
    // Provide feedback that the photo is already in favorites
    console.log("This photo is already in favorites:", photo.title);
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
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites && favorites.length > 0) {
    console.log("Favorites:");
    gallery.innerHTML = ""; // Clear the existing gallery content

    favorites.forEach((favorite, index) => {
      console.log(`Favorite ${index + 1}:`);
      console.log("Title:", favorite.title);
      console.log("URL:", favorite.url);
      console.log("Explanation:", favorite.explanation);
      console.log("-------------------------");

      // Create a picture card for each favorite
      const pictureCard = createFavoritePhoto(favorite, index);
      gallery.appendChild(pictureCard);
    });
  } else {
    console.log("You have no favorites yet.");
  }
}

function createFavoritePhoto(favorite, index) {
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("gallery-item");
  const pictureImg = document.createElement("img");
  pictureImg.src = favorite.url;
  const pictureTitle = document.createElement("p");
  pictureTitle.textContent = favorite.title;
  pictureTitle.classList.add("photo-title");
  pictureCard.appendChild(pictureImg);
  pictureCard.appendChild(pictureTitle);
  pictureCard.dataset.explanation = favorite.explanation;
  pictureCard.dataset.aos = "slide-right"

  pictureCard.addEventListener("click", (e) => {
    console.log("Explanation:", pictureCard.dataset.explanation);
    modalImage.src = favorite.url; // Update modal image source
    modalTitle.textContent = favorite.title; // Update modal title
    modalExplanation.textContent = favorite.explanation;
    modal.showModal();
  });
  pictureCard.dataset.aos = "slide-left"
  let offset = index % 3 * 200 + 1000
  pictureCard.setAttribute("data-aos-duration", `${offset}`)

  return pictureCard;
}

const showFavoritesButton = document.querySelector("#showFavoritesButton");
showFavoritesButton.addEventListener("click", showFavorites);
const url1 =
  "https://api.nasa.gov/planetary/apod?api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"; // base url
const url2 = `https://api.nasa.gov/planetary/apod?start_date=${startRange}&end_date=${currentDate}&api_key=${apiKey}`; //url params are variables
let url3 =
  "https://api.nasa.gov/planetary/apod?start_date=2023-08-11&end_date=2023-08-25&api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"; // what the actual url will look like
let url4 = "https://images-api.nasa.gov/search?q=sun&media_type=image";
fetchPhotos(url2);
