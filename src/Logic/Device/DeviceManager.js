import { Device } from './Device';

export class DeviceManager {
    #devices;
    #freeDevices;
    constructor(deviceNumber) {
        this.#devices = new Map();
        for (let index = 0; index < deviceNumber; index++) {
            const id = index + 1;
            this.#devices.set(id, new Device(id));
        }
        this.#freeDevices = new Map(this.#devices);
    }
    getDevices() {
        const devicesInfo = [];
        for (let [id, device] of this.#devices) {
            devicesInfo.push({
                ...device.getDeviceInfo(),
                isFree: this.#freeDevices.has(id),
            });
        }
        return devicesInfo;
    }

    freeDevice(deviceId) {
        this.#freeDevices.set(deviceId, this.#devices.get(deviceId));
    }

    getDeviceToProduce() {
        const minKey = Math.min(...this.#freeDevices.keys());
        const device = this.#freeDevices.get(minKey);
        this.#freeDevices.delete(minKey);
        return device;
    }

    isAllDevicesBusy() {
        // this.#freeDevices.clear();
        return !Boolean(this.#freeDevices.size);
    }

    getFreeDevices() {}
}
