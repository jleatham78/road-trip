const eventContainerEl = document.getElementById("events-container");
const food_KEY = "4e2bcc2c6d960eec2150089303018710";
const event_KEY = "RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
const city = document.getElementById("events").value;
const city_URL =
  "https://developers.zomato.com/api/v2.1/locations?&query=" + city;
// document.addEventListener("DOMContentLoaded", function () {
//   const elems = document.querySelectorAll(".datepicker");
//   const instances = M.Datepicker.init(elems, format);
// });

const getRestaurants = function () {
  fetch(city_URL, {
    headers: {
      "user-key": food_KEY,
    },
  }).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      const entityId = data.location_suggestions[0].city_id;
      const food_URL =
        `https://developers.zomato.com/api/v2.1/search?&entity_type=city&entity_id=` +
        entityId;
      fetch(food_URL, {
        headers: {
          "user-key": food_KEY,
        },
      }).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          return;
        });
      });
    });
  });
};

const getEvents = function () {
  const city = document.getElementById("events").value;
  const event_URL =
    "https://app.ticketmaster.com/discovery/v2/events.json?&city=" +
    city +
    "&apikey=RpHsNFdNJ9Ukvz7Qw5PwGoIRGwUTzyDP";
  fetch(event_URL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayEvents(data, city);
      console.log(city);
    });
  });
};

const displayEvents = function (data, searchTerm) {
  city.textContent = searchTerm;
  var events = data._embedded.events;
  for (i = 0; i < 5; i++) {
    var eventName = events[i].name;
    var eventDate = events[i].dates.start.localDate;
    var eventEl = document.createElement("a");
    eventEl.classList = "collection-item";
    eventEl.textContent = eventName + eventDate;

    eventContainerEl.appendChild(eventEl);
  }
};

document.getElementById("search").addEventListener("click", getEvents);
document.getElementById("search").addEventListener("click", getRestaurants);
// getEvents();
// getRestaurants();

// linking ticketmaster API fetch
