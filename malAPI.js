async function getMALInfo(username){
    const watchingResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/watching`);
    const jsonWatching = await watchingResponse.json();

    const completedResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/completed`);
    const jsonCompleted = await completedResponse.json();

    const planToWatchResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/animelist/ptw`);
    const jsonPlanToWatch = await planToWatchResponse.json();
    
    const readingResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/mangalist/reading`);
    const jsonReading = await readingResponse.json();

    const mangaCompletedResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/mangalist/completed`);
    const mangaJsonCompleted = await mangaCompletedResponse.json();

    const mangaPlanToWatchResponse = await fetch(`https://api.jikan.moe/v3/user/${username}/mangalist/ptr`);
    const mangaJsonPlanToWatch = await mangaPlanToWatchResponse.json(); 

    return list = {
        animeWatching: jsonWatching,
        animeCompleted: jsonCompleted,
        animeFuture: jsonPlanToWatch,
        mangaReading: jsonReading,
        mangaCompleted: mangaJsonCompleted,
        mangaFuture: mangaJsonPlanToWatch
    };
}