const eventContainerEl = document.getElementById("events-container");
const restContainerEl = document.getElementById("restaurant-container");
const eventCardContainerEl = document.getElementById("event-details")
const restCardContainerEl = document.getElementById("rest-details");
const food_KEY = "4e2bcc2c6d960eec2150089303018710";
const event_KEY = "RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
const cityTitleEl = document.querySelector("#city-name");
const city = document.getElementById("events").value;

const getData = function () {
  getEvents().then((data) => getRestaurants(data.latitude, data.longitude));
};

const getRestaurants = function (lat, lon) {
  const food_URL =
    "https://developers.zomato.com/api/v2.1/search?entity_type=city&lat=" +
    lat +
    "&lon=" +
    lon +
    "&radius=100.0&sort=real_distance&order=asc";
  fetch(food_URL, {
    headers: {
      "user-key": food_KEY,
    },
  }).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayRestaurants(data);
      displayRestDetails(data);
      console.log(data.restaurants[0].restaurant.name);
      return;
    });
  });
};

const getEvents = function () {
  return new Promise(function (resolve, reject) {
    const city = document.getElementById("events").value;
    const event_URL =
      "https://app.ticketmaster.com/discovery/v2/events.json?&city=" +
      city +
      "&apikey=RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
    fetch(event_URL).then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        displayEvents(data);
        displayEventDetails(data);
        resolve(data._embedded.events[0]._embedded.venues[0].location);
        console.log(city);
      });
    });
  });
};

const displayEvents = function (data) {
  const events = data._embedded.events;
  console.log(events);
  for (let i = 0; i < 5; i++) {
    const eventName = events[i].name;
    const eventDate = events[i].dates.start.localDate;
    eventContainerEl.innerHTML += `<a class="collection-item" data-id="${i}">Name: ${eventName}<br />Date: ${eventDate}</a>`;
  }
};

const displayNames = function (city) {
  cityTitleEl.innerHTML = `<h5>Showing Events and Restaurants for: ${city}</h5>`;
};

const displayRestaurants = function (data) {
  const restaurants = data.restaurants;
  for (let i = 0; i < 5; i++) {
    const restName = restaurants[i].restaurant.name;
    const restEst = restaurants[i].restaurant.establishment[0];
    const restCuis = restaurants[i].restaurant.cuisines;
    restContainerEl.innerHTML += `<a class="collection-item" data-id="${i}">Name: ${restName}<br />Type: ${restEst}<br/ >Cuisine: ${restCuis}</a>`;
  }
};

const displayEventDetails = function (data) {
  //when user clicks on an event or restaurant 
  document.querySelectorAll("#events-container").forEach(function(item){
    item.addEventListener("click", function () {
     
      const name = data._embedded.events[0].name;
      const genre = data._embedded.events[0].classifications[0].genre.name;
      const dates = data._embedded.events[0].dates.start.localDate;
      const prices = data._embedded.events[0].priceRanges[0].min;
      const venue = data._embedded.events[0]._embedded.venues[0].name;
      const address = data._embedded.events[0]._embedded.venues[0].address.line1;
      const status = data._embedded.events[0].dates.status.code;
      eventCardContainerEl.innerHTML += `<a class="card">Name: ${name}<br />Genre: ${genre}<br/ >Dates: ${dates}<br />Venue: ${venue}<br />Address: ${address}<br />Status: ${status}</a>`;
  
      
    })

    // images[0].url, 
    // url to ticketmaster (href)
    
  }) 

}

const displayRestDetails = function (data) {
  //when user clicks on an event or restaurant 
  document.querySelectorAll("#restaurant-container").forEach(function(item){
    item.addEventListener("click", function () {
     
      const restName = data.restaurants[0].restaurant.name;
      const restAddress = data.restaurants[0].restaurant.location.address;
      const restPhone = data.restaurants[0].restaurant.phone_numbers;
      const restTimings = data.restaurants[0].restaurant.timings;
      const restPrice = data.restaurants[0].restaurant.price_range;

      restCardContainerEl.innerHTML += `<a class="card">Name: ${restName}<br />Address: ${restAddress}<br/ >Phone: ${restPhone}<br />Offerings: ${restTimings}<br />Price: ${restPrice}</a>`;
  
      
    })

    // images[0].url, 
    // url to ticketmaster (href)
    
  }) 

}
document.getElementById("search").addEventListener("click", function (event) {
  event.preventDefault();
  const city = document.getElementById("events").value;
  getData(city);
  displayNames(city);
});
