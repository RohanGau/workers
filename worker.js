let counter = 0;

function incremental() {
  counter++;
  postMessage(counter);
}

setInterval(incremental, 1000);
