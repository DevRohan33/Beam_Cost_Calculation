class Beam {
    constructor(beamType, thickness, length, price) {
        this.beamType = beamType;
        this.thickness = thickness;
        this.length = length;
        this.price = price;
        this.density = 7850; // kg/m³
    }
}

class IBeam extends Beam {
    constructor(beamType, thickness, length, width, height, price) {
        super(beamType, thickness, length, price);
        this.width = width;
        this.height = height;
        this.calculateVolume();
    }

    calculateVolume() {
        this.volume = ((2 * this.width * this.thickness) + (this.height * this.thickness)) * this.length;
        this.mass = this.volume * this.density;
        this.cost = this.mass * this.price;
    }
}

class TBeam extends Beam {
    constructor(beamType, thickness, length, width, height, price) {
        super(beamType, thickness, length, price);
        this.width = width;
        this.height = height;
        this.calculateVolume();
    }

    calculateVolume() {
        this.volume = ((this.width * this.thickness) + (this.height * this.thickness)) * this.length;
        this.mass = this.volume * this.density;
        this.cost = this.mass * this.price;
    }
}

class LBeam extends Beam {
    constructor(beamType, thickness, length, width, height, price) {
        super(beamType, thickness, length, price);
        this.width = width;
        this.height = height;
        this.calculateVolume();
    }

    calculateVolume() {
        this.volume = ((this.width * this.thickness) + (this.height * this.thickness) - (this.thickness * this.thickness)) * this.length;
        this.mass = this.volume * this.density;
        this.cost = this.mass * this.price;
    }
}

class Pipe extends Beam {
    constructor(beamType, thickness, length, outerDiameter, price) {
        super(beamType, thickness, length, price);
        this.outerDiameter = outerDiameter;
        this.calculateVolume();
    }

    calculateVolume() {
        const innerDiameter = this.outerDiameter - 2 * this.thickness;
        this.volume = (Math.PI * (this.outerDiameter ** 2 - innerDiameter ** 2) * this.length) / 4;
        this.mass = this.volume * this.density;
        this.cost = this.mass * this.price;
    }
}

export { IBeam, TBeam, LBeam, Pipe };
