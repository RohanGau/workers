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
