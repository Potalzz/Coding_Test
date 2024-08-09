function solution(number, k) {
    let stk = []
    for (let i = 0; i < number.length; i ++) {
        while (k > 0 && stk.length > 0 && number[i] > stk[stk.length - 1]) {
            k --
            stk.pop()
        }
        stk.push(number[i])
    }
    
    stk.splice(stk.length-k,k)
    return stk.join("")
}