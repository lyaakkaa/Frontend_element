'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the reverseString function
 * Use console.log() to print to stdout.
 */
function reverseString(s) {
    try{
        let ss = s.split('');
        ss.reverse();
        console.log(ss.join(''));
    }
    catch(e){
        console.log(e.message);
        console.log(s);
        
    }
    
}


function main() {
    const s = eval(readLine());
    
    reverseString(s);
}