/*
숫자의 개수가 최대 7개이므로 조합할 수 있는 모든 숫자를 조합해보고,
소수인지 판별.

DFS로 모든 수의 조합 구하기
인수 (숫자)
종료 조건 , 숫자의 길이가 length에 다다를 경우
*/

function isPrime(num) {
        if (num < 2) return false
        if (num === 2) return true
        for(let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }


function solution(numbers) {
    
    
    
    let count = 0
    numbers = numbers.split("")
    let length = numbers.length
    let results = new Set()
    
    let visitedMap = Array(length).fill(false)
    
    function dfs(num, visited) {
        results.add(parseInt(num))
        if (num.length === length) return
        
        for(let i = 0; i < length; i ++) {
            if (!visited[i]) {
                visited[i] = true
                dfs(num + numbers[i], visited)
                visited[i] = false
            }
        }
    }
    dfs('', visitedMap)
    for (let value of results) {
        if (isPrime(value)) count ++
    }
    
    return count - 1
}