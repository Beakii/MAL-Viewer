var currentState = "watching";
var navWatching, navCompleted, navFuture;

//getting html elements
navWatching = document.getElementById("watching");
navCompleted = document.getElementById("completed"); 
navFuture = document.getElementById("future");

//adding eventlisteners to navbar
navWatching.addEventListener("click", ()=>{currentState = "watching";      renderAnime(currentState, jsonWatching);});
navCompleted.addEventListener("click", ()=>{currentState = "completed";    renderAnime(currentState, jsonCompleted);});
navFuture.addEventListener("click", ()=>{currentState = "future";          renderAnime(currentState, jsonPlanToWatch);});

window.onload = function(){
    document.getElementById("username-title").innerText = "I'm loading, give me time! :D";
}

function renderAnime(currentState, jsonResponse){
    //Clear any existing elements.
    document.getElementById("mal-info").innerHTML = "";

    switch(currentState){
        case "watching":
            document.getElementById("list-counter").innerText = Object.keys(jsonResponse["anime"]).length + " Animes Found"
            navWatching.classList.add("selected");
            navCompleted.classList.remove("selected");
            navFuture.classList.remove("selected");
            renderWatching(jsonResponse);
        break;

        case "completed":
            document.getElementById("list-counter").innerText = Object.keys(jsonResponse["anime"]).length + " Animes Found"
            navWatching.classList.remove("selected");
            navCompleted.classList.add("selected");
            navFuture.classList.remove("selected");
            renderCompleted(jsonResponse);
        break;

        case "future":
            document.getElementById("list-counter").innerText = Object.keys(jsonResponse["anime"]).length + " Animes Found"
            navWatching.classList.remove("selected");
            navCompleted.classList.remove("selected");
            navFuture.classList.add("selected");
            renderPtw(jsonResponse);
        break;
    }
}

function renderWatching(watching){
    if(watching["anime"]){
        //Remove any existing elements
        console.log("deleting elements...");
    
        //Itterate over json to add elements
        console.log("re-adding animes...");
        watching["anime"].forEach(function(element, index){

            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index)
            wrapperDiv.setAttribute("class", "anime-card")
            document.getElementById("mal-info").appendChild(wrapperDiv);
            
            var title = document.createElement("h2");                 
            title.innerHTML = element["title"];                
            document.getElementById("anime-wrapper" + index).appendChild(title);
    
            var episode = document.createElement("p");                 
            episode.innerHTML = "Episode: " + element["watched_episodes"] + " / " + (element["total_episodes"] ? element["total_episodes"] : "?");                
            document.getElementById("anime-wrapper" + index).appendChild(episode);
    
            var img = document.createElement("img");
            img.src = element["image_url"];
            document.getElementById("anime-wrapper" + index).appendChild(img);
        });
    }
    else{
        document.getElementById("mal-info").innerText = "No information was found... :("
    }
}

function renderCompleted(completed){
    if(completed["anime"]){
        //Remove any existing elements
        console.log("deleting elements...");
    
        //Itterate over json to add elements
        console.log("re-adding animes...");
        completed["anime"].forEach(function(element, index){

            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index)
            wrapperDiv.setAttribute("class", "anime-card")
            document.getElementById("mal-info").appendChild(wrapperDiv);
            
            var title = document.createElement("h2");                 
            title.innerHTML = element["title"];                
            document.getElementById("anime-wrapper" + index).appendChild(title);
    
            var img = document.createElement("img");
            img.src = element["image_url"];
            document.getElementById("anime-wrapper" + index).appendChild(img);
        });
    }
    else{
        document.getElementById("mal-info").innerText = "No information was found... :("
    }
}

function renderPtw(planToWatch){
    if(planToWatch["anime"]){
        //Remove any existing elements
        console.log("deleting elements...");
    
        //Itterate over json to add elements
        console.log("re-adding animes...");
        planToWatch["anime"].forEach(function(element, index){

            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index)
            wrapperDiv.setAttribute("class", "anime-card")
            document.getElementById("mal-info").appendChild(wrapperDiv);
            
            var title = document.createElement("h2");                 
            title.innerHTML = element["title"];                
            document.getElementById("anime-wrapper" + index).appendChild(title);
    
            var img = document.createElement("img");
            img.src = element["image_url"];
            document.getElementById("anime-wrapper" + index).appendChild(img);
        });
    }
    else{
        document.getElementById("mal-info").innerText = "No information was found... :("
    }
}