module.exports = function validate (req,res,next){
     const {ID,Name,Rating,Description,Genre,Cast} = req.body;

     const errors = [];
      if(typeof ID!== 'number'){
        errors.push('ID must be a number')
      }
     if(typeof Name!=='string'){
        errors.push('Name must be a string')
     }
     if(typeof Rating!=='number'){
        errors.push('Rating must be a number')
     }
     if(typeof Description!=='string'){
        errors.push('description must be a string')
     }
     if(typeof Genre!=='string'){
        errors.push('genre must be a string')
     }
     if(!Array.isArray(Cast)|| !Cast.every(item => typeof item === 'string')){
        errors.push('cast must be a array of string')
     }

     if(errors.length>0){
        res.json({messege: 'some data is incorrect', errors})
     } else{
        next()
     }
}