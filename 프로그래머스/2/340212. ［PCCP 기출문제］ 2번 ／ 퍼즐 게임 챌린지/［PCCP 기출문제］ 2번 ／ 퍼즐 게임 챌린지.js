/*
diffs는 각 퍼즐의 레벨
times는 각 퍼즐의 소요시간
i번째 퍼즐의 소요시간은 times[i]이고 이전 시간은 times[i-1]
첫 번째 퍼즐은 이전 퍼즐의 시간이 없음.
이전 퍼즐을 다시 풀 때는 무조건 한 번만에 해결.

사용자에게 필요한 최소 레벨 반환.

퍼즐의 개수는 최대 30만개.
N^2 미만으로 풀어야 함.
최대 O(N logN)

결국 제한시간 내에 모든 퍼즐을 해결하는 변곡점을 찾으면 된다.

diffs의 최댓값과 1 사이의 범위로 이진탐색 실행하다보면 n logn으로 해결 가능.
*/

function solution(diffs, times, limit) {
    let max = 100000
    let min = 1
    let answer = max
    
    while(min <= max) {
        let level = Math.floor((min + max) / 2)
        let spendTime = 0
        for (let i = 0; i < diffs.length; i ++) {
            let levelDifference = diffs[i] - level
            if (levelDifference > 0) {
                spendTime += (levelDifference) * (times[i] + times[i-1]) + times[i]
            }
            else {
                spendTime += times[i]
            }
            
            if (spendTime > limit) {
                break
            }
        }
        
        if(spendTime > limit) {
            min = level + 1
        }
        else {
            answer = level
            max = level - 1
        }
    }
    return answer
}