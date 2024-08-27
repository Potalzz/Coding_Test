/*
직접 이동하지 말고, 재귀함수를 통해 우선순위를 정해서 이동
1-> 2
2 -> 3
*/

function solution(n) {
    let result = []
    function hanoi(n, start, goal, pass)
    {
        if (n === 1) 
        {
            result.push([start,goal])
        }
        else 
        {
            hanoi(n-1, start, pass, goal)        
            result.push([start,goal])
            hanoi(n-1, pass, goal, start)
        }
    }
    
    hanoi(n, 1, 3, 2)
    
    return result
}