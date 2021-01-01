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
  cityTitleEl.innerHTML = `<h5>Showing Events and Restaurants for ${city}</h5>`;
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

// const displayEventDetails = function (data) {
//   //when user clicks on an event or restaurant 
//   document.querySelectorAll("#events-container").forEach(function(item){
//     item.addEventListener("click", function (index) {

//       const name = data._embedded.events[index].name;
//       const genre = data._embedded.events[index].classifications[0].genre.name;
//       const dates = data._embedded.events[index].dates.start.localDate;
//       const prices = data._embedded.events[index].priceRanges[0].min;
//       const venue = data._embedded.events[index]._embedded.venues[0].name;
//       const address = data._embedded.events[index]._embedded.venues[0].address.line1;
//       const status = data._embedded.events[index].dates.status.code;
//       const url = data._embedded.events[index].url
//       const image = data._embedded.events[index]._embedded.venues[0].images[0].url;
        

//       eventCardImageContainerEl.innerHTML +=`<img class="card-image" src="${image}">`;
//       eventCardContainerEl.innerHTML += `<p class="card-content">Name: ${name}<br />Genre: ${genre}<br/ >Dates: ${dates}<br />Venue: ${venue}<br />Address: ${address}<br />Status: ${status}</p>`;
//       eventCardLinkContainerEl.innerHTML += `<a class="card-action" href=${url}>Purchase Tickets</a>`; 
//       eventCardContainerEl.appendChild(eventCardLinkContainerEl);
//     })
    
//   }) 

// }

const displayEventDetails = function (data) {
  
    document.getElementById("events-container").addEventListener("click", function () {
      for (let i = 0; i < 5; i++) {
        console.log(i);
        if (data._embedded.events[i].indexOf(i)) {
     

      const name = $("<p>").addClass("card-title").text("Name: " + data._embedded.events[i].name);

      const genre = $("<p>").addClass("card-content").text("Type: " + data._embedded.events[i].classifications[0].genre.name);
      const dates = $("<p>").addClass("card-content").text("Dates: " + data._embedded.events[i].dates.start.localDate);
      const prices = $("<p>").addClass("card-content").text("Prices: " + data._embedded.events[i].priceRanges[0].min);
      const venue = $("<p>").addClass("card-content").text("Venue: " + data._embedded.events[i]._embedded.venues[0].name);
      const address = $("<p>").addClass("card-content").text("Address: " + data._embedded.events[i]._embedded.venues[0].address.line1);
      const status = $("<p>").addClass("card-content").text("Status: " + data._embedded.events[i].dates.status.code);
      //const url = $("<a>").addClass("card-action").data._embedded.events[index].url
      //const image = $("<img>").attr("src", + data._embedded.events[index]._embedded.venues[0].images[0].url;
      $("#event-details").append(name, genre, dates, prices, venue, address, status);    

        }
    }
  })
}
  



const displayRestDetails = function (data) {
  //when user clicks on an event or restaurant 
  document.querySelectorAll("#restaurant-container").forEach(function(item, index){
    item.addEventListener("click", function () {
     
      const restaurantName = data.restaurants[index].restaurant.name;
      const restAddress = data.restaurants[index].restaurant.location.address;
      const restPhone = data.restaurants[index].restaurant.phone_numbers;
      const restTimings = data.restaurants[index].restaurant.timings;
      const restPrice = data.restaurants[index].restaurant.price_range;
      const restImage = data.restaurants[index].restaurant.featured_image;
      const restLink = data.restaurants[index].restaurant.menu_url

      restCardImageContainerEl.innerHTML +=`<img class="card-image" src="${restImage}">`;
      restCardContainerEl.innerHTML += `<p class="card-content">Name: ${restaurantName}<br />Address: ${restAddress}<br/ >Phone: ${restPhone}<br />Offerings: ${restTimings}<br />Price: ${restPrice}</p>`;
      restCardLinkContainerEl.innerHTML += `<a class="card-action" href=${restLink}>Menu</a>`;
      restCardContainerEl.appendChild(restCardLinkContainerEl);
  
      
    })
    
  }) 

}
document.getElementById("search").addEventListener("click", function (event) {
  event.preventDefault();
  const city = document.getElementById("events").value;
  getData(city);
  displayNames(city);
});
  