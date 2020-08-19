var jwt = require('jsonwebtoken');



module.exports={

    jwtTokenSign :'qhk4GCN6hoEHeiVvNbOQ078CkUAfASwb5kK318NiYj4keZ6CGDC6wcjlVOOj',
    generateToken: function (user) {
        return jwt.sign({
        userId: user.id,
        isAdmin: user.isAdmin
        },
        this.jwtTokenSign,
        {
            expiresIn: '24h'
        })
    }

}