const twitch = window.Twitch.ext;
var currentState = "watching";
var navState = "anime";
var isAnime = true;
var firstLoad = true;
var configExists = false;
var setHeadTextColor, setSelectorColor, setHeadBackgroundColor, setNavColor, setNavTextColor, setCardAccentColor, setCardTextColor, setListCounterColor, setBackgroundColor;
var watchingList, completedAnimeist, plantowatchList, readingList, completedMangaList, plantoreadList;

//getting html elements
var extensionHeader = document.getElementById("extension-header");
var enableManga = document.getElementById("enable-manga");
var enableAnime = document.getElementById("enable-anime");
var navWatching = document.getElementById("watching");
var navCompleted = document.getElementById("completed"); 
var navFuture = document.getElementById("future");
var navbar = document.getElementById("navbar");

var loader = document.getElementById("loader");
var listCounter = document.getElementById("list-counter");
var malInfo = document.getElementById("mal-info");
var animeCard = document.getElementById("anime-large-cards");

//THIS HAPPENS ON INITIAL LOAD
twitch.onAuthorized(function(auth){
    listCounter.innerText = "";

    try{
        const config = twitch.configuration.broadcaster.content;
        configExists = true;
    }
    catch(e){
        buildSetConfigMessage();
    }

    if(configExists){
        const myJSON = JSON.parse(twitch.configuration.broadcaster.content)

        //UPDATE THIS IF CHECK WHEN NEW VERSIONS RELEASE WITH NEW CONFIG INFO
        if(!myJSON["headTextColor"]){
            buildSetConfigMessage("A new version has been released!");
        }
        else{
            const username = myJSON["username"];
            setHeadTextColor = myJSON["headTextColor"];
            setSelectorColor = myJSON["selectorColor"];
            setHeadBackgroundColor = myJSON["headBackgroundColor"];
            setNavColor = myJSON["navColor"];
            setNavTextColor = myJSON["navTextColor"];
            setListCounterColor = myJSON["listTextColor"];
            setCardAccentColor = myJSON["cardAccentColor"];
            setCardTextColor = myJSON["cardTextColor"];
            setBackgroundColor = myJSON["backgroundColor"];
    
            promise = getMALInfo(username);
            promise.then(onMALSuccess, onMALFail);
        }
    }
    else{
        buildSetConfigMessage();
    }
});

function buildSetConfigMessage(){
    loader.style.setProperty("display", "none");
    document.getElementById("body").style.setProperty("background-color", "#0e0e10");
    listCounter.style.setProperty("color", "white");
    listCounter.innerHTML = "Please configure the <a target='_blank' href='https://dashboard.twitch.tv/extensions/w31mkd2ijawq6agtwbq84jr7z5p3d7-1.1'>extension</a> from the creator dashboard. <br><br> :(";
}

function onMALSuccess(malJson){
    watchingList = malJson["animeWatching"];
    completedList = malJson["animeCompleted"];
    plantowatchList = malJson["animeFuture"];
    readingList = malJson["mangaReading"];
    completedMangaList = malJson["mangaCompleted"];
    plantoreadList = malJson["mangaFuture"];

    updateColors();
    renderLists("watching", watchingList);
}

function onMALFail(error){
    console.log("If you are a smarty-pants and looked in the console to see the error, here it is: " + error);
    loader.style.setProperty("display", "none");
    document.getElementById("body").style.setProperty("background-color", "#0e0e10");
    listCounter.innerText = "Something went wrong retrieving data from MAL. If this problem persists check to see if the MAL service is up and running.";
    listCounter.style.setProperty("color", "white");
}

//AFTER INIT LOAD.............................

//adding eventlisteners to navbar
navWatching.addEventListener("click", ()=>{currentState = "watching";       renderLists(currentState, (isAnime ? watchingList : readingList));});
navCompleted.addEventListener("click", ()=>{currentState = "completed";     renderLists(currentState, (isAnime ? completedList : completedMangaList));});
navFuture.addEventListener("click", ()=>{currentState = "future";           renderLists(currentState, (isAnime ? plantowatchList : plantoreadList));});

enableManga.addEventListener("click", enableMangaLists);
enableAnime.addEventListener("click", enableAnimeLists);

function enableMangaLists(){
    navWatching.innerText = "Reading";
    extensionHeader.innerText = "Manga";
    enableManga.style.setProperty("display", "none");
    enableAnime.style.setProperty("display", "block");
    isAnime = false;
    navState = "manga"; 
    currentState = "watching";  

    renderLists(currentState, readingList);
}

function enableAnimeLists(){
    navWatching.innerText = "Watching";
    extensionHeader.innerText = "Anime"
    enableManga.style.setProperty("display", "block");
    enableAnime.style.setProperty("display", "none");
    isAnime = true;
    navState = "anime"; 
    currentState = "watching"; 

    renderLists(currentState, watchingList);
}

