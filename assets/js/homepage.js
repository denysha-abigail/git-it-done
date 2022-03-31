// a server is a piece of hardware set up to provide resources to other devices (i.e. laptops or mobile phones - often called clients). 

// a client requests content or service from a server (i.e. web-browser)

// to obtain information about user accounts on GitHub, you can make a requests to on of GitHub's API endpoints which specifies which resources you can access (i.e. users/<username>)

// data displayed as a JavaScript object format rather than HTML content is called JSON, or JavaScript Object Notation - (JSON is commonly used by APIs to deliver data because developers can easily parse it for the information that they want)

// response is the variable that holds the object data (i.e. location, number of followers, etc.)

// by using curl (curl https://api.github.com/users/octocat/repos) on the terminal, we contacted the GitHub API endpoint and it returned a bunch of JSON data

// curl can only be used in the terminal, however fetch can be used when working in the browser itself

// fetch is used to make an HTTP request to the GitHub API; in turn, GitHub responded with JSON data - relationship: the request originated from the app and the response came from the GitHub's server

var getUserRepos = function(user) {
    // format the github api url
    
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });

    // returns promise that acts like more advanced callback functions; promises have a method called then() that is called when the promise has been fulfilled
            // var response = fetch("https://api.github.com/users/octocat/repos").then(function(response){
            //     console.log("inside", response);
            //     // format the response to display an array; the response object has a method called json() which formats the response as JSON; if a resource returns non-JSON data, then the text() method would be used; the json() method returns yet another promise, whose callback function captures the actual data
            //     response.json().then(function(data){
            //         console.log(data);
            //     });
            // });
    // this prints out first - asynchronous behavior: JavaScript will set aside the fetch request and continue implementing the rest of your code, then come back and run the fetch callback when the response is ready; this kind of asynchronous communication with a server is often referred to as AJAX (or Asynchronous JavaScript and XML - [old-fashioned way of formatting data replaced by JSON]);
            // console.log("outside");
};

getUserRepos();