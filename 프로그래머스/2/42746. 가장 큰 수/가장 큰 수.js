/*
첫번째 자리 수를 비교하고 
*/
function solution(numbers) {
    numbers = numbers.map((num) => num.toString()).sort((a,b) => (b + a) - (a + b)).join("")
    if (numbers[0] === "0") return "0"
    return numbers
}