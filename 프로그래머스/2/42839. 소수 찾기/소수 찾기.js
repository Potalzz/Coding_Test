/*
1. 숫자를 배열로 만든다.
2. DFS를 통해 모든 숫자 조합의 경우의 수를 조합한다.
3. 숫자를 소수 판별 함수에 넣어 확인한다.
4. 총 소수의 개수를 반환한다.
*/

function solution(numbers) {
    let numsArr = numbers.split("")
    let visited = new Array(numbers.length).fill(false)
    let nums = new Set()
    let count = 0
    function dfs(arr, visited, num) {
    if (num.length === arr.length) return
    
    for (let i = 0; i < arr.length; i ++) {
        if (!visited[i]) {
            let cur = parseInt(num + arr[i])
            if (!nums.has(cur) && isPrime(cur)) {
                count ++
            }
            nums.add(cur)
            visited[i] = true
            dfs(arr, visited, cur)
            visited[i] = false
        }
    }
}
    
    dfs(numbers, visited, "")
    
    return count
}

function isPrime(num) {
    if (num <= 1) return false
    for(let i = 2; i <= Math.sqrt(num); i++ ) {
        if (num % i === 0) return false
    }
    return true
}

