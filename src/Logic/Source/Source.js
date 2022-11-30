import { NEW_BID } from '../System';

export class Source {
    #id;
    #lambda = 0.25;
    #generatedBidsNum = 0;
    constructor(id) {
        this.#id = id;
    }

    /**
     *
     * @returns - {type, id, time, bidNum}
     */
    generateNextBidInterval() {
        return {
            type: NEW_BID,
            id: this.#id,
            time: -Math.log(Math.random()) / this.#lambda,
            bidNum: ++this.#generatedBidsNum,
        };
    }

    getSourceParamtrs() {
        return `id: ${this.#id}, lambda: ${this.#lambda}, generatedBidsNum: ${
            this.#generatedBidsNum
        }`;
    }
}
