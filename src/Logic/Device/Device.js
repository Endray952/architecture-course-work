export class Device {
    #id;
    //#isBusy = false;
    #handlingTime;
    constructor(id) {
        this.#id = id;
        this.#produceHandlingTime();
    }

    // setBusy() {
    //     this.#isBusy = true;
    // }

    // setFree() {
    //     this.#isBusy = false;
    // }

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
