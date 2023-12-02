import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs:60*1000,
    max:10,
    message:"Request tries exceeded, try again later"
})

export {apiLimiter};