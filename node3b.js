// ============================================
// node3b.js - Error handling with async/await
// ============================================
// Shows how to handle errors with try/catch vs .catch()

function printAsync(s, shouldFail = false) {
    var delay = Math.floor((Math.random()*1000)+500);
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (shouldFail) {
                reject(new Error(`Failed to print ${s}`));
            } else {
                console.log(s);
                resolve();
            }
        }, delay);
    });
}

// Promise version - error handling with .catch()
console.log('=== Promise version with .catch() ===');
printAsync(1)
    .then(() => printAsync(2, true))  // This will fail!
    .then(() => printAsync(3))        // This won't run
    .catch((error) => {
        console.error('Error caught:', error.message);
    });

// async/await version - error handling with try/catch
setTimeout(async () => {
    console.log('\n=== async/await version with try/catch ===');
    try {
        await printAsync(1);
        await printAsync(2, true);  // This will fail!
        await printAsync(3);        // This won't run
    } catch (error) {
        console.error('Error caught:', error.message);
    }
}, 3000);

// Key insights:
// 1. Promises use .catch() for errors
// 2. async/await uses try/catch (more familiar!)
// 3. Both stop execution when error occurs
// 4. try/catch is easier to debug with clear stack traces

// Expected output:
// === Promise version with .catch() ===
// 1
// Error caught: Failed to print 2
//
// === async/await version with try/catch ===
// 1
// Error caught: Failed to print 2
