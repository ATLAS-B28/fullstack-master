/*const items = {
    food:1000,
    drink:400
}
let cart = 0
let addToCart = (item)=> {
     
    return cart+item
   
}

let print= (item)=>{
  cart=addToCart(item)
  console.log(cart)
} 

print(items.food)
//addToCart('drink',items.drink)
console.log('food :',cart)
//map code
function map(f,a){
    const result = new Array(a.length)
    for (let i = 0; i < a.length; i++) {
        result[i] = f(a[i]);
        
    }
    return result
}
const f = function(x){
    return x*x
}
const nums = [0,1,2,4,5,8,9]
const cube = map(f,nums)
console.log(cube)*/
//this keyword corresponds to the current object in execution
//in function
//in object
//const obj1={
    //name:"Aditya Bhambere",
    //getThis:()=>{
    //    console.log(this)
  //  }
//}
//obj1.getThis()
//array
//const arr1 = [1,3,5,7,9]
//console.log(arr1.push(4))
//console.log(arr1.pop(3))
//map
let arr2 = [1,2,3,40,50,60,78,90]
//let arrModified = arr2.map(ele=>{
  //  console.log(ele+1);
//})
let arrFilter = arr2.filter(value => 
    value > 50
)
console.log(arrFilter)
//recursive func
/*let num1 = 1
const printNum = ()=>{
    console.log(num1)
    num1++
    if (num1<=20) {
        printNum()
    } else {
        return
    }


}
printNum()
*/