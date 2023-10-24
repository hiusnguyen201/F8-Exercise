let counter = 0;
const timeout = 10000;

module.exports = (req, res, next) => {
  if (counter === 5) {
    res.status(429).json({
      status: "error",
      error: `Đã hết số lần request xin hãy đợi ${timeout / 1000}s`,
    });
    return;
  } else {
    counter++;
  }

  if (counter === 5) {
    const time = setTimeout(() => {
      counter = 0;
      console.log("asda");
      clearInterval(time);
    }, timeout);
  }

  next();
};
