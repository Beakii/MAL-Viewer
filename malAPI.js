var hasLoadedAPI = false;
var newJsonWatching, newJsonCompleted, newJsonPlanToWatch;

async function getMALInfo(username, configJson){
    const watchingResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/watching`);
    jsonWatching = await watchingResponse.json();

    const completedResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/completed`);
    jsonCompleted = await completedResponse.json();

    const planToWatchResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/ptw`);
    jsonPlanToWatch = await planToWatchResponse.json();  


    if(jsonWatching["status"] == 400){
        jsonWatching = newJsonWatching;
    }

    if(jsonCompleted["status"] == 400){
        jsonWatching = newJsonCompleted;
    }

    if(jsonPlanToWatch["status"] == 400){
        jsonPlanToWatch = newJsonPlanToWatch;
    }
    
    renderAnime("watching", jsonWatching, configJson);
}

twitch.onAuthorized(function(auth){
    // save our credentials
    token = auth.token; 
    userId = auth.userId;
    if(!hasLoadedAPI){
        hasLoadedAPI = true;
        try{
            const myJSON = JSON.parse(twitch.configuration.broadcaster.content)
            const username = myJSON["username"];
    
            getMALInfo(username, myJSON);
        }
        catch(e){
            console.log(e);
        }
    }
});


    