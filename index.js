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
