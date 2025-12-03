function printAsync(s, cb) {
    var delay = Math.floor((Math.random()*1000)+500);
    setTimeout(function() {
        console.log(s);
        if (cb) cb();
    }, delay);
 }
 
 printAsync("1");
 printAsync("2");
 printAsync("3");
 
 console.log('done!');

// Expected output (order of 1,2,3 varies due to random delays):
// done!
// 2
// 1
// 3