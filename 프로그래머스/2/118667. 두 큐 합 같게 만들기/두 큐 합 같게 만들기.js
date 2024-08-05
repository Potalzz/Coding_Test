/*
두 큐를 이어붙인 뒤, 두 개의 포인터를 통해 한쪽의 합산을 계산한다.
*/

function solution(queue1, queue2) {
    let q1 = queue1.reduce((total,el) => {
        return total += el}, 0)
    let q2 = queue2.reduce((total,el) => {
        return total += el}, 0)
    let goal = (q1 + q2) / 2
    
    let queue = [...queue1, ...queue2]
    let start = 0
    let end = queue1.length-1
    let sum = q1
    let count = 0
    while(sum !== goal && count <= queue1.length * 3) {
        if (sum > goal) {
            sum -= queue[start]
            start ++
            count ++
        } else {
            sum += queue[end+1]
            end ++
            count ++
        }
    }
    const answer = sum === goal ? count : -1
    
    return answer
}