const cron = require("node-cron");
const moment = require('moment');
const { Op } = require("sequelize");

const SendMail = require("./jobs/SendMail");
const model = require("./models/index");
const { JWT_EXPIRE } = process.env;

// Cứ mỗi phút sẽ chạy
cron.schedule("* */1 * * * *", async () => {
    const milliseconds = moment.duration(JWT_EXPIRE.slice(0, -1), JWT_EXPIRE.slice(-1)).asMilliseconds();

    const blackTokens = await model.BlackToken.findAll({
        where: {
            issuedAt: {
                [Op.lte]: Math.floor((moment().valueOf() - milliseconds) / 1000) 
            }
        }
    });

    blackTokens.forEach(async (token) => {
        await token.destroy();
    });
});


cron.schedule("*/5 * * * * *", async () => {
    const job = await model.QueueJob.findOne({
        where: {
            name: SendMail.name,
        }
    });
    const data = JSON.parse(job.value);
    try {
        await new SendMail(data.job).handle();
        await job.destroy();
    } catch (e) {
        console.log(e);
    }
});