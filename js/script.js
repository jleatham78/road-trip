const eventContainerEl = document.getElementById("events-container");
const restContainerEl = document.getElementById("restaurant-container");
const food_KEY = "4e2bcc2c6d960eec2150089303018710";
const event_KEY = "RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
const city = document.getElementById("events").value;
const cityListName = document.getElementById("city-name");
const restListName = document.getElementById("rest-name");

//   "https://developers.zomato.com/api/v2.1/locations?&query=" + city;
// document.addEventListener("DOMContentLoaded", function () {
//   const elems = document.querySelectorAll(".datepicker");
//   const instances = M.Datepicker.init(elems, format);
// });

const getData = function () {
  getEvents().then((data) => getRestaurants(data.latitude, data.longitude));
};

const getRestaurants = function (lat, lon) {
  // fetch(city_URL, {
  //   headers: {
  //     "user-key": food_KEY,
  //   },
  // }).then(function (response) {
  // response.json().then(function (data) {
  // console.log(data);
  // const entityId = data.location_suggestions[0].city_id;

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
      displayRestaurants(data, city);
      console.log(data.restaurants[0].restaurant.name);
      return;
    });
  });
  // });
  // });
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
        displayEvents(data, city);
        //displayNames(city);
        resolve(data._embedded.events[0]._embedded.venues[0].location);
        console.log(city);
      });
    });
  });
};

const displayEvents = function (data) {
  //city.textContent = searchTerm;
  const events = data._embedded.events;
  for (let i = 0; i < 5; i++) {
    const eventName = events[i].name;
    const eventDate = events[i].dates.start.localDate;
    eventContainerEl.innerHTML += `<a class="collection-item" data-id="${i}">Name: ${eventName}<br />Date: ${eventDate}</a>`;
  }
};

const displayNames = function () {
  cityListName = city;
  restListName = city;

  const createListEl = document.createElement("h5");
  createListEl.innerHTML = "Event Results " + cityListName;

  eventContainerEl.appendChild(createListEl);

  // var createRestListEl = document.createElement("h5");
  // createRestListEl.innerHTML = "Showing events for " + restListName;
};

const displayRestaurants = function (data) {
  const restaurants = data.restaurants;
  let i = 0;
  for (i = 0; i < 5; i++) {
    const restName = restaurants[i].restaurant.name;
    const restEst = restaurants[i].restaurant.establishment[0];
    const restCuis = restaurants[i].restaurant.cuisineconst;
    const restEl = document.createElement("a");
    restEl.classList = "collection-item";
    restEl.innerHTML =
      "Name: " +
      restName +
      "<br>" +
      " Type: " +
      restEst +
      "<br>" +
      " Cuisine: " +
      restCuis;

    restContainerEl.appendChild(restEl);
  }
};

document.getElementById("search").addEventListener("click", function (event) {
  event.preventDefault();
  getData();
  displayNames();
});

// getEvents();
// getRestaurants();

// linking ticketmaster API fetch
