var issuesContainerE1 = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        // request was successful
        if (response.ok) {
            response.json().then(function(data){
                // pass response data to dom function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request");
        }
    })
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issuesContainerE1.textContent = "This repo has no open issues!";
        return;
    }

    for (var i= 0; i <issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueE1 = document.createElement("a")
        issueE1.classList ="list-item flex-row justify-space-between align-center";
        issueE1.setAttribute("href", issues[i].html_url);
        // set will open the issues on a new tab
        issueE1.setAttribute("target", "_blank");

        // create spam to hold issue title
        var titleE1 = document.createElement("span");
        titleE1.textContent = issues[i].title;

        //append to container
        issueE1.appendChild(titleE1);

        // create a type element
        var typeE1 = document.createElement("span");

        //check if issues is an actual issues or a pull request
        if (issues[i].pull_request) {
            typeE1.textContent = "(Pull Request)";            
        } else {
            typeE1.textContent = "(Issues)";
        }

        //append to container
        issueE1.appendChild(typeE1);

        issuesContainerE1.appendChild(issueE1);
    }
};

getRepoIssues();