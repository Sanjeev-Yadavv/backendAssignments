// index.js

//  import the crypto module
const crypto = require('crypto')


//  get a commands using process.argv
let argv = process.argv;
let operation = argv[2]
let numbers = argv.slice(3).map(Number)
// console.log(argv)

// complete the  function



switch (operation) {

    case "add":
        if (numbers.length < 2) {
            console.log('please provide at least two numbers')
        } else {
            console.log(numbers.reduce((acc, curr) => acc + curr, 0));
        }
        break;
    case "sub":
        if (numbers.length < 2) {
            console.log('please provide at least two numbers')
        } else {
            console.log(numbers.reduce((acc, curr) => acc - curr, 0));
        }
        break;
    case "divide":
        if (numbers.length < 2) {
            console.log('please provide at least two numbers')
        } else {
            console.log(numbers.reduce((acc, curr) => acc / curr));
        }
        break;
    case "mult":
        if (numbers.length < 2) {
            console.log('please provide at least two numbers')
        } else {
            console.log(numbers.reduce((acc, curr) => acc * curr, 1));
        }
        break;
    case "sin":
        if (numbers.length !== 1) {
            console.log('please provide only one number')
        } else {
            console.log(Math.sin(numbers[0]));
        }
        break;
    case "cos":

        if (numbers.length !== 1) {
            console.log('please provide only one number')
        } else {
            console.log(Math.cos(numbers[0]));
        }
        break;
    case "tan":
        if (numbers.length !== 1) {
            console.log('please provide only one number')
        } else {
            console.log(Math.tan(numbers[0]));
        }
        break;
    case "random":
        crypto.randomInt(9, (err, n) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Random number is ${n}`)
            }
        })
        break;

    default:
        console.log("Invalid operation");
}
