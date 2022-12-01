import { Source } from './Source';

export class SourceManager {
    #sources;
    constructor(sourcesNum, lambda) {
        this.#sources = new Map();
        for (let i = 0; i < sourcesNum; i++) {
            const id = i + 1;
            this.#sources.set(id, new Source(id, lambda));
        }
    }
    getNextBid(sourceId) {
        return this.#sources.get(sourceId).generateNextBidInterval();
    }

    generateInitialBids() {
        return Array.from(this.#sources.values()).map((source) => {
            return source.generateNextBidInterval();
        });
    }

    getSources() {
        return Array.from(this.#sources, ([key, value]) => value);
    }
}
