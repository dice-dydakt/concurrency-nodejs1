// ============================================
// node3c.js - Sequential vs Parallel execution
// ============================================
// Shows the critical difference between sequential and parallel async

function fetchData(id) {
    return new Promise((resolve) => {
        const delay = 1000; // Fixed delay for clear timing
        setTimeout(() => {
            console.log(`  Fetched data ${id}`);
            resolve(`data-${id}`);
        }, delay);
    });
}

// Sequential - one at a time (SLOW)
async function sequentialFetch() {
    console.log('=== Sequential (one at a time) ===');
    const start = Date.now();

    const data1 = await fetchData(1);  // Wait for 1 to finish
    const data2 = await fetchData(2);  // Then wait for 2
    const data3 = await fetchData(3);  // Then wait for 3

    const duration = Date.now() - start;
    console.log(`Sequential took: ${duration}ms (~3000ms)\n`);
    return [data1, data2, data3];
}

// Parallel - all at once (FAST)
async function parallelFetch() {
    console.log('=== Parallel (all at once) ===');
    const start = Date.now();

    // Start all fetches immediately (don't await yet!)
    const promise1 = fetchData(1);
    const promise2 = fetchData(2);
    const promise3 = fetchData(3);

    // Now wait for all to complete
    const results = await Promise.all([promise1, promise2, promise3]);

    const duration = Date.now() - start;
    console.log(`Parallel took: ${duration}ms (~1000ms)\n`);
    return results;
}

// Run both
(async () => {
    await sequentialFetch();
    await parallelFetch();

    console.log('Key difference:');
    console.log('  Sequential: await immediately → blocks → slow');
    console.log('  Parallel: start all → then await → fast');
})();

// Key insights:
// 1. Sequential: await each operation before starting next
//    - Easy to read, but SLOW
//    - Use when operations depend on each other
//
// 2. Parallel: start all operations, then await Promise.all()
//    - FAST - operations run simultaneously
//    - Use when operations are independent
//
// 3. Common mistake:
//    ❌ for (const id of ids) { await fetch(id); }  // Sequential!
//    ✅ await Promise.all(ids.map(id => fetch(id))) // Parallel!

// Expected output:
// === Sequential (one at a time) ===
//   Fetched data 1
//   Fetched data 2
//   Fetched data 3
// Sequential took: ~3000ms
//
// === Parallel (all at once) ===
//   Fetched data 1
//   Fetched data 2
//   Fetched data 3
// Parallel took: ~1000ms
