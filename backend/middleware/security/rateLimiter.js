const rateLimiter = require('express-rate-limit');

const authLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later."
})


const generalLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
})


module.exports = { authLimiter, generalLimiter };