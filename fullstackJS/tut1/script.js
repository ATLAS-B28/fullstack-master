let myFunction = () => {
  const container = document.getElementById("container");

  
  const childNodes = container.getElementsByClassName("child");
  for (let i = 0; i <= childNodes.length; i++) {
    childNodes[i].style.color = "blue";
   }
};
let object = {
    name:"Aditya",
    rollNo:93,
    test:['fail','pass','distinction'],
    "full name":"Aditya Bhambere"
}
let array = ['Aditya','Aranyka','Ajthashatru']
console.log(object["full name"])
console.log(object.rollNo)
//conditionals
const val = true
if (val === true) {
    console.log("Val is true")
} else {
    console.log("Val is false")
}
const val1 = 6
if (val1%2==0) {
    console.log("Value is even")
}
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(element)
}
let array1 = ['3','3','4']
array1.forEach(element => {
    let i = 0
    element[i] == '3' ? console.log("Numbers are all three"):console.log("Not three.")
});
for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        console.log(element)
    }
}
let array2 = ['aaass',[1,2,3,4],'asdff','wdefrf']
for (const iterator of array2) {
    console.log(iterator)
}
const iterable = {
    [Symbol.iterator](){
        let i = 1;
        return {
            next() {
                if(i<=4){
                    return {value:i++,done:false}
                }
                return {value:undefined,done:true}
            },
        }
    }
}
console.log('this is for of');
for (const iterator of iterable) {
    console.log(iterator)
}
let n= 0
let x=0
console.log('this is while loop 1');

while (n<4) {
   
    x+=n
    console.log(x)
    console.log(n)
    n++
}
console.log('this is while loop 2');
while (n<7) {
    if(n===4) break
    n = n+1
 
}
console.log(n)
console.log('This do while loop')
let y =0 
do {
    y++
    console.log(y)
} while (y<6);
console.log('This is switch statement')
let num1 = 3
let num2 = 4
switch (num1<num2) {
    case true:
        console.log("This is the first case: num1 < num2")
        break;
    
  case false:
    console.log("This is the 2nd case : num1 > num2")
    break
}
