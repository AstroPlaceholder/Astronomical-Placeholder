const testfetch = async (url) => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log('data:', data);
  }


  const url1 = "https://api.nasa.gov/planetary/apod?api_key=YQC8mJrAc8NDymYasHAaXGDaOQ1SzPcqERINxPmY"

  testfetch(url1)