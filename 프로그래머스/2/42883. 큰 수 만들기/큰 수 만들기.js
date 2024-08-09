function solution(number, k) {
    let stack = []
    for (let i = 0; i < number.length; i ++ ) {
        const item = number[i]
        if (stack.length === 0) {
            stack.push(item)
            continue
        }
        while (number[i] > stack[stack.length-1]) {
            stack.pop()
            k --
            if (k === 0) return stack.join("") + number.slice(i)
            
            if (stack.length === 0) break
        }
        stack.push(item)
        
    }
    
    
    return stack.join("").slice(0, number.length - k)
}