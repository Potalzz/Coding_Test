const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split(" ");
let x = parseInt(input[0]);
let y = parseInt(input[1]);
let w = parseInt(input[2]);
let h = parseInt(input[3]);
function square(x, y, w, h) {
  let answer = Math.min(w - x, h - y, x, y);
  return answer;
}
console.log(square(x, y, w, h));