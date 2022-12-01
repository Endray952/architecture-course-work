import { MyBuffer } from './Buffer';

export class BufferManager {
    #buffers;
    //map of buffers
    #freeBuffers;
    #buffersNumber;
    //sorted by bid num array
    #bufferedBids;
    constructor(buffersNumber) {
        this.#buffers = new Map();
        for (let index = 0; index < buffersNumber; index++) {
            const id = index + 1;
            this.#buffers.set(id, new MyBuffer(id));
        }
        this.#freeBuffers = { index: 1, buffersMap: new Map(this.#buffers) };
        this.#buffersNumber = buffersNumber;
        this.#bufferedBids = [];
    }

    isBufferEmpty() {
        return this.#bufferedBids.length === 0;
    }

    isBufferFull() {
        return this.#bufferedBids.length === this.#buffersNumber;
    }
    /**
     *
     * @returns {buffer}
     */
    bufferizateBid(sourceId, bidNum) {
        const freeBuffersArray = [
            ...this.#freeBuffers.buffersMap.keys(),
        ].sort();
        let freeBufferToBufferizateId = null;
        while (true) {
            if (freeBuffersArray.includes(this.#freeBuffers.index)) {
                freeBufferToBufferizateId = this.#freeBuffers.index;
                break;
            }
            if (++this.#freeBuffers.index > this.#buffersNumber) {
                this.#freeBuffers.index = 1;
            }
        }

        this.#freeBuffers.buffersMap.delete(freeBufferToBufferizateId);

        this.#bufferedBids.push({
            bufferId: freeBufferToBufferizateId,
            sourceId,
            bidNum,
        });

        this.#bufferedBids.sort(
            (bid_1, bid_2) =>
                -(bid_1.sourceId - bid_2.sourceId === 0
                    ? bid_1.bidNum - bid_2.bidNum
                    : bid_1.sourceId - bid_2.sourceId)
        );

        return freeBufferToBufferizateId;
    }

    releaseBuffer(id) {
        this.#freeBuffers.buffersMap.set(id, this.#buffers.get(id));
    }

    handleDeny(sourceId, bidNum) {
        //set new bid as denyed as default
        let denyedBid = {
            bufferId: this.#bufferedBids[0].bufferId,
            sourceId,
            bidNum,
        };
        const newBidShouldDeny =
            sourceId - this.#bufferedBids[0].sourceId === 0
                ? bidNum - this.#bufferedBids[0].bidNum
                : sourceId - this.#bufferedBids[0].sourceId;

        if (newBidShouldDeny < 0) {
            denyedBid = this.#bufferedBids[0];
            this.#bufferedBids[0] = {
                bufferId: this.#bufferedBids[0].bufferId,
                sourceId,
                bidNum,
            };
            this.#bufferedBids.sort(
                (bid_1, bid_2) =>
                    -(bid_1.sourceId - bid_2.sourceId === 0
                        ? bid_1.bidNum - bid_2.bidNum
                        : bid_1.sourceId - bid_2.sourceId)
            );
        }

        return denyedBid;
    }

    getNextBid() {
        const freedBuffer = this.#bufferedBids.pop();
        this.releaseBuffer(freedBuffer.bufferId);
        return freedBuffer;
    }

    viewBuffer() {
        return {
            freeBuffers: this.#freeBuffers,
            bufferedBids: this.#bufferedBids,
        };
    }
}
