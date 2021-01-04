const eventContainerEl = document.getElementById("events-container");
const restContainerEl = document.getElementById("restaurant-container");
const eventCardContainerEl = document.getElementById("event-details");
const eventCardImageContainerEl = document.getElementById("event-image");
const eventCardLinkContainerEl = document.getElementById("event-url");
const restCardImageContainerEl = document.getElementById("rest-image");
const restCardContainerEl = document.getElementById("rest-details");
const restCardLinkContainerEl = document.getElementById("rest-url")
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
      //displayRestDetails(data);
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
        //displayEventDetails(data);
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
    const event = events[i];
    const eventDiv = document.createElement("a");
    eventDiv.setAttribute("class", "collection-item")
    eventDiv.innerHTML += `Name: ${eventName}<br />Date: ${eventDate}`;
    eventDiv.onclick = function () {
      displayEventDetails(event);
    };
    eventContainerEl.appendChild(eventDiv);
  }
};

const displayNames = function (city) {
  cityTitleEl.innerHTML = `<h5>Showing Events and Restaurants for ${city}</h5>`;
};

const displayRestaurants = function (data) {
  const restaurants = data.restaurants;
  for (let i = 0; i < 5; i++) {
    const restName = restaurants[i].restaurant.name;
    const restCuis = restaurants[i].restaurant.cuisines;
    const restaurant = restaurants[i].restaurant
    const restDiv = document.createElement("a");
    restDiv.setAttribute("class", "collection-item")
    restDiv.innerHTML += `Name: ${restName}<br />Cuisine: ${restCuis}`;
    restDiv.onclick = function () {
      displayRestDetails(restaurant);
    };
    restContainerEl.appendChild(restDiv);
   }
};

const displayEventDetails = function (event) {

      const name = event.name;
      const genre = event.classifications[0].genre.name;
      const dates = event.dates.start.localDate;
      const venue = event._embedded.venues[0].name;
      const address = event._embedded.venues[0].address.line1;
      const status = event.dates.status.code;
      const url = event._embedded.attractions[0].url;
      const image = event._embedded.venues[0].images[0].url;

      eventCardContainerEl.innerHTML = "";
      eventCardLinkContainerEl.innerHTML = "";
      eventCardImageContainerEl.innerHTML = "";
        
      eventCardContainerEl.appendChild(eventCardImageContainerEl);
      eventCardImageContainerEl.innerHTML +=`<img class="card-image" src="${image}">`;
      eventCardContainerEl.innerHTML += `<p class="card-content">Name: ${name}<br />Genre: ${genre}<br/ >Dates: ${dates}<br />Venue: ${venue}<br />Address: ${address}<br />Status: ${status}</p>`;
      eventCardLinkContainerEl.innerHTML += `<a class="card-action" target= "blank" href=${url}>Purchase Tickets</a>`; 
      eventCardContainerEl.appendChild(eventCardLinkContainerEl);
      
 
}

const displayRestDetails = function (restaurant) {

      const restaurantName = restaurant.name;
      const restAddress = restaurant.location.address;
      const restPhone = restaurant.phone_numbers;
      const restTimings = restaurant.timings;
      const restPrice = restaurant.price_range;
      const restImage = restaurant.featured_image;
      const restLink = restaurant.menu_url

      restCardContainerEl.innerHTML = "";
      restCardLinkContainerEl.innerHTML = "";
      restCardImageContainerEl.innerHTML = "";

      restCardContainerEl.appendChild(restCardImageContainerEl);
      restCardImageContainerEl.innerHTML +=`<img class="card-image" src="${restImage}">`;
      restCardContainerEl.innerHTML += `<p class="card-content">Name: ${restaurantName}<br />Address: ${restAddress}<br/ >Phone: ${restPhone}<br />Offerings: ${restTimings}<br />Price: ${restPrice}</p>`;
      restCardLinkContainerEl.innerHTML += `<a class="card-action" target="blank" href=${restLink}>Menu</a>`;
      restCardContainerEl.appendChild(restCardLinkContainerEl);

}

document.getElementById("search").addEventListener("click", function (event) {
  event.preventDefault();
  const city = document.getElementById("events").value;
  getData(city);
  displayNames(city);
});
  