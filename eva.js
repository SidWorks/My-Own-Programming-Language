
let assert = require('assert');
const Enviroment = require('./Enviroment')
// eva interpreter

class Eva{

    constructor(global = new Enviroment()){
        this.global = global;
    }


    eval(exp,env = this.global){
        if (isNumber(exp)){
            return exp
        }
        if (isString(exp)){
            return exp.slice(1,-1)
        }
        if (exp[0] === '+'){        // For addition 
            return this.eval(exp[1]) + this.eval(exp[2])
        }
         if (exp[0] === '*'){        // For addition 
            return this.eval(exp[1]) * this.eval(exp[2])
        }
         if (exp[0] === '-'){        // For addition 
            return this.eval(exp[1]) - this.eval(exp[2])
        }
        if(exp[0] === 'var'){
            const [_,name,value] = exp
            return env.define(name,value)
        }
        throw `unimplemented : ${JSON.stringify(exp)}`
    }
}
function isNumber(exp) {
    return typeof exp === 'number'
}
function isString(exp){
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"'
}


//--------------
// test 


///MAth
const eva = new Eva();
assert.strictEqual(eva.eval(1),1)
assert.strictEqual(eva.eval(['+',1 ,5]),6)
assert.strictEqual(eva.eval(['+',['*', 2,3] ,5]),11)
assert.strictEqual(eva.eval(['-',['*', 2,3] ,5]),1)
//assert.strictEqual(eva.eval(' "hello" '),'hello')


// Variable 

assert.strictEqual(eva.eval(['var','x' ,5]),5)



console.log( ' All Assertion Passed');