import { IBeam, TBeam, LBeam, Pipe } from "./classes.js";


// All input elements
const beamType = document.getElementById("beamType");
const inputsDiv = document.getElementById("inputs");
const IT_inputsDiv = document.getElementById("IT_inputs");
const pipe_inputsDiv = document.getElementById("pipe_inputs");
const priceInput = document.getElementById("price");
const resultElement = document.getElementById("result");

// Image elements for beams
const IBeamImage = document.getElementById("IBeamImage");
const TBeamImage = document.getElementById("TBeamImage");
const LBeamImage = document.getElementById("LBeamImage");
const pipeImage = document.getElementById("pipeImage");

const calculateBtn = document.getElementById("calculateBtn");

let type;

// Dropdown change event
beamType.addEventListener("change", () => {
    type = beamType.value;

    inputsDiv.classList.remove("hidden");
    IT_inputsDiv.classList.add("hidden");
    pipe_inputsDiv.classList.add("hidden");
    priceInput.classList.remove("hidden");
    calculateBtn.classList.add("hidden");

    // Hide all images
    IBeamImage.classList.add("hidden");
    TBeamImage.classList.add("hidden");
    LBeamImage.classList.add("hidden");
    pipeImage.classList.add("hidden");

    // Show relevant inputs and image
    if (type === "i") {
        IT_inputsDiv.classList.remove("hidden");
        IBeamImage.classList.remove("hidden");
    } else if (type === "t") {
        IT_inputsDiv.classList.remove("hidden");
        TBeamImage.classList.remove("hidden");
    } else if (type === "l") {
        IT_inputsDiv.classList.remove("hidden");
        LBeamImage.classList.remove("hidden");
    } else if (type === "pipe") {
        pipe_inputsDiv.classList.remove("hidden");
        pipeImage.classList.remove("hidden");
    }

    if (type) {
        calculateBtn.classList.remove("hidden");
    }
});

// Calculation logic
calculateBtn.addEventListener("click", () => {
    let length = parseFloat(document.getElementById("length")?.value || 0);
    let thickness = parseFloat(document.getElementById("thickness")?.value || 0);
    let width = parseFloat(document.getElementById("width")?.value || 0);
    let height = parseFloat(document.getElementById("height")?.value || 0);
    let outerDiameter = parseFloat(document.getElementById("outerDiameter")?.value || 0);
    let price = parseFloat(priceInput.value || 0);

    let beam;

    if (type === "i") {
        beam = new IBeam("I-Beam", thickness, length, width, height, price);
    } else if (type === "t") {
        beam = new TBeam("T-Beam", thickness, length, width, height, price);
    } else if (type === "l") {
        beam = new LBeam("L-Beam", thickness, length, width, height, price);
    } else if (type === "pipe") {
        beam = new Pipe("Pipe", thickness, length, outerDiameter, price);
    }

    if (beam) {
        resultElement.innerText = `Volume: ${beam.volume.toFixed(6)} m³  
                                   Mass: ${beam.mass.toFixed(2)} kg  
                                   The cost of the ${beam.beamType} is $${beam.cost.toFixed(2)}.`;
    }
});
