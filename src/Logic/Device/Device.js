export class Device {
    #id;
    //#isBusy = false;
    #handlingTime;
    constructor(id, startTime, endTime) {
        this.#id = id;
        //this.#produceHandlingTime();
        this.#handlingTime = startTime + Math.random() * (endTime - startTime);
    }

    #produceHandlingTime() {
        this.#handlingTime = 4;
    }

    getId() {
        return this.#id;
    }

    getDeviceInfo() {
        return { id: this.#id, handlingTime: this.#handlingTime };
    }

    getHandingTime() {
        return this.#handlingTime;
    }
}
