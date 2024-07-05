/*
문제풀이

문제
주어진 수 n을 k진수로 변환했을 때, 소수(p)가 0P0, P0, 0P, P에 해당하는 경우의 총합을 반환해라.
단, 각 자리수에 0이 포함되는 소수는 제외.

아이디어
주어진 수 n을 먼저 k 진수로 변환한다.
0을 기점으로 숫자를 카운트하면서 소수에 맞는지 판별한다.
*/

function solution(n, k) {
    let count = 0;
    
    function isPrime(num) {
        num = parseInt(num)
        if (num === 1) return false
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
    
    let nums = n.toString(k).split(0).filter((el) => el)
    
    for (num of nums) {
        if (isPrime(num)) count ++
    }
    
    
    return count;
}