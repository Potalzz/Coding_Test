/*
총 조합의 개수는 n!이다.
각각 자리수는 (n-1)!마다 변함.
k를 (n-1)!로 나누고 다음 자리수를 계산
*/

function solution(n, k) {
    let factorial = [1,1,2,6,24]
    function makeFactorial(n) {
        if (factorial[n]) return factorial[n]
        factorial[n] = makeFactorial(n-1) * n
        return factorial[n]
    }
    makeFactorial(n)
    let result = []
    let nums = []
    for(let i = 1; i <= n; i ++) {
        nums.push(i)
    }
    
    while (n > 0) {
        let index = Math.floor((k-1) / factorial[n-1])
        if (index === n) index --
        result.push(nums.splice(index,1)[0])
        k = k % factorial[n-1]
        n --
    }
    
    return result
}