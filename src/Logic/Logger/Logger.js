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

    setDenyFromBuffer(
        sourceIdOld,
        bidNumOld,
        time,
        bufferId,
        sourceIdNew,
        bidNumNew
    ) {
        //auto
        const currentSourceLog = this.sourcesLog.get(sourceIdOld);
        currentSourceLog.numRefused++;
        if (
            currentSourceLog.startTimeInBuffer.length >
            currentSourceLog.endTimeInBuffer.length
        ) {
            currentSourceLog.endTimeInBuffer.push(time);
        }
        this.sourcesLog.set(sourceIdOld, currentSourceLog);

        //view
        // let currentBuffer = this.bufferViewLog.get(bufferId);
        // currentBuffer = currentBuffer.map((buf) => {
        //     if (buf.sourceId === sourceIdOld && buf.bidNum === bidNumOld) {
        //         buf.endTime = time;
        //     }
        //     return buf;
        // });
        // this.bufferViewLog.set(bufferId, currentBuffer);

        //SEt end time for old bid in buffer
        const currentBufLog = this.bufferViewLog.get(bufferId);
        currentBufLog.find((logInfo, index, array) => {
            if (
                logInfo.sourceId === sourceIdOld &&
                logInfo.bidNum === bidNumOld
            ) {
                array[index].endTime = time;
                return true;
            }
            return false;
        });
        this.bufferViewLog.set(bufferId, currentBufLog);

        //SEt start time for new bid in buffer
        const currentBufLogNew = this.bufferViewLog.get(bufferId);
        currentBufLogNew.push({
            sourceId: sourceIdNew,
            bidNum: bidNumNew,
            startTime: time,
        });
        this.bufferViewLog.set(bufferId, currentBufLog);

        //denyViewLog
        this.denyViewLog.push({
            sourceId: sourceIdOld,
            bidNum: bidNumOld,
            time,
        });
    }

    setDenyFromSource(sourceId, bidNum, time) {
        const currentSourceLog = this.sourcesLog.get(sourceId);
        currentSourceLog.numRefused++;
        this.sourcesLog.set(sourceId, currentSourceLog);
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
        currentBufLog.push({ sourceId: sourceId, bidNum, startTime: time });
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

    getBidFromBuffer(sourceId, time, bufferId, bidNum) {
        const source = this.sourcesLog.get(sourceId);
        source.endTimeInBuffer.push(time);
        this.sourcesLog.set(sourceId, source);

        const currentBufLog = this.bufferViewLog.get(bufferId);
        currentBufLog.find((logInfo, index, array) => {
            if (logInfo.sourceId === sourceId && logInfo.bidNum === bidNum) {
                array[index].endTime = time;
                return true;
            }
            return false;
        });
        this.bufferViewLog.set(bufferId, currentBufLog);
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

    initializateViewLogs(devicesNum, buffersNum) {
        for (let index = 0; index < buffersNum; index++) {
            this.bufferViewLog.set(index + 1, []);
        }

        for (let index = 0; index < devicesNum; index++) {
            this.deviceLogView.set(index + 1, []);
        }
    }
}
