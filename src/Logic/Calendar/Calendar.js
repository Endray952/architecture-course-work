export class Calendar {
    systemTime;
    events;
    constructor() {
        this.systemTime = 0;
        this.events = [];
    }

    getCurrentTime() {
        return this.systemTime;
    }

    setNewEvent(event) {
        event.time += this.systemTime;
        this.events.push(event);
        this.events = [...this.events].sort((a, b) => b.time - a.time);
    }

    getNextEvent() {
        const nextEvent = this.events.pop();
        if (!nextEvent) return nextEvent;
        this.systemTime = nextEvent.time;
        return nextEvent;
    }

    getAllEvents() {
        return this.events;
    }
}
