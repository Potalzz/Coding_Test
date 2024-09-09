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
    const result = []
    for (let i = begin; i <= end; i ++) {
        result.push(checkNum(i))
    }

    return result
}

function checkNum(n) {
    if (n === 1) {
        return 0
    }

    let stack = []
    for (let i = 2; i <= Math.sqrt(n); i ++) {
        if (n % i === 0) {
            stack.push(i)
            if (n / i <= 1e7) {
                return n / i
            }
        }
    }
    
    if (stack.length) {
        return stack[stack.length - 1]
    }
    
    return 1
}
