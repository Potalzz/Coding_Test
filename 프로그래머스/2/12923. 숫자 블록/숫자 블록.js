/*
해당 블럭의 숫자를 확인하는 로직
소수라면 0
소수가 아니라면 해당 수의 약수 중 가장 큰 숫자.
그러므로, 2부터 루트n까지 나누어 떨어질 때 까지 나눈다.
n의 최대 시도 횟수는 logn.
n이 2천만 이상이라면, Math.floor(n / 1천만)부터 시작한다.
*/

/*
해당 블럭의 숫자를 확인하는 로직
소수라면 0
소수가 아니라면 해당 수의 약수 중 가장 큰 숫자.
그러므로, 2부터 루트n까지 나누어 떨어질 때 까지 나눈다.
n의 최대 시도 횟수는 logn.
n이 2천만 이상이라면, Math.floor(n / 1천만)부터 시작한다.
*/

function solution(begin, end) {
    let result = []
    if (begin === 1) {
        result.push(0)
        begin += 1
    }
    
    for (let i = begin; i <= end; i ++) {
        if (isPrime(i)) {
            result.push(1)
            continue
        }
        for (let j = 2; j <= Math.sqrt(i); j ++) {
            if (i % j === 0) {
                let value = i / j
                if (value > 10000000) {
                    let temp = j
                    for (let k = j + 1; k <= Math.sqrt(i); k ++) {
                        if (i % k === 0) {
                            temp = k
                        }
                    }
                    value = temp
                }
                result.push(value)
                break
            }
        }
    }
    
    return result
}

function isPrime(n) {
    for (let i = 2; i <= Math.sqrt(n); i ++) {
        if (n % i === 0) {
            return false
        }
    }
    
    return true
}