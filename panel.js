const twitch = window.Twitch.ext;
var currentState = "watching";
var navWatching, navCompleted, navFuture;
var jsonWatching, jsonCompleted, jsonPlanToWatch;
var setNavColor, setNavTextColor, setCardAccentColor, setCardTextColor, setListCounterColor, setBackgroundColor;
var firstLoad = true;

//getting html elements
navWatching = document.getElementById("watching");
navCompleted = document.getElementById("completed"); 
navFuture = document.getElementById("future");

//adding eventlisteners to navbar
navWatching.addEventListener("click", ()=>{currentState = "watching";      renderAnime(currentState, jsonWatching);});
navCompleted.addEventListener("click", ()=>{currentState = "completed";    renderAnime(currentState, jsonCompleted);});
navFuture.addEventListener("click", ()=>{currentState = "future";          renderAnime(currentState, jsonPlanToWatch);});

function renderAnime(currentState, jsonResponse, configJson){
    if(firstLoad){
        firstLoad = false;
        setNavColor = configJson["navColor"];
        setNavTextColor = configJson["navTextColor"];
        setListCounterColor = configJson["listTextColor"];
        setCardAccentColor = configJson["cardAccentColor"];
        setCardTextColor = configJson["cardTextColor"];
        setBackgroundColor = configJson["backgroundColor"];

        console.log(setNavTextColor);
        console.log(setNavColor);
    }

    //Clear any existing elements.
    document.getElementById("mal-info").innerHTML = "";
    document.getElementById("anime-large-cards").innerHTML = "";

    if(!jsonResponse){
        document.getElementById("list-counter").style.color = "white";
        document.getElementById("list-counter").innerText = "Something went wrong! :( Please double check the configuration page! MAL Username is either incorrect, or you have no information on your MAL page :( If issue still persists: Contact me on beakiebusiness@gmail.com"
    }
    else{
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

    updateColors();
}

function renderWatching(watching){
    if(watching["anime"]){
        //Itterate over json to add elements
        watching["anime"].forEach(function(element, index){
            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index)
            wrapperDiv.setAttribute("class", "anime-card")
            wrapperDiv.style.setProperty("color", setCardTextColor);
            wrapperDiv.style.setProperty("background-color", setCardAccentColor);
            wrapperDiv.style.setProperty("display", "none");

            //Removing filter and making element dissappear
            wrapperDiv.addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "none");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "none");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(0%) brightness(1)");
            });

            document.getElementById("anime-large-cards").appendChild(wrapperDiv);

            var title = document.createElement("h2");
            title.innerHTML = element["title"];
            document.getElementById("anime-wrapper" + index).appendChild(title);
    
            var episode = document.createElement("p");                 
            episode.innerHTML = "Episode: " + element["watched_episodes"] + " / " + (element["total_episodes"] ? element["total_episodes"] : "?");                
            document.getElementById("anime-wrapper" + index).appendChild(episode);
    
            var listImage = document.createElement("img");
            var img = document.createElement("img");
            img.src = element["image_url"];
            listImage.src = element["image_url"];
            listImage.setAttribute("class", "list-image");
            listImage.setAttribute("id", "list-image" + index);
            document.getElementById("anime-wrapper" + index).appendChild(img);
            document.getElementById("mal-info").appendChild(listImage);

            //Adding filter and making element appear
            document.getElementById("list-image" + index).addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "block");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "flex");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(100%) brightness(0.2)");
            });
        });
    }
    else{
        document.getElementById("mal-info").innerText = "No information was found... :("
    }
}

function renderCompleted(completed){
    if(completed["anime"]){
        completed["anime"].forEach(function(element, index){
            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index);
            wrapperDiv.setAttribute("class", "anime-card");
            wrapperDiv.style.setProperty("color", setCardTextColor);
            wrapperDiv.style.setProperty("background-color", setCardAccentColor);
            wrapperDiv.style.setProperty("display", "none");

            wrapperDiv.addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "none");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "none");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(0%) brightness(1)");
            });

            document.getElementById("anime-large-cards").appendChild(wrapperDiv);

            var title = document.createElement("h2");
            title.innerHTML = element["title"];
            document.getElementById("anime-wrapper" + index).appendChild(title);
    
            var listImage = document.createElement("img");
            var img = document.createElement("img");
            img.src = element["image_url"];
            listImage.src = element["image_url"];
            listImage.setAttribute("class", "list-image");
            listImage.setAttribute("id", "list-image" + index);
            document.getElementById("anime-wrapper" + index).appendChild(img);
            document.getElementById("mal-info").appendChild(listImage);

            document.getElementById("list-image" + index).addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "block");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "flex");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(100%) brightness(0.2)");
            });
        });
    }
    else{
        document.getElementById("mal-info").innerText = "No information was found... :("
    }
}

function renderPtw(planToWatch){
    if(planToWatch["anime"]){
        planToWatch["anime"].forEach(function(element, index){
            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index);
            wrapperDiv.setAttribute("class", "anime-card");
            wrapperDiv.style.setProperty("color", setCardTextColor);
            wrapperDiv.style.setProperty("background-color", setCardAccentColor);
            wrapperDiv.style.setProperty("display", "none");

            wrapperDiv.addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "none");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "none");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(0%) brightness(1)");
            });

            document.getElementById("anime-large-cards").appendChild(wrapperDiv);

            var title = document.createElement("h2");
            title.innerHTML = element["title"];
            document.getElementById("anime-wrapper" + index).appendChild(title);
    
            var listImage = document.createElement("img");
            var img = document.createElement("img");
            img.src = element["image_url"];
            listImage.src = element["image_url"];
            listImage.setAttribute("class", "list-image");
            listImage.setAttribute("id", "list-image" + index);
            document.getElementById("anime-wrapper" + index).appendChild(img);
            document.getElementById("mal-info").appendChild(listImage);

            document.getElementById("list-image" + index).addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "block");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "flex");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(100%) brightness(0.2)");
            });
        });
    }
    else{
        document.getElementById("mal-info").innerText = "No information was found... :("
    }
}

function updateColors(){
    document.getElementById("navbar").style.setProperty("background-color", setNavColor);
    document.getElementById("navbar").style.setProperty("color", setNavTextColor);
    document.getElementById("body").style.setProperty("background-color", setBackgroundColor);
    document.getElementById("list-counter").style.setProperty("color", setListCounterColor);
}