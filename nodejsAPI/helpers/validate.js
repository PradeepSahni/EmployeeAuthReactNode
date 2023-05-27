const Validator = require('validatorjs')

const validator = (body,rules,customMessage,callBack)=>{
    const validation  = new Validator(body,rules,customMessage)
    validation.passes(()=>callBack(null,true))
    validation.fails(()=>callBack(validation.errors,false))
}

module.exports = validator