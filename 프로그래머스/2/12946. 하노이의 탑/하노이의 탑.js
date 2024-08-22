/*
재귀 함수로 해결
n개의 원판을 1번 -> 3번으로 이동해야 하므로,
n-1개는 목적지가 아닌 다른 곳으로 이동 후 마지막 원판을 목적지에 옮겨야 한다.
원판이 하나 남으면 1 -> 3으로 이동하고, 나머지는 1개씩 줄여가면서 1 -> 2, 2 -> 3으로 이동.
*/

function solution(n) {
    let answer = []
    const hanoi = (n, start, goal, passing) => {
        if (n === 1) {
            answer.push([start, goal])
        } else {
            hanoi(n-1, start, passing, goal)
            answer.push([start,goal])
            hanoi(n-1, passing, goal, start)
        }
    }
    
    hanoi(n,1,3,2)
    return answer
}