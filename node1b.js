function printAsync(s, cb) {
   var delay = Math.floor((Math.random()*1000)+500);
   setTimeout(function() {
       console.log(s);
       if (cb) cb();
   }, delay);
}

// Approach 2: task array
function runSequence(tasks, index, onComplete) {
    if (index >= tasks.length) {
        onComplete();
        return;
    }
    tasks[index](() => runSequence(tasks, index + 1, onComplete));
}

const tasks = [
    (cb) => printAsync("1", cb),
    (cb) => printAsync("2", cb),
    (cb) => printAsync("3", cb)
];

runSequence(tasks, 0, () => console.log('done!'));