const selectorElement = (selector) => {
    const element = document.querySelector(selector);
  
    if(element) return element;
    throw new Error(`Cannot find element ${selector}`);
  }
  
  let body = selectorElement("body");
  const btn = selectorElement(".btn-more");
  const box = selectorElement(".timezone");
  const refresh = selectorElement(".fas");

  body = getLocation();

// Toggle between timezone box display
  btn.addEventListener('click', function toggleDiv() {
    if(timezone.style.display === 'none') {
        timezone.style.display = "block";
        btn.innerHTML = "Less";
    } else {
        timezone.style.display = "none";
        btn.innerHTML = "More";
    }
  });

refresh.addEventListener("click", function () {
    console.log("You clicked me");
    genQoutes();
  });

//Fetch qoutes API
function genQoutes(){
  fetch("https://type.fit/api/quotes")
  .then(response => response.json())
  .then(data => {
    let random = Math.floor(Math.random() * 500 + 1);
    let qoute = selectorElement(".qoute");
    let author = selectorElement("#author");

    qoute.textContent = data[random].text;
    author.textContent = data[random].author;
  });
};

// Fetch IP API
function getLocation (){
  fetch("https://api.ipbase.com/v2/info?apikey=i4qEX0muXEIe9KYlddCjCNCfF8HG6PUe1CZTZs6Z")
  .then(response => response.json())
  .then(results => {
     let loc = results.data.ip;
     let city = selectorElement(".currentCity");

     city.innerHTML = results.data.location.city.name;

     fetch("https://worldtimeapi.org/api/ip=" + loc)
     .then(response => response.json())
     .then(data => {

        let country = selectorElement("#country");
        let yearDay = selectorElement("#day");
        let weekDay = selectorElement("#weekDay");
        let weekNumber = selectorElement("#weekNumber");
        let time = selectorElement("#time");

        country.innerHTML = data.timezone;
        yearDay.innerHTML = data.day_of_year;
        weekNumber.innerHTML = data.week_number;
        weekDay.innerHTML = data.day_of_week;

        time.innerHTML = data.datetime.substr(11, 5);

        let shift = parseInt(time);
        let dayContent = selectorElement("#change-day");

        if (shift >= 5 && shift < 12) 
        {
          dayContent.innerHTML = "Good Morning, It's currently";
        } else if (shift >= 12 && shift < 18) {
          dayContent.innerHTML = "Good Afternoon, It's currently";
        } else {
          dayContent.innerHTML = "Good Evening, It's currently";
        }
  
      })
    })
}
