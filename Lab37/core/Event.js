const { v4: uuid } = require("uuid");
const model = require("../models/index");

class Event {
    constructor (job) {
        this.job = job;
        this.store();
    }

    store = async () => {
        const job = await model.QueueJob.create({
            key: uuid(),
            name: this.job.constructor.name,
            value: JSON.stringify(this.job),
        });
    }
}

module.exports = Event;