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

    bidsGenerated = 0;

    timeLineLength = 0;
    endModulating = false;

    initialParametrs = {
        started: false,
        mode: 'step',
        sourcesNum: 5,
        buffersNum: 5,
        devicesNum: 5,
        bidsNum: 10,
        lambda: 0.25,
        produceTimeInterval: { start: 3, end: 5 },
    };

    stageDrag = { x: 0, y: 0 };

    bidsRefused = 0;
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

        // this.timeLineLength =
        //     this.calendar[0]?.time * 100 || this.timeLineLength;

        this.timeLineLength =
            this.calendar[0]?.time * 100 || this.systemTime * 100;

        this.endModulating = system.endModulatingFlag;
        // console.log(this.bidsProduced, this.systemTime);
        this.bidsGenerated = system.generatedBidsNum;

        this.bidsProduced = system.producedBidsNum;

        this.bidsRefused = system.denyedBids || 0;
    }
}
export default new Store();
