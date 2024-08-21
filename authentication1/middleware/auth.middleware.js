const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.query.token

    jwt.verify(token, 'masai', function(err,decode){
      if(err){
        console.log(`err in decoding token ${err}`)
        res.send('please login first')
      }
      if(decode){
          console.log(decode)
          req.body.userName = decode.name
          req.body.role= decode.role
          next()
      }
    })
}

module.exports = auth