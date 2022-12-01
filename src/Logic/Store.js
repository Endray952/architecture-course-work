import { makeAutoObservable } from 'mobx';

class Store {
    systemTime = 0;
    sources = [];
    devices = [];
    logger = { sourceLog: [], deviceLog: [] };
    calendar = [];
    currentEvent;
    bufferedBids = [];
    freeBuffers = { index: 0, buffers: [] };
    denyView = [];
    bidsProduced = 0;
    viewLogger = {
        sourceBidsLogView: [],
        deviceLogView: [],
        bufferViewLog: [],
        denyViewLog: [],
    };

    systemParams = { sourcesNum: 0, devicesNum: 0, buffersNum: 0 };

    timeLineLength = 0;
    constructor() {
        makeAutoObservable(this);
        // this.system = system;
    }
    update(system) {
        //this.systemParams = system;
        this.systemParams = system.systemParams;

        this.systemTime = system.calendar.getCurrentTime();
        this.sources = [...system.sourceManager.getSources()];
        this.devices = [...system.deviceManager.getDevices()];
        this.logger = { ...system.logger.getLogger() };
        this.currentEvent = system.currentEvent;
        this.calendar = [...system.calendar.events];
        this.bufferedBids = system.bufferManager.viewBuffer().bufferedBids;
        this.denyView = [...system.logger.denyViewLog];
        this.freeBuffers = {
            index: system.bufferManager.viewBuffer().freeBuffers.index,
            buffers: Array.from(
                system.bufferManager.viewBuffer().freeBuffers.buffersMap,
                ([bufferId, value]) => ({
                    bufferId,
                    usedTime: value,
                })
            ),
        };
        this.bidsProduced = system.producedBidsNum;

        this.viewLogger = system.logger.getViewLogger();
        //console.log(this.viewLogger);
        //console.log(JSON.stringify(this.calendar));

        this.timeLineLength = this.calendar[0].time * 100;
    }
}
export default new Store();
