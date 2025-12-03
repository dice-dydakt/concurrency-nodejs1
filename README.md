# Node.js Lab 1: Fix forEach/Async Anti-pattern

## The Problem

The code in `lab1_exercise.js` tries to fetch data for 5 users, but it's **broken**:

```javascript
const results = [];

userIds.forEach(userId => {
    fetchUserData(userId).then(userData => {
        results.push(userData);
    });
});

console.log(`Total users: ${results.length}`); // Always 0!
```

## Running Your Code

### Test your solution:
```bash
node lab1_exercise.js
```