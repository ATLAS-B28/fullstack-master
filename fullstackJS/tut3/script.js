/*"use strict";
let promiseCount = 0;
const testPromise = () => {
  //beginning
  let thisCount = ++promiseCount;
  const logedToScreen = document.getElementById("log");
  logedToScreen.insertAdjacentHTML("beforeend", `${thisCount}) started<br>`);
  //a executor function will be resolving or rejecting the promise
  const p = new Promise((resolve, reject) => {
    logedToScreen.insertAdjacentHTML(
      "beforeend",
      `${thisCount}) Promise contructed using constructor<br>`
    );
    //simulate the asynchronism
    setTimeout(() => {
      resolve(thisCount);
    }, Math.random() * 2000 + 1000);
  });
  //if resolved
  p.then((val) => {
    logedToScreen.insertAdjacentHTML(
      "beforeend",
      `${val}) promise fulfilled<br>`
    );
  }).catch((reason) => {
    console.log(`Hanlde rejected promise ${reason} here`);
  });

  //end
  logedToScreen.insertAdjacentHTML(
    "beforeend",
    `${thisCount}) promise made<br>`
  );
};
//btn
const btn = document.getElementById("make_promise");
btn.addEventListener("click", testPromise);
testPromise()
testPromise()
testPromise()
testPromise()
//async await func
function resolveAfterSomeTime(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('resolve')
        },2000)
    })
}
async function asyncCall(){
    console.log('calling');
    const result = await resolveAfterSomeTime()
    console.log(result)
}
asyncCall()
//Async functions and execution order
function resolveFunc1() {
    console.log('starting slow promise');
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("resolved slow")
            console.log("slow promise is done");
        },2000)
    })
}
function resolveFunc2(){
    console.log("starting faster promise");
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("faster")
            console.log("fast promise is done");
        },1000)
    })
}
async function sequntialStart(){
    console.log('Sequential start');
    //execution starts instantly
    const slow = await resolveFunc1()
    console.log(slow);//starts after 2 sec after 1
    const fast = await resolveFunc2()
    console.log(fast);//starts after 3 sec after 1

}
async function concurrentStart(){
    console.log("Concurrent start with await");
    const slow =resolveFunc1()
    const fast =resolveFunc2()
 console.log(await slow);
 console.log(await fast);
}
function consurrentPromise(){
    console.log("Concurrent start with promise.all");
    return Promise.all([resolveFunc1(),resolveFunc2()])
           .then(messages=>{
            console.log(messages[0])//slow
            console.log(messages[1])//fast
           })
}
async function parallelExecution(){
    console.log("Parallel with await Promise.all");
    //start 2 jobs in parallel
    await Promise.all([
        (async ()=> console.log(await resolveFunc1()))(),
        (async ()=> console.log(await resolveFunc2()))(),
    ])
}
sequntialStart()//after 2 seconds logs slow and then after 1 more seconf fast
//wait for the above to finish
setTimeout(concurrentStart,4000)//after 2 sec logs and then fast
//wait again
setTimeout(consurrentPromise,7000)//same a sconsurrentStart
//wait again
setTimeout(parallelExecution,10000)//truly parallel: after 1 sec logs fast and then after 1 more sec slow
///async func with try catch
async function getProcessedData(url){
    let v
    try {
        v = await downloadUrl(url)
    } catch (error) {
        v = await downloadFallbackData(url)
    }
    return processDataInWorker(v)
}
//scoping in es6
function outer() {
    var n1 = 'adi'
    let n2 = 'aditya'
    function inner(){
        var n1 = 'bhambere'
        console.log(n1)//this is change for this func only
    }
    inner()
    console.log(n1);//here the OG value gets printed
    console.log(n2);
}
outer()
//console.log(n1);  gives error
//console.log(n2); gives error
*/
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((json) => console.log(json)) //json from response is logged here
  .catch((err) => console.log(err));
const getData = async () => {
  try {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
getData();
