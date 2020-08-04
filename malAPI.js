var hasLoadedAPI = false;
const twitch = window.Twitch.ext;

async function getMALInfo(username){
    const watchingResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/watching`);
    jsonWatching = await watchingResponse.json();

    const completedResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/completed`);
    jsonCompleted = await completedResponse.json();

    const planToWatchResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/ptw`);
    jsonPlanToWatch = await planToWatchResponse.json();  
    
    renderAnime("watching", jsonWatching);
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
    
            getMALInfo(username);
        }
        catch(e){
            console.log(e);
        }
    }
});


    