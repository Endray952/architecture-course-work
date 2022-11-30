export class MyBuffer {
    #id;
    constructor(id) {
        this.#id = id;
    }
    getId() {
        return this.#id;
    }
}
