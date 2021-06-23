var languageButtonsE1 = document.querySelector("#language-buttons");
var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");
var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    //get value from  input element
    var username = nameInputE1.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputE1.value = "";  // sets the textbox back to empty
    } else {
        alert("Please enter a GitHub username");
    }
};

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
          alert("Error: GitHub User Not Found");
        }
      })
      .catch(function(error){
          // Notice this `.catch()` getting chained onto the end of the `.then()` method
          alert("Unable to connect to GitHub");
      })
};


var displayRepos = function(repos, searchTeam) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerE1.textContent = "NO repositories found";
        return;
    }
    console.log(repos);
    console.log(searchTeam);
    // clear old content
    repoContainerE1.textContent = "";
    repoSearchTerm.textContent = searchTeam;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoE1 = document.createElement("a");
        repoE1.classList = "list-item flex-row justify-space-between align-center";
        repoE1.setAttribute("href", "./single-repo.html?repo=" + repoName);


        //create a span element to hold repository name
        var titleE1 = document.createElement("span");
        titleE1.textContent = repoName;

        // append to container
        repoE1.appendChild(titleE1);

        // create a status element
        var statusE1 = document.createElement("span");
        statusE1.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusE1.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";            
        } else {
            statusE1.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoE1.appendChild(statusE1);        

        //append container to the dom
        repoContainerE1.appendChild(repoE1);
    }
};

var getFeatureRepos = function(language) {

    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                displayRepos(data.items, language);
                console.log(data);
            });            
        } else {
            alert('Error: GitHub user not found');
        }
    });
};

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language")
    console.log(language);

    if (language) {
        getFeatureRepos(language);

        repoContainerE1.textContent = "";
    }
};

userFormE1.addEventListener("submit", formSubmitHandler);

languageButtonsE1.addEventListener("click", buttonClickHandler);
