const apiKey = "YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"
const dateNow = moment(); // use library to get current data
const currentDate = dateNow.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
let daysBack = 14;
let startDate = moment().subtract(daysBack, "days") // get date from 2 weeks ago
const startRange = startDate.format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'
console.log("currentDate: " + currentDate)
console.log("starting date: " + startRange)


const testfetch = async (url) => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log('data:', data);
  }


  const url1 = "https://api.nasa.gov/planetary/apod?api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY" // base url
  const url2 = `https://api.nasa.gov/planetary/apod?start_date=${startRange}&end_date=${currentDate}&api_key=${apiKey}` //url params are variables
  let url3 = "https://api.nasa.gov/planetary/apod?start_date=2023-08-11&end_date=2023-08-25&api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY" // what the actual url will look like

  testfetch(url1)