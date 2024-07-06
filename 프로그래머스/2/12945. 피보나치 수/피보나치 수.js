function solution(n) {
    let answer = 0;
    let fib = [0,1,1,2,3,5]
    
    for (let i = 0; i <= n; i++) {
        if (!fib[i]) fib[i] = (fib[i-1] + fib[i-2]) % 1234567
    }
    
    return fib[n]
}