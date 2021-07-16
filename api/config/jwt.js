var jwt = require('jsonwebtoken')
var g = require('../global')

const JWT_SIGNATURE_SECRET = "qs32df3sqd2fqsf7f64dqsf34ds654f32d1f3q4dsf32dqs1f35dqs4f3dqs2f1dqs34"

exports.generateToken = user => {
    const data = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
    return jwt.sign(data, JWT_SIGNATURE_SECRET, { expiresIn: '5h' })
}

exports.isLoggedIn = (request, response, next) => {
    const authorization = request.headers.authorization
    const token = parseAuthorization(authorization)
    if (token != null) {
        try {
            const jwtToken = jwt.verify(token, JWT_SIGNATURE_SECRET)
            if (jwtToken != null) {
                next()
            }
        } catch (error) {
            return response.json({success: false, message: g.messages.wrongToken})
        }
    } else {
        return response.json({success: false, message: g.messages.unAuthorized})
    }
}

function parseAuthorization(authorization) {
    return authorization != null ? authorization.replace('Bearer ', '') : null
}