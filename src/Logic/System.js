import { makeAutoObservable } from 'mobx';
import { BufferManager } from './Buffer/BufferManager';
import { Calendar } from './Calendar/Calendar';
import { DeviceManager } from './Device/DeviceManager';
import { Logger } from './Logger/Logger';
import { SourceManager } from './Source/SourceManager';

export const NEW_BID = 'new_bid';
const FREE_DEVICE = 'produce_end';

export class System {
    calendar;
    deviceManager;
    bufferManager;
    sourceManager;
    logger;
    totalBidsNum;
    producedBidsNum = 0;
    mode;
    currentEvent;
    stopModulatingFlag = false;
    constructor(mode, totatlBidsNum, sourcesNum, devicesNum, buffersNum) {
        this.totalBidsNum = totatlBidsNum;
        this.calendar = new Calendar();
        this.deviceManager = new DeviceManager(devicesNum);
        this.sourceManager = new SourceManager(sourcesNum);
        this.bufferManager = new BufferManager(buffersNum);
        this.logger = new Logger();
        this.setInitialBids();
    }

    handleNextEvent() {
        const nextEvent = this.calendar.getNextEvent();
        if (!nextEvent) {
            this.end_modulating();
            return;
        }
        this.currentEvent = nextEvent;

        if (nextEvent.type === NEW_BID && !this.stopModulatingFlag) {
            this.handleNewBid(nextEvent);
        } else {
            if (++this.producedBidsNum === this.totalBidsNum) {
                this.stopModulatingFlag = true;
            }
            this.handleFreeDevice(nextEvent);
        }
    }

    handleNewBid(event) {
        const nextBid = this.sourceManager.getNextBid(event.id);

        this.calendar.setNewEvent(nextBid);
        this.logger.newBid(nextBid.id, nextBid.bidNum, nextBid.time);

        if (!this.deviceManager.isAllDevicesBusy()) {
            const device = this.deviceManager.getDeviceToProduce();
            this.logger.setDeviceProduce(
                device.getId(),
                event.id,
                event.bidNum,
                this.calendar.getCurrentTime(),
                device.getHandingTime()
            );

            this.calendar.setNewEvent({
                type: FREE_DEVICE,
                deviceId: device.getId(),
                sourceId: event.id,
                bidNum: event.bidNum,
                time: device.getHandingTime(),
                handlingTime: device.getHandingTime(),
            });

            return;
        }

        if (this.bufferManager.isBufferFull()) {
            const denyedBidAndBufferId = this.bufferManager.handleDeny(
                event.id,
                event.bidNum
            );
            this.logger.setDeny(
                denyedBidAndBufferId.sourceId,
                denyedBidAndBufferId.bidNum,
                this.calendar.getCurrentTime(),
                denyedBidAndBufferId.bufferId
            );
        } else {
            const bufferId = this.bufferManager.bufferizateBid(
                event.id,
                event.bidNum
            );
            this.logger.setInBuffer(
                event.id,
                event.bidNum,
                this.calendar.getCurrentTime(),
                bufferId
            );
        }
    }

    // type: FREE_DEVICE, deviceId, sourceId, bidNum, time
    handleFreeDevice(nextEvent) {
        this.logger.endDeviceProduce(
            nextEvent.deviceId,
            nextEvent.sourceId,
            nextEvent.bidNum,
            this.calendar.getCurrentTime(),
            nextEvent.handlingTime
        );

        this.deviceManager.freeDevice(nextEvent.deviceId);

        if (this.bufferManager.isBufferEmpty()) {
            return;
        }

        //set bid from buffer to device

        const nextBid = this.bufferManager.getNextBid();

        const device = this.deviceManager.getDeviceToProduce();
        this.logger.getBidFromBuffer(
            nextBid.sourceId,
            this.calendar.getCurrentTime()
        );

        this.logger.setDeviceProduce(
            device.getId(),
            nextBid.sourceId,
            nextBid.bidNum,
            this.calendar.getCurrentTime(),
            device.getHandingTime()
        );

        this.calendar.setNewEvent({
            type: FREE_DEVICE,
            deviceId: device.getId(),
            sourceId: nextBid.sourceId,
            bidNum: nextBid.bidNum,
            time: device.getHandingTime(),
            handlingTime: device.getHandingTime(),
        });
    }

    end_modulating() {
        console.log('end');
    }

    setInitialBids() {
        const bids = this.sourceManager.generateInitialBids();
        bids.forEach((bid) => {
            this.calendar.setNewEvent(bid);
            this.logger.newBid(bid.id, bid.bidNum, bid.time);
        });
    }
}
