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

    producedBidsNum = 0;
    mode;
    currentEvent;
    stopModulatingFlag = false;
    endModulatingFlag = false;

    denyedBids = 0;

    generatedBidsNum = 0;
    totalGenerateBidsNum;
    systemParams = { sourcesNum: 0, devicesNum: 0, buffersNum: 0 };
    constructor(
        totatlBidsNum,
        sourcesNum,
        devicesNum,
        buffersNum,
        lambda,
        startTime,
        endTime
    ) {
        this.totalGenerateBidsNum = totatlBidsNum;

        this.systemParams = { sourcesNum, devicesNum, buffersNum };

        this.calendar = new Calendar();
        this.deviceManager = new DeviceManager(devicesNum, startTime, endTime);
        this.sourceManager = new SourceManager(sourcesNum, lambda);
        this.bufferManager = new BufferManager(buffersNum);
        this.logger = new Logger();
        this.setInitialBids();
        this.logger.initializateViewLogs(devicesNum, buffersNum);
    }

    handleNextEvent() {
        const nextEvent = this.calendar.getNextEvent();
        if (!nextEvent) {
            this.endModulatingFlag = true;
            return;
        }
        this.currentEvent = nextEvent;

        if (this.generatedBidsNum >= this.totalGenerateBidsNum) {
            this.stopModulatingFlag = true;
        }

        if (nextEvent.type === NEW_BID) {
            this.handleNewBid(nextEvent);
        } else {
            ++this.producedBidsNum;
            this.handleFreeDevice(nextEvent);
        }
    }

    handleNewBid(event) {
        //Stop adding new bids
        if (!this.stopModulatingFlag) {
            const nextBid = this.sourceManager.getNextBid(event.id);
            this.calendar.setNewEvent(nextBid);
            this.logger.newBid(nextBid.id, nextBid.bidNum, nextBid.time);
            this.generatedBidsNum++;
        }

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
            this.denyedBids++;
            const denyedBidAndBufferId = this.bufferManager.handleDeny(
                event.id,
                event.bidNum
            );
            //console.log('buffer full', denyedBidAndBufferId);
            if (
                denyedBidAndBufferId.sourceId === event.id &&
                denyedBidAndBufferId.bidNum === event.bidNum
            ) {
                this.logger.setDenyFromSource(
                    denyedBidAndBufferId.sourceId,
                    denyedBidAndBufferId.bidNum,
                    this.calendar.getCurrentTime()
                );
            } else {
                this.logger.setDenyFromBuffer(
                    denyedBidAndBufferId.sourceId,
                    denyedBidAndBufferId.bidNum,
                    this.calendar.getCurrentTime(),
                    denyedBidAndBufferId.bufferId,
                    event.id,
                    event.bidNum
                );
            }
        } else {
            const bufferId = this.bufferManager.bufferizateBid(
                event.id,
                event.bidNum
            );
            // if (!bufferId) console.log(bufferId);
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

        const bidFromBuffer = this.bufferManager.getNextBid();

        const device = this.deviceManager.getDeviceToProduce();

        this.logger.getBidFromBuffer(
            bidFromBuffer.sourceId,
            this.calendar.getCurrentTime(),
            bidFromBuffer.bufferId,
            bidFromBuffer.bidNum
        );

        this.logger.setDeviceProduce(
            device.getId(),
            bidFromBuffer.sourceId,
            bidFromBuffer.bidNum,
            this.calendar.getCurrentTime(),
            device.getHandingTime()
        );

        this.calendar.setNewEvent({
            type: FREE_DEVICE,
            deviceId: device.getId(),
            sourceId: bidFromBuffer.sourceId,
            bidNum: bidFromBuffer.bidNum,
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
            this.generatedBidsNum++;
        });
    }
}
