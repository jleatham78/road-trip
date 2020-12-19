const API_KEY = "4e2bcc2c6d960eec2150089303018710"
const API_URL = `https://developers.zomato.com/api/v2.1/search?lat=40.742051&lon=-74.004821`;

var getRestaurants = function () {
    //var apiUrl = "https://developers.zomato.com/api/v2.1/search?entity_type=city"

    fetch(API_URL, 
        {
        headers: 
        {
         'user-key': API_KEY, 
         }
    })
    .then(function(response) {
        return response.json();
      })
       .then(function(response) {
        console.log(response);
    })
}

getRestaurants()



