// a server is a piece of hardware set up to provide resources to other devices (i.e. laptops or mobile phones - often called clients). 

// a client requests content or service from a server (i.e. web-browser)

// to obtain information about user accounts on GitHub, you can make a requests to on of GitHub's API endpoints which specifies which resources you can access (i.e. users/<username>)

// data displayed as a JavaScript object format rather than HTML content is called JSON, or JavaScript Object Notation - (JSON is commonly used by APIs to deliver data because developers can easily parse it for the information that they want)

// response is the variable that holds the object data (i.e. location, number of followers, etc.)

// by using curl (curl https://api.github.com/users/octocat/repos) on the terminal, we contacted the GitHub API endpoint and it returned a bunch of JSON data

// curl can only be used in the terminal, however fetch can be used when working in the browser itself

// fetch is used to make an HTTP request to the GitHub API; in turn, GitHub responded with JSON data - relationship: the request originated from the app and the response came from the GitHub's server

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function (user) {
    // format the github api url

    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        // we can check if it was a successful request by using the ok property that's bundled in the response object from fetch()
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // when the response data is converted to JSON, it will be sent from getUserRepos() to displayRepos()
                displayRepos(data, user);
            });
        } else {
            // custome alert message to let the user know that their search was unsuccessful
            alert("Error: GitHub User Not Found");
        }
    })
        // fetch api's way of handling network errors
        .catch(function(error){
            // notice this '.catch()' getting chained onto the end of the '.then()' method
            alert("Unable to connect to Github");
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

var formSubmitHandler = function (event) {
    // stops the browser from performing the default action the event wants it to do; prevents the browser from sending the form's input data to a URL
    event.preventDefault();

    // get value from input element
    // when we submit the form, we get the value from the <input> element via the nameInputEl DOM variable and store the value in its own variable called username; the .trim() is useful if we accidentally leave a leading or trailing space in the <input> element, such as " octocat" or "octocat "
    var username = nameInputEl.value.trim();

    // check that there's a value in that username variable; in the event we accidentally leave the <input> field blank, we wouldn't want to make an HTTP request without a username
    if (username) {
        // if there is in fact a value to username, we pass that data to getUserRepos() as an argument
        getUserRepos(username);
        // clear the form
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

var displayRepos = function (repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    // in the for loop, we're taking each repository (repos[i]) and writing some of its data to the page
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        // we format the appearance of the name and the repository name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        // we create and style a div element
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        // we create a span to hold the formatted repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        // we add that formatted repository name to the div
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        // use if statement to check how many issues the repository has; if the number is greater than zero, then we'll display the number of issues and add a red X icon next to it; if there are no issues, we'll display a blue check mark instead
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        // we add the entire div to the container we created earlier
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);