function renderLists(currentState, jsonResponse){
    //Need to find a way to prevent enablemanga from display block EVERY load.
    if(firstLoad){
        firstLoad = false;
        extensionHeader.style.setProperty("display", "flex");
        enableManga.style.setProperty("display", "block");
    }
    navbar.style.setProperty("display", "block");
    loader.style.setProperty("display", "none");

    //Clear any existing elements.
    malInfo.innerHTML = "";
    animeCard.innerHTML = "";

    switch(navState){
        case "anime":
            switch(currentState){
                case "watching":
                    listCounter.innerText = Object.keys(jsonResponse["anime"]).length + " Animes Found"
                    navWatching.classList.add("selected");
                    navCompleted.classList.remove("selected");
                    navFuture.classList.remove("selected");
                    populateLists(jsonResponse);
                break;
        
                case "completed":
                    listCounter.innerText = Object.keys(jsonResponse["anime"]).length + " Animes Found"
                    navWatching.classList.remove("selected");
                    navCompleted.classList.add("selected");
                    navFuture.classList.remove("selected");
                    populateLists(jsonResponse);
                break;
        
                case "future":
                    listCounter.innerText = Object.keys(jsonResponse["anime"]).length + " Animes Found"
                    navWatching.classList.remove("selected");
                    navCompleted.classList.remove("selected");
                    navFuture.classList.add("selected");
                    populateLists(jsonResponse);
                break;
            }
        break;

        case "manga":
            switch(currentState){
                case "watching":
                    listCounter.innerText = Object.keys(jsonResponse["manga"]).length + " Mangas Found"
                    navWatching.classList.add("selected");
                    navCompleted.classList.remove("selected");
                    navFuture.classList.remove("selected");
                    populateLists(jsonResponse);
                break;
        
                case "completed":
                    listCounter.innerText = Object.keys(jsonResponse["manga"]).length + " Mangas Found"
                    navWatching.classList.remove("selected");
                    navCompleted.classList.add("selected");
                    navFuture.classList.remove("selected");
                    populateLists(jsonResponse);
                break;
        
                case "future":
                    listCounter.innerText = Object.keys(jsonResponse["manga"]).length + " Mangas Found"
                    navWatching.classList.remove("selected");
                    navCompleted.classList.remove("selected");
                    navFuture.classList.add("selected");
                    populateLists(jsonResponse);
                break;
            }
        break;
    }
}

function populateLists(animeList){
    if(animeList[navState]){
        //Itterate over json to add elements
        animeList[navState].forEach(function(element, index){
            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute("id", "anime-wrapper" + index)
            wrapperDiv.setAttribute("class", "anime-card")
            wrapperDiv.style.setProperty("color", setCardTextColor);
            wrapperDiv.style.setProperty("background-color", setCardAccentColor);
            wrapperDiv.style.setProperty("display", "none");

            document.getElementById("anime-large-cards").appendChild(wrapperDiv);

            var title = document.createElement("h2");
            title.innerHTML = element["title"];
            document.getElementById("anime-wrapper" + index).appendChild(title);

            //IF in watching, show episode progress, if in completed show score.
            switch(currentState){
                case "watching":
                    var episode = document.createElement("p");                 
                    episode.innerHTML = "Episode: " + element["watched_episodes"] + " / " + (element["total_episodes"] ? element["total_episodes"] : "Unknown");                
                    document.getElementById("anime-wrapper" + index).appendChild(episode);
                break;

                case "completed":
                    var score = document.createElement("p");
                    if(element["score"] != 0){
                        score.innerHTML = "Rating: " + element["score"] + " / " + "10";   
                    }
                    else{
                        score.innerText = "Not Rated"
                    }                 
                    document.getElementById("anime-wrapper" + index).appendChild(score);
                break;
            }

            var listImage = document.createElement("img");
            var img = document.createElement("img");
            img.src = element["image_url"];
            listImage.src = element["image_url"];
            listImage.setAttribute("class", "list-image");
            listImage.setAttribute("id", "list-image" + index);
            document.getElementById("anime-wrapper" + index).appendChild(img);
            malInfo.appendChild(listImage);

            //Adding filter and making element appear
            document.getElementById("list-image" + index).addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "block");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "flex");
                malInfo.style.setProperty("filter", "grayscale(50%) brightness(0.5)");
            });

            //Removing filter and making element dissappear
            wrapperDiv.addEventListener("click", ()=>{
                document.getElementById("blocker-element").style.setProperty("display", "none");
                document.getElementById("anime-wrapper" + index).style.setProperty("display", "none");
                document.getElementById("mal-info").style.setProperty("filter", "grayscale(0%) brightness(1)");
            });
        });
    }
    else{
        listCounter.innerText = "No information was found... :("
    }
}

function updateColors(){
    document.getElementById("extension-header").style.setProperty("color", setHeadTextColor);
    document.getElementById("enable-manga").style.setProperty("color", setSelectorColor);
    document.getElementById("enable-anime").style.setProperty("color", setSelectorColor);
    document.getElementById("extension-header").style.setProperty("background-color", setHeadBackgroundColor);
    document.getElementById("navbar").style.setProperty("background-color", setNavColor);
    document.getElementById("navbar").style.setProperty("color", setNavTextColor);
    document.getElementById("body").style.setProperty("background-color", setBackgroundColor);
    document.getElementById("list-counter").style.setProperty("color", setListCounterColor);
}