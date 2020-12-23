const eventContainerEl = document.getElementById("events-container");
const restContainerEl = document.getElementById("restaurant-container");
const food_KEY = "4e2bcc2c6d960eec2150089303018710";
const event_KEY = "RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
let cityListName = document.getElementById("city-name");
let restListName = document.getElementById("rest-name");
const cityTitleEl = document.querySelector(".city-title");

const getData = function (city) {
  getEvents(city).then((data) => getRestaurants(data.latitude, data.longitude));
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
    response.json().then(function (data, city) {
      console.log(data);
      displayRestaurants(data, city);
      console.log(data.restaurants[0].restaurant.name);
      return;
    });
  });
};

const getEvents = function (city) {
  return new Promise(function (resolve, reject) {
    const event_URL =
      "https://app.ticketmaster.com/discovery/v2/events.json?&city=" +
      city +
      "&apikey=RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
    fetch(event_URL).then(function (response) {
      response.json().then(function (data, city) {
        console.log(data, city);
        displayEvents(data, city);
        resolve(data._embedded.events[0]._embedded.venues[0].location);
        console.log(city);
      });
    });
    displayNames();
  });
};

const displayEvents = function (data, city) {
  const events = data._embedded.events;
  for (let i = 0; i < 5; i++) {
    const eventName = events[i].name;
    const eventDate = events[i].dates.start.localDate;
    eventContainerEl.innerHTML += `<a class="collection-item" data-id="${i}">Name: ${eventName}<br />Date: ${eventDate}</a>`;
  }
};

const displayNames = function (city) {
  cityTitleEl.innerHTML = `<h5>Event Results for: ${city}</h5>`;
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

document.getElementById("search").addEventListener("click", function (event) {
  event.preventDefault();
  const city = document.getElementById("events").value;
  getData(city);
  displayNames(city);
});
