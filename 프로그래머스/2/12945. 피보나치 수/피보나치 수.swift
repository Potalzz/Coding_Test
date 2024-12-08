func solution(_ n:Int) -> Int {
    var memory = [0, 1]
    for i in 2...n {
        memory.append((memory[i - 1] + memory[i - 2]) % 1234567)
    }
    
    return memory.last!
}