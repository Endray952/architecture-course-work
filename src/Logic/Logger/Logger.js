export class Logger {
    // key - sourceId [{bidNum, time}]
    sourceBidsLogView = new Map();
    //key - deviceId [{sourceId, bidNum, StartTime, endTime}]
    deviceLogView = new Map();
    //key - bufferId [{sourceId, bidNum, StartTime, endTime}]
    bufferViewLog = new Map();
    //key - [sourceId, bidId, time]
    denyViewLog = [];

    // key - sourceId, value - {numRefused, numProduced, timeInDevice[], startTimeInBuffer[], endTimeInBuffer[] }
    sourcesLog = new Map();
    // key - deviceId, value - {usedTime }
    deviceLog = new Map();

    newBid(sourceId, bidNum, time) {
        if (!this.sourceBidsLogView.has(sourceId)) {
            this.sourceBidsLogView.set(sourceId, []);
        }
        this.sourceBidsLogView.set(
            sourceId,
            this.sourceBidsLogView.get(sourceId).concat({ bidNum, time })
        );

        if (!this.sourcesLog.has(sourceId)) {
            this.sourcesLog.set(sourceId, {
                numRefused: 0,
                numProduced: 0,
                timeInDevice: [],
                startTimeInBuffer: [],
                endTimeInBuffer: [],
            });
        }
        const currentSourceLog = this.sourcesLog.get(sourceId);
        currentSourceLog.numProduced++;
        this.sourcesLog.set(sourceId, currentSourceLog);
    }

    setDeviceProduce(deviceId, sourceId, bidNum, time, handlingTime) {
        //view log
        if (!this.deviceLogView.has(deviceId)) {
            this.deviceLogView.set(deviceId, []);
        }
        this.deviceLogView.set(
            deviceId,
            this.deviceLogView.get(deviceId).concat({
                sourceId,
                bidNum,
                startTime: time,
                endTime: time + handlingTime,
            })
        );

        //auto log add device producing time

        //sourcesLog add time in device for source
        const currentSourceLog = this.sourcesLog.get(sourceId);
        currentSourceLog.timeInDevice.push(handlingTime);
        currentSourceLog.numProduced++;
        this.sourcesLog.set(sourceId, currentSourceLog);
    }

    setDeny(sourceId, bidNum, time, bufferId) {
        //auto
        const currentSourceLog = this.sourcesLog.get(sourceId);
        currentSourceLog.numRefused++;
        if (
            currentSourceLog.startTimeInBuffer.length >
            currentSourceLog.endTimeInBuffer.length
        ) {
            currentSourceLog.endTimeInBuffer.push(time);
        }
        this.sourcesLog.set(sourceId, currentSourceLog);

        //view
        let currentBuffer = this.bufferViewLog.get(bufferId);
        currentBuffer = currentBuffer.map((buf) => {
            if (buf.sourceId === sourceId && buf.bidNum === bidNum) {
                buf.endTime = time;
            }
            return buf;
        });
        this.bufferViewLog.set(bufferId, currentBuffer);

        //denyViewLog
        this.denyViewLog.push({ sourceId, bidNum, time });
    }

    setInBuffer(sourceId, bidNum, time, bufferId) {
        //auto set start time of source in buffer
        if (!this.sourcesLog.has(sourceId)) {
            this.sourcesLog.set(sourceId, {
                numRefused: 0,
                numProduced: 0,
                timeInDevice: [],
                startTimeInBuffer: [],
                endTimeInBuffer: [],
            });
        }
        const currentSourceLog = this.sourcesLog.get(sourceId);
        currentSourceLog.startTimeInBuffer.push(time);
        this.sourcesLog.set(sourceId, currentSourceLog);

        //view log set bufferViewLog start time
        if (!this.bufferViewLog.has(bufferId)) {
            this.bufferViewLog.set(bufferId, []);
        }
        const currentBufLog = this.bufferViewLog.get(bufferId);
        currentBufLog.push({ sourceId: sourceId, bidNum, StartTime: time });
        this.bufferViewLog.set(bufferId, currentBufLog);
    }

    endDeviceProduce(deviceId, sourceId, bidNum, time, handlingTime) {
        //auto log add device producing time
        if (!this.deviceLog.has(deviceId)) {
            this.deviceLog.set(deviceId, 0);
        }
        this.deviceLog.set(
            deviceId,
            this.deviceLog.get(deviceId) + handlingTime
        );
    }

    getBidFromBuffer(sourceId, time) {
        const source = this.sourcesLog.get(sourceId);
        source.endTimeInBuffer.push(time);
        this.sourcesLog.set(sourceId, source);
    }

    getLogger() {
        return {
            sourceLog: Array.from(this.sourcesLog, ([sourceId, value]) => ({
                sourceId,
                value,
            })),
            deviceLog: Array.from(this.deviceLog, ([deviceId, usedTime]) => ({
                deviceId,
                usedTime,
            })),
        };
    }

    getViewLogger() {
        return {
            sourceBidsLogView: Array.from(
                this.sourceBidsLogView,
                ([sourceId, value]) => ({
                    sourceId,
                    value,
                })
            ),
            deviceLogView: Array.from(
                this.deviceLogView,
                ([deviceId, value]) => ({
                    deviceId,
                    value,
                })
            ),
            bufferViewLog: Array.from(
                this.bufferViewLog,
                ([bufferId, value]) => ({
                    bufferId,
                    value,
                })
            ),
            denyViewLog: this.denyViewLog,
        };
    }
}
