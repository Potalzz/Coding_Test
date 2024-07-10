/*
+1과 -1 두가지로 나누어서 재귀함수로 반복.
재귀함수에 들어갈 인수 (index, sum + 1 or -1 )

종료조건
inddex가 numbers.length와 동일하면 숫자의 합계를 확인하고 종료.
*/

function solution(numbers, target) {
    let count = 0
    let length = numbers.length
    function dfs(index, sum) {
        if (index === length) {
            if(sum === target) count ++
            return
        }
        
            dfs(index + 1, sum + numbers[index]) 
            dfs(index + 1, sum - numbers[index])
    }
    dfs(0,0)
    
    return count;
}