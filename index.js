let worker;

function startWorker() {
  if (typeof Worker !== undefined) {
    if (worker === undefined) {
      worker = new Worker("worker.js");
    }
    worker.onmessage = function (event) {
      console.log("event", event.data);
      document.getElementById("output").innerHTML = event.data;
    };
  } else {
    document.getElementById("output").innerHTML =
      "Sorry, your browser does not support Web Workers.";
  }
}

function stopWorker() {
  worker.terminate();
  worker = undefined;
}


// ***** service worker registeration *******

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// **** Enabled push notification and need to subscribed to user 

if("Notification" in window && navigator.serviceWorker) {
  console.log("Notification");
  Notification.requestPermission(permission => {
    if(permission === "granted") {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: "YOUR_PUBLIC_VAPID_KEY"
        }).then((subscribe) => {
          console.log("User is subscribed :", subscribe);
        }).catch((error) => {
          console.log("Failed to subscribed to user :", error);
        })
      }); 
    }
  });
}
