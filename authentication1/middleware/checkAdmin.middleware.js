

const admin = (req,res,next)=>{
    const {role} = req.body
    if(role==='admin'){
        next()
    }else{
        res.send('you are not allowed to access this page')
    }
}

module.exports = admin