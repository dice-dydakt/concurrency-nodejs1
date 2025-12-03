// This demonstrates that .then() can be attached BEFORE a Promise is resolved
// The Promise "remembers" to execute the handler when resolve() is eventually called
// Key concept: Promises decouple the timing of registration and resolution

let externalResolve;

const pendingPromise = new Promise((resolve, reject) => {
  console.log("Pending Promise - remembers resolve for future use")
  externalResolve  = resolve;
});

console.log("doing something 1...")
pendingPromise.then(result => {
  console.log("Promise resolved with:", result);
});

console.log("doing something 2...")
// Resolve the first promise
externalResolve(444);
console.log("doing something 3...")

// Expected output:
// Pending Promise - remembers resolve for future use
// doing something 1...
// doing something 2...
// doing something 3...
// Promise resolved with: 444