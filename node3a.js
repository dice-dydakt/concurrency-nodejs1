// ============================================
// node3a.js - Basic async/await
// ============================================
// Shows how async/await makes async code look synchronous

function printAsync(s) {
    var delay = Math.floor((Math.random()*1000)+500);
    return new Promise((resolve) => {
        setTimeout(function() {
            console.log(s);
            resolve();
        }, delay);
    });
}

// Compare: Promise version (from node2a.js)
console.log('=== Promise version (.then chaining) ===');
printAsync(1)
    .then(() => printAsync(2))
    .then(() => printAsync(3))
    .then(() => console.log('done with promises!'));

// async/await version - much cleaner!
setTimeout(async () => {
    console.log('\n=== async/await version ===');
    await printAsync(1);
    await printAsync(2);
    await printAsync(3);
    console.log('done with async/await!');
}, 3000);

// Key insights:
// 1. async function always returns a Promise
// 2. await pauses execution until Promise resolves
// 3. Code looks synchronous but is still async
// 4. No .then() chains - much easier to read!

// Expected output:
// === Promise version (.then chaining) ===
// 1
// 2
// 3
// done with promises!
//
// === async/await version ===
// 1
// 2
// 3
// done with async/await!
