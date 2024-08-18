/*
첫 번째 자리수는 k-1 / factorial(n-1)
두 번째 자리수는 k = k % factorial(n-1) 에서 k를 factorial(n-1)로 나눠준 값.

*/

function solution(n, k) {
    const factorial = [1,1,2,6,24]
    const calcFactorial = (n) => {
        if (factorial[n]) {
            return factorial[n]
        }
        else {
            factorial[n] = calcFactorial(n-1) * n
            return factorial[n]
        }
    }
    calcFactorial(n) 
    let result = []
    let numsArray = []
    for (let i = 0; i < n; i ++) {
        numsArray[i] = i + 1
    }
    
    while (n > 0) {
        result.push(numsArray.splice(Math.floor((k-1) / factorial[n-1]),1)[0])
        k = k % factorial[n-1]
        n --
    }
    if(result[0] === null) result.shift()
    
    return result
}