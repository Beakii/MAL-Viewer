const twitch = window.Twitch.ext;

document.getElementById("update-button").addEventListener("click", updateConfig);

  // onAuthorized callback called each time JWT is fired
  twitch.onAuthorized((auth) => {
    // save our credentials
    token = auth.token; 
    userId = auth.userId; 

    document.getElementById("update-button").addEventListener("click", updateConfig);

    function updateConfig(){
        const setUsername = document.getElementById("username").value;
        twitch.configuration.set("broadcaster", 1, JSON.stringify(
          {
            username: setUsername
          }
      ));

      document.getElementById("update-button").style.backgroundColor = "lightgreen";
      document.getElementById("update-button").innerText = "Done";
    }
  });

