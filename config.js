const twitch = window.Twitch.ext;

  // onAuthorized callback called each time JWT is fired
  twitch.onAuthorized((auth) => {
    // save our credentials
    token = auth.token; 
    userId = auth.userId;

    if(twitch.configuration.broadcaster.content){
      const jsonRet = JSON.parse(twitch.configuration.broadcaster.content);
      const prevUsername = jsonRet["username"];
      const prevNavColor = jsonRet["navColor"];
      const prevNavTextColor = jsonRet["navTextColor"];
      const prevListTextColor = jsonRet["listTextColor"];
      const prevCardAccentColor = jsonRet["cardAccentColor"];
      const prevCardTextColor = jsonRet["cardTextColor"];
      const prevBackground = jsonRet["backgroundColor"];

      if(prevNavColor){
        document.getElementById("nav-color").value = prevNavColor;
      }

      if(prevNavTextColor){
        document.getElementById("nav-text-color").value = prevNavTextColor;
      }

      if(prevListTextColor){
        document.getElementById("list-text-color").value = prevListTextColor;
      }

      if(prevCardAccentColor){
        document.getElementById("card-accent-color").value = prevCardAccentColor;
      }

      if(prevCardTextColor){
        document.getElementById("card-text-color").value = prevCardTextColor;
      }

      if(prevBackground){
        document.getElementById("app-background").value = prevBackground;
      }

      if(prevUsername){
        document.getElementById("username").value = prevUsername;
        document.getElementById("current-username").innerText = "Current MAL Username: " + prevUsername;
      }
    }
  
    document.getElementById("update-button").addEventListener("click", updateConfig);

    //RESET DEFAULTS
    document.getElementById("reset-button").addEventListener("click", function(){
      document.getElementById("nav-color").value = "#9147ff";
      document.getElementById("nav-text-color").value = "#ffffff";
      document.getElementById("list-text-color").value = "#ffffff";
      document.getElementById("card-accent-color").value = "#9147ff";
      document.getElementById("card-text-color").value = "#ffffff";
      document.getElementById("app-background").value = "#18181b";
      updateConfig();
    });

    function updateConfig(){
        const setUsername = document.getElementById("username").value;
        const setNavColor = document.getElementById("nav-color").value;
        const setNavTextColor = document.getElementById("nav-text-color").value;
        const setListTextColor = document.getElementById("list-text-color").value;
        const setCardAccentColor = document.getElementById("card-accent-color").value;
        const setCardTextColor = document.getElementById("card-text-color").value;
        const setAppBackground = document.getElementById("app-background").value;

        if(setUsername == ""){
          document.getElementById("error-message").innerText = "Username box was left empty!";
          document.getElementById("update-button").style.backgroundColor = "";
        }
        else{
          document.getElementById("error-message").innerText = "";
          twitch.configuration.set("broadcaster", 1, JSON.stringify(
            {
              username: setUsername,
              navColor: setNavColor,
              navTextColor: setNavTextColor,
              listTextColor: setListTextColor,
              cardAccentColor: setCardAccentColor,
              cardTextColor: setCardTextColor,
              backgroundColor: setAppBackground
            }
          ));

          document.getElementById("current-username").innerText = "Current MAL Username: " + setUsername;
          document.getElementById("update-button").style.backgroundColor = "lightgreen";
        }
    }
  });

