const apiKey = "YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"

const dateNow = moment(); // use library to get current data
const currentDate = dateNow.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
let daysBack = 14;
let startDate = moment().subtract(daysBack, "days") // get date from 2 weeks ago
const startRange = startDate.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
console.log("currentDate: " + currentDate)
console.log("starting date: " + startRange)
const gallery = document.querySelector("#gallery");
function AppendPhotos(photos) {
        for(let i = 0; i < photos.length; i++){
        const pictureCard = document.createElement("div") // create a div
        const pictureTitle = document.createElement("h2"); 
        const pictureImg = document.createElement("img");
        pictureTitle.textContent = photos[i].title // change the text of the h2 tag to the title property of the photo
        pictureImg.src = photos[i].hdurl // set image source url of the photo in the hdurl property
        pictureCard.append(pictureImg, pictureTitle) // add the image element and h2 element to the div
        gallery.append(pictureCard) // add the div to the gallery
    }
}
const fetchPhotos = async (url) => {
    const response = await fetch(url) // get data from Nasa
    console.log(response)
    const photos = await response.json() // convert the body of the response to an array of photos 
    console.log('data:', photos);
    AppendPhotos(photos)

  }

  const testfetch = async (url) => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log('data:', data);
  }

  // comments

  const url1 = "https://api.nasa.gov/planetary/apod?api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY" // base url
  const url2 = `https://api.nasa.gov/planetary/apod?start_date=${startRange}&end_date=${currentDate}&api_key=${apiKey}` //url params are variables
  let url3 = "https://api.nasa.gov/planetary/apod?start_date=2023-08-11&end_date=2023-08-25&api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY" // what the actual url will look like

  fetchPhotos(url2)
