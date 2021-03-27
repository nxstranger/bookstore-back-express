require('dotenv').config()
const jwt = require("jsonwebtoken");
const jwtAccessKey = process.env.JWT_ACCESS_SECRET_KEY
const jwtAccessExpiredMinutes = process.env.JWT_ACCESS_EXPIRED_MINUTES

const jwtRefreshKey = process.env.JWT_REFRESH_SECRET_KEY
const jwtRefreshExpiredDays = process.env.JWT_REFRESH_EXPIRED_DAYS


module.exports.makeJwtAccessToken = (userId) => {

    return jwt.sign({user: userId}, jwtAccessKey, {expiresIn: (60 * +jwtAccessExpiredMinutes)})
}

module.exports.makeJwtRefreshToken = (userId) => {

    return jwt.sign({user_refresh: userId, refresh: "refresh"}, jwtRefreshKey, {expiresIn: (30 * 60 * +jwtRefreshExpiredDays)})
}

module.exports.jwtVerifyAccess = (token) => {
    return new Promise((success, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
            if (err){
                reject(err)
            } else {
                success(user.user)
            }
        })
    })
}


module.exports.jwtVerifyRefresh = (token) => {
    return new Promise((success, reject) => {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
            if (err){
                reject(err)
            } else {
                success(user.user_refresh)
            }
        })
    })
}