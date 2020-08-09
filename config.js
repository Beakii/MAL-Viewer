const twitch = window.Twitch.ext;

document.getElementById("header-text-color").oninput = function(){
  document.getElementById("head-text").style.setProperty("color", document.getElementById("header-text-color").value);
}
document.getElementById("selector-color").oninput = function(){
  document.getElementById("enable-manga").style.setProperty("color", document.getElementById("selector-color").value);
}
document.getElementById("header-background-color").oninput = function(){
  document.getElementById("extension-header").style.setProperty("background-color", document.getElementById("header-background-color").value);
}

document.getElementById("nav-color").oninput = function(){
  document.getElementById("navbar").style.setProperty("background-color", document.getElementById("nav-color").value);
}
document.getElementById("nav-text-color").oninput = function(){
  document.getElementById("navbar").style.setProperty("color", document.getElementById("nav-text-color").value);
}

document.getElementById("list-text-color").oninput = function(){
  document.getElementById("list-counter").style.setProperty("color", document.getElementById("list-text-color").value);
}

document.getElementById("card-accent-color").oninput = function(){
  document.getElementById("anime-wrapper32").style.setProperty("background-color", document.getElementById("card-accent-color").value);
}
document.getElementById("card-text-color").oninput = function(){
  document.getElementById("anime-wrapper32").style.setProperty("color", document.getElementById("card-text-color").value);
}

document.getElementById("app-background").oninput = function(){
  document.getElementById("live-preview").style.setProperty("background-color", document.getElementById("app-background").value);
}

  // onAuthorized callback called each time JWT is fired
  twitch.onAuthorized((auth) => {
    // save our credentials
    token = auth.token; 
    userId = auth.userId;

    if(twitch.configuration.broadcaster.content){
      const jsonRet = JSON.parse(twitch.configuration.broadcaster.content);
      const prevUsername = jsonRet["username"];
      const prevHeadTextColor = jsonRet["headTextColor"];
      const prevSelectorColor = jsonRet["selectorColor"];
      const prevHeadBackgroundColor = jsonRet["headBackgroundColor"];
      const prevNavColor = jsonRet["navColor"];
      const prevNavTextColor = jsonRet["navTextColor"];
      const prevListTextColor = jsonRet["listTextColor"];
      const prevCardAccentColor = jsonRet["cardAccentColor"];
      const prevCardTextColor = jsonRet["cardTextColor"];
      const prevBackground = jsonRet["backgroundColor"];

      if(prevHeadTextColor){
        document.getElementById("header-text-color").value = prevHeadTextColor;
        document.getElementById("head-text").style.setProperty("color", prevHeadTextColor);
      }

      if(prevSelectorColor){
        document.getElementById("selector-color").value = prevSelectorColor;
        document.getElementById("enable-manga").style.setProperty("color", prevSelectorColor);
      }

      if(prevHeadBackgroundColor){
        document.getElementById("header-background-color").value = prevHeadBackgroundColor;
        document.getElementById("extension-header").style.setProperty("background-color", prevHeadBackgroundColor);
      }
      
      if(prevNavColor){
        document.getElementById("nav-color").value = prevNavColor;
        document.getElementById("navbar").style.setProperty("background-color", prevNavColor);
      }

      if(prevNavTextColor){
        document.getElementById("nav-text-color").value = prevNavTextColor;
        document.getElementById("navbar").style.setProperty("color", prevNavTextColor);
      }

      if(prevListTextColor){
        document.getElementById("list-text-color").value = prevListTextColor;
        document.getElementById("list-counter").style.setProperty("color", prevListTextColor);
      }

      if(prevCardAccentColor){
        document.getElementById("card-accent-color").value = prevCardAccentColor;
        document.getElementById("anime-wrapper32").style.setProperty("background-color", prevCardAccentColor);
      }

      if(prevCardTextColor){
        document.getElementById("card-text-color").value = prevCardTextColor;
        document.getElementById("anime-wrapper32").style.setProperty("color", prevCardTextColor);
      }

      if(prevBackground){
        document.getElementById("app-background").value = prevBackground;
        document.getElementById("live-preview").style.setProperty("background-color", prevBackground);
      }

      if(prevUsername){
        document.getElementById("username").value = prevUsername;
        document.getElementById("current-username").innerText = "Current MAL Username: " + prevUsername;
      }
    }
  
    document.getElementById("update-button").addEventListener("click", updateConfig);

    //RESET DEFAULTS
    document.getElementById("reset-button").addEventListener("click", function(){

      document.getElementById("header-text-color").value = "#ffffff";
      document.getElementById("selector-color").value = "#ffffff";
      document.getElementById("header-background-color").value = "#a467ff";
      document.getElementById("nav-color").value = "#9147ff";
      document.getElementById("nav-text-color").value = "#ffffff";
      document.getElementById("list-text-color").value = "#ffffff";
      document.getElementById("card-accent-color").value = "#9147ff";
      document.getElementById("card-text-color").value = "#ffffff";
      document.getElementById("app-background").value = "#18181b";


      document.getElementById("head-text").style.setProperty("color", "#ffffff");
      document.getElementById("enable-manga").style.setProperty("color", "#ffffff");
      document.getElementById("extension-header").style.setProperty("background-color", "#a467ff");
      document.getElementById("navbar").style.setProperty("background-color", "#9147ff");
      document.getElementById("navbar").style.setProperty("color", "#ffffff");
      document.getElementById("list-counter").style.setProperty("color", "#ffffff");
      document.getElementById("anime-wrapper32").style.setProperty("background-color", "#9147ff");
      document.getElementById("anime-wrapper32").style.setProperty("color", "#ffffff");
      document.getElementById("live-preview").style.setProperty("background-color", "#18181b");
    });

    function updateConfig(){
        const setUsername = document.getElementById("username").value;
        const setHeadTextColor = document.getElementById("header-text-color").value;
        const setSelectorColor = document.getElementById("selector-color").value;
        const setHeadBackgroundColor = document.getElementById("header-background-color").value;
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
          document.getElementById("error-message").innerText = "Configuration Saved!";
          twitch.configuration.set("broadcaster", 1, JSON.stringify(
            {
              username: setUsername,
              headTextColor: setHeadTextColor,
              selectorColor: setSelectorColor,
              headBackgroundColor: setHeadBackgroundColor,
              navColor: setNavColor,
              navTextColor: setNavTextColor,
              listTextColor: setListTextColor,
              cardAccentColor: setCardAccentColor,
              cardTextColor: setCardTextColor,
              backgroundColor: setAppBackground
            }
          ));

          document.getElementById("current-username").innerText = "Current MAL Username: " + setUsername;
          document.getElementById("update-button").style.setProperty("background-color", "lightgreen")

          setTimeout(function(){
            document.getElementById("error-message").innerText = "";
            document.getElementById("update-button").style.setProperty("background-color", "");
          }, 5000);
        }
    }
  });

