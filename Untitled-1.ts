// Primitives
let username : string = "Pavan";
let age : number = 34;
let isUser : boolean = true;
console.log(username,age,isUser);

// Arrays
let number : number[] = [1,2,3,4,4];
let names : string[] = ['Pavan','turuk'];
console.log(names,number);

let person : [string,number] = ["pavan",25];
console.log(person);

// Enum
enum Color {
    red,blue,green
};

let favoriteColor: Color = Color.blue;
console.log(favoriteColor);

// Any (avoid when possible)
let randomValue : any =10
randomValue = "pavan";
randomValue = true;
console.log(randomValue);

// Unknown (safer than any)
let userInput : unknown
userInput= 5;
userInput ="text";
console.log(userInput);

// void (for function that don't return)
function add(num:number): void {
    console.log(num);
    
}
add(2)

// function that returns
function sub(num1:number,num2:number):number {
    return num1- num2
}
console.log(sub(2,3));

// optional parameter

function greet(name:string,greeting? : string): string {
    if (greeting) {
        return `${greeting} ${name}`
    }
    return `hello ${name}`
}
console.log(greet("pavan"));

// Default Parameter 
function mul(a:number,b: number=1):number {
    return a*b
}
console.log(mul(23));

// rest parameter
function sum(...numbers:number[]):number {
    return numbers.reduce((total,n)=>total + n,0)
}
console.log(sum());

// Array functions
const divide = (a : number,b: number ) : number => a/b
console.log(divide(2,3));

// function types
let calculate : (x: number, y:number) => number
calculate = sub
calculate(2,4)



