"use strict";
let overallIteration = -1;
let divWidth = 0;
let videoSpeed = 1;
let speedFactor = 1.0;
let blue = "#00a8f3";

let startAnimation = async () => {
  const line = document.getElementById("half-grad");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.1;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
};

let fillSyringe = async (x) => {
  if (x === 1 && overallIteration === 1) {
    document.getElementById("line3").style.stopColor = blue;
  }
  const line = document.getElementById("half-grad3");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
  overallIteration++;

  document.getElementById("sample-beaker").style.cursor = "default";
};

async function liftPiston() {
  let image = document.getElementById("syringe-piston");
  image.style.transform = "translate(100%, -5%);";
  image.style.pointerEvents = "none";
  let a1 = anime.timeline({
    targets: "#syringe-piston",
    duration: 800,
    easing: "linear",
  });
  a1.add({
    duration: 0,
    translateY: "8%",
  }).add({
    duration: 800,
    translateY: "-3%",
  });
}

async function moveSyringe() {
  if (overallIteration === 1) {
    document.getElementById("syringe").style.opacity = 1;
    let image = document.getElementById("syringe");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#syringe",
      duration: 800,
      easing: "linear",
    });
    let startX = "-1320%";
    let startY = "-560%";
    let endX = "200%";
    let endY = "-248%";

    screenWidth();
    console.log("DivWidth: ", divWidth);

    if (divWidth < 769) {
      startX = "-40%";
      startY = "-940%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
      rotateZ: 0,
    });
    liftPiston();
    fillSyringe(1);
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 100,
      rotateZ: 90,
    }).add({
      duration: 1000,
      translateY: endY,
      translateX: endX,
    });

    document.getElementById("instruction").innerHTML =
      "Click on Observe button to observe what is happening inside the spectrometer and choose video speed according to your own liking.";

    document.getElementById("observation").innerHTML =
      "Click on Observe button to observe what is happening inside the spectrometer and choose video speed according to your own liking.";
    overallIteration++;

    if (restartAnimation) {
      a1.restart();
    }

    restartAnimation = false;
  }
}

let setupMessages = [
  "Click on the Sample Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Mass Spectrometer option in the Apparatus Menu to introduce it into the workspace.",
];

let setup = 0;

function setupMessage() {
  document.getElementById("instruction").innerHTML = setupMessages[setup];
  document.getElementById("observation").innerHTML = setupMessages[setup];
  setup++;
}

setupMessage();
async function visibility(x) {
  if (x === 1 && overallIteration === -1) {
    document.getElementById("sample-beaker").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 2 && overallIteration === 0) {
    document.getElementById("spectrometer").style.visibility = "visible";
    overallIteration++;
    changeMessage();
  }
}

let instructionMessages = [
  "Click on the Sample Beaker to draw 1 ml of the sample (methanol or aspirin) and load it onto the spectrometer inlet of the Mass Spectrometer.",
];
let iter1 = -1;
function changeMessage() {
  iter1++;
  document.getElementById("instruction").innerHTML = instructionMessages[iter1];
  document.getElementById("observation").innerHTML = instructionMessages[iter1];
}

document.getElementById("sample-beaker").style.cursor = "pointer";

let iter2 = -1;
let observationMessages = [
  "Now observe the zoomed in animation of mass spectromter. The sample is introduced into the vaporisation chamber which is instantly vapourised due to high vacuum and heat.",
  "Positively charged radical ions are formed by bombardment of beam of high energy electrons.",
  "The positively charged radical ions are accelerated by perforated negative electrodes",
  "The ions are sorted and separated by the magnetic field according to their mass/charge ratio.",
  "Now observe the graph being plotted. These lines demonstrate the molar mass of the compound in the Sample Beaker.",
];

function observeMessage() {
  if (restartAnimation) {
    return;
  }
  iter2++;
  document.getElementById("instruction").innerHTML = observationMessages[iter2];
  document.getElementById("observation").innerHTML = observationMessages[iter2];
}

function screenWidth() {
  divWidth = document.getElementById("workspace").clientWidth;
}

let originalSimulationHeight =
  document.getElementById("simulation").clientHeight;

let restartAnimation = false;

async function restart() {
  document.getElementById("simulation").style.height = originalSimulationHeight;
  document.getElementById("animation-video").style.display = "none";
  document.getElementById("plotted-graph-window").style.display = "none";

  document.getElementById("head-instructions").innerHTML = "Instructions";
  document.getElementById("head-observations").innerHTML = "Instructions";
  document.getElementById("instruction").innerHTML = "";
  document.getElementById("observation").innerHTML = "";
  overallIteration = -1;
  iter2 = -1;
  iter1 = -1;
  setup = 0;
  setupMessage();
  document.getElementById("syringe").style.opacity = 0;
  document.getElementById("apparatus-bottles").style.display = "block";
  document.getElementById("apparatus-spectrometer").style.display = "block";
  document.getElementById("sample-beaker").style.visibility = "hidden";

  document.getElementById("spectrometer").style.visibility = "hidden";
  document.getElementById("slidecontainer").style.display = "none";
  restartAnimation = true;

  document.getElementById("sample-beaker").style.cursor = "pointer";
}

let observeClick = false;
async function observe() {
  if (overallIteration === 3 && !observeClick) {
    observeClick = true;
    document.getElementById("slidecontainer").style.display = "block";
    document.getElementById("apparatus-bottles").style.display = "none";
    document.getElementById("apparatus-spectrometer").style.display = "none";
    document.getElementById("animation-video").style.display = "block";
    document.getElementById("animation-bottom-right").play();
    document.getElementById("head-instructions").innerHTML = "Observations";
    document.getElementById("head-observations").innerHTML = "Observations";
    document.getElementById("observation").innerHTML = "";
    document.getElementById("instruction").innerHTML = "";

    // Syncing Observation messages with Video Speed
    let timeOuts = [2000, 5000, 3000, 5000];

    for (let index = 0; index < timeOuts.length; index++) {
      await new Promise((r) => setTimeout(r, timeOuts[index] * speedFactor));
      observeMessage();
    }
    await new Promise((r) => setTimeout(r, 3000 * speedFactor));

    if (!restartAnimation) {
      overallIteration++;

      document.getElementById("instruction").innerHTML =
        "Click on Observe option in the Control Menu again to see the graph.";
      document.getElementById("observation").innerHTML =
        "Click on Observe option in the Control Menu again to see the graph.";
    }
    observeClick = false;
  } else if (overallIteration === 4 && !observeClick) {
    observeMessage();

    document.getElementById("slidecontainer").style.display = "none";

    document.getElementById("animation-video").style.display = "none";
    document.getElementById("plotted-graph-window").style.display = "block";
    startAnimation();
    overallIteration++;
    setTimeout(function () {
      document.getElementById("instruction").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
      document.getElementById("observation").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
    }, 8000);
  }
}

let sample = document.getElementById("sample-beaker");
sample.addEventListener("click", function () {
  moveSyringe();
});

let slider = document.getElementById("slider");
let vid = document.getElementById("animation-bottom-right");
slider.oninput = function () {
  videoSpeed = slider.value;
  vid.playbackRate = videoSpeed;
  speedFactor = 1 / videoSpeed;
};
