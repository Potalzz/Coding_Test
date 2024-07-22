/*
가장 먼저 각 큐의 원소 합을 같게 만들 수 있는지 판별한다.
불가능한 경우
가장 큰 값이 총 합의 절반을 넘는 경우
총 합이 홀수인 경우
두 배열이 서로 바뀔 때 까지 안되는 경우
ex) [7,3]    [2,10]
    [7,3,2]  [10]
    [3,2]    [10,7]
    [3,2,10] [7]
    [2,10]   [7,3]
    
우선 순위
더 큰 값을 가진 큐에서 빼기.

*/

function solution(queue1, queue2) {
    let sum1 = queue1.reduce((sum,el) => sum + el)
    let sum2 = queue2.reduce((sum,el) => sum + el)
    const half = (sum1 + sum2) /  2
    const q = [...queue1, ...queue2]
    let q1Pointer = 0
    let q2Pointer = queue1.length
    for(let cnt = 0; cnt < queue1.length * 3; cnt++) {
        if (sum1 === half) {
            return cnt
        }
        sum1 = sum1 > half ? sum1 - q[q1Pointer++ % q.length] : sum1 + q[q2Pointer++ % q.length]
    }
    
    return -1
}