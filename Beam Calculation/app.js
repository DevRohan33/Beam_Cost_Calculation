class BeamCalculator {
    constructor() {
        // Get references to all input elements
        this.beamType = document.getElementById("beamType");
        this.inputsDiv = document.getElementById("inputs");
        this.IT_inputsDiv = document.getElementById("IT_inputs");
        this.circle_inputsDiv = document.getElementById("circle_inputs");
        this.result = document.getElementById("result");

        // Common inputs
        this.length = document.getElementById("length");
        this.thickness = document.getElementById("thickness");
        this.width = document.getElementById("width");
        this.height = document.getElementById("height");
        this.outerDiameter = document.getElementById("outerDiameter");

        // Image elements
        this.iBeamImage = document.getElementById("iBeamImage");
        this.tBeamImage = document.getElementById("tBeamImage");
        this.circleBeamImage = document.getElementById("circleBeamImage");

        this.densityOfSteel = 7900; // Density of steel in kg/m³
        this.costPerKg = 50; // Cost per kg 
    }

    // Function to show input fields 
    showInputs() {
        const type = this.beamType.value;
        this.inputsDiv.classList.remove("hidden");
        this.IT_inputsDiv.classList.add("hidden");
        this.circle_inputsDiv.classList.add("hidden");
        document.getElementById("calculateBtn").classList.add("hidden");

        // Hide all images initially
        this.iBeamImage.classList.add("hidden");
        this.tBeamImage.classList.add("hidden");
        this.circleBeamImage.classList.add("hidden");

        if (type === "i") {
            this.IT_inputsDiv.classList.remove("hidden");
            this.iBeamImage.classList.remove("hidden"); // Show I-Beam image
        } else if (type === "t") {
            this.IT_inputsDiv.classList.remove("hidden");
            this.tBeamImage.classList.remove("hidden"); // Show T-Beam image
        } else if (type === "circle") {
            this.circle_inputsDiv.classList.remove("hidden");
            this.circleBeamImage.classList.remove("hidden"); // Show Circular Beam image
        }

        if (type) {
            document.getElementById("calculateBtn").classList.remove("hidden");
        }
    }

    // Function to calculate the cost of the beam
    calculateBeam() {
        const type = this.beamType.value;
        let volume = 0;
        let mass = 0;
        let cost = 0;

        // Convert input values to numbers
        const length = parseFloat(this.length.value);
        const thickness = parseFloat(this.thickness.value);
        const width = parseFloat(this.width.value);
        const height = parseFloat(this.height.value);
        const outerDiameter = parseFloat(this.outerDiameter.value);

        // Validate inputs
        if (isNaN(length) || isNaN(thickness) || length <= 0 || thickness <= 0) {
            this.result.innerText = "Please enter valid values for length and thickness.";
            return;
        }

        if (type === "i" || type === "t") {
            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                this.result.innerText = "Please enter valid values for width and height.";
                return;
            }
        } else if (type === "circle") {
            if (isNaN(outerDiameter) || outerDiameter <= 0) {
                this.result.innerText = "Please enter a valid value for outer diameter.";
                return;
            }
        }

        // Calculate volume based on beam type
        if (type === "i") {
            volume = ((2 * width * thickness) + (height * thickness)) * length;
        } else if (type === "t") {
            volume = ((width * thickness) + (height * thickness)) * length;
        } else if (type === "circle") {
            const innerDiameter = outerDiameter - 2 * thickness;
            volume = (Math.PI * (outerDiameter ** 2 - innerDiameter ** 2) * length) / 4;
        }
        const volumeM3 = volume / 1e9;
        // mass  = volume * density of steel (7900 kg/m³)
        mass = volumeM3 * this.densityOfSteel;

        // cost = mass (kg) * cost ₹50/kg
        cost = mass * this.costPerKg;

        // Display results
        this.result.innerText = `Volume: ${volumeM3.toFixed(6)} m³  
                                Mass: ${mass.toFixed(2)} kg  
                                Estimated Cost: ₹${cost.toFixed(2)}`;
    }
}
const beamCalculator = new BeamCalculator();
