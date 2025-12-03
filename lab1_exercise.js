// ==============================================
// Node.js LAB 1: Fix forEach/Async Anti-pattern
// ==============================================
//
// SCENARIO:
// Given a list of user IDs, fetch their scores from a mock API.
// 
// OBJECTIVES:
// - Understand why forEach doesn't work with async operations
// - Use Promise.all() for parallel async processing
// - Using '.then' chaining, wait for results and correctly print summary
// - Then rewrite it using async/await syntax (keep the solution which uses
//                                     .then chaining in the comment!)
// 
// ============================================

// Mock API - simulates fetching user data with FIXED delay
function fetchUserData(userId) {
    return new Promise((resolve) => {
        const delay = 1000;  // Fixed 1 second delay for performance comparison
        setTimeout(() => {
            resolve({
                id: userId,
                name: `User ${userId}`,
                score: userId % 100  // Deterministic score based on userId
            });
        }, delay);
    });
}

// ============================================
// THE BROKEN CODE (forEach anti-pattern)
// ============================================

const userIds = [101, 102, 103, 104, 105];
const results = [];

console.log('Starting to fetch users...');

// BUG: forEach doesn't wait for async operations!
userIds.forEach(userId => {
    fetchUserData(userId).then(userData => {
        results.push(userData);
        console.log(`Fetched: ${userData.name} (score: ${userData.score})`);
    });
});

// Print summary
console.log(`Total users fetched: ${results.length}`); 
console.log('Processing complete!'); 
const totalScore = results.reduce((sum, user) => sum + user.score, 0);
console.log(`Total score: ${totalScore}`); 

// ============================================
// YOUR TASKS: Fix the forEach problem TWO ways
// ============================================
//
// TASK 1: Implement fetchSequential() using for...of with await
// - Fetches users ONE AT A TIME (sequential)
// - Measure execution time
// - Expected: ~5000ms (5 users × 1000ms each)
//
// TASK 2: Implement fetchParallel() using Promise.all()
// - Fetches ALL users at once (parallel)
// - Measure execution time
// - Expected: ~1000ms (all run simultaneously)
//
// TASK 3: Compare performance in main()
//
// ============================================

// TODO: Implement fetchSequential
async function fetchSequential(userIds) {
    const startTime = Date.now();
    const results = [];

    // TODO: Use for...of loop to fetch users ONE AT A TIME
    // Hint: for (const userId of userIds) { ... }
    // Remember to await each fetchUserData(userId) call!

    const duration = Date.now() - startTime;
    console.log(`\nSequential took: ${duration}ms`);
    return results;
}

// TODO: Implement fetchParallel
async function fetchParallel(userIds) {
    const startTime = Date.now();

    // TODO: Use .map() to create array of promises, then Promise.all()
    // Hint: const promises = userIds.map(userId => fetchUserData(userId));
    // Then: const results = await Promise.all(promises);

    const duration = Date.now() - startTime;
    console.log(`\nParallel took: ${duration}ms`);
    return results;
}

// Main function to compare both approaches
async function main() {
    console.log('=== Sequential Execution ===');
    const seqResults = await fetchSequential(userIds);
    const seqTotal = seqResults.reduce((sum, user) => sum + user.score, 0);
    console.log(`Total users: ${seqResults.length}, Total score: ${seqTotal}\n`);

    console.log('=== Parallel Execution ===');
    const parResults = await fetchParallel(userIds);
    const parTotal = parResults.reduce((sum, user) => sum + user.score, 0);
    console.log(`Total users: ${parResults.length}, Total score: ${parTotal}\n`);

    console.log('=== Performance Comparison ===');
    console.log('Sequential: ~5000ms (one at a time)');
    console.log('Parallel:   ~1000ms (all at once)');
    console.log('Speedup:    ~5x faster!');
}

// Uncomment to run:
// main();

// ============================================
// EXPECTED OUTPUT (when fixed):
// ============================================
// === Sequential Execution ===
// Fetched: User 101 (score: 1)
// Fetched: User 102 (score: 2)
// Fetched: User 103 (score: 3)
// Fetched: User 104 (score: 4)
// Fetched: User 105 (score: 5)
//
// Sequential took: 5XXXms
// Total users: 5, Total score: 15
//
// === Parallel Execution ===
// Fetched: User 101 (score: 1)
// Fetched: User 102 (score: 2)
// Fetched: User 103 (score: 3)
// Fetched: User 104 (score: 4)
// Fetched: User 105 (score: 5)
//
// Parallel took: 1XXXms
// Total users: 5, Total score: 15
//
// === Performance Comparison ===
// Sequential: ~5000ms (one at a time)
// Parallel:   ~1000ms (all at once)
// Speedup:    ~5x faster!
// ============================================