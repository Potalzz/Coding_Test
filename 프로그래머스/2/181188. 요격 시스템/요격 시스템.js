/*
가장 겹치는 부분이 많은 지점을 골라 속해있는 좌표들에 false 삽입.

겹치는 구간인지 판별
앞의 구간을 a 뒤의 구간을 b라고 가정.
b의 시작점이 a의 종료지점보다 작으면 겹치는 구간.

로직
1. 미사일을 종료 지점 기준으로 내림차순 정렬한다.
2. 다음 미사일이 겹치는 구간일 경우, 겹치는 구간 미사일의 종료지점을 c, c보다 작은 시작지점의 미사일들을 찾는다.
3. 해당 미사일들을 1번의 요격으로 제거하고, 다음 미사일부터 다시 찾아나간다.

*/

function solution(targets) {
    targets.sort((a,b) => a[1] - b[1])
    let count = 0
    for (let i = 0; i < targets.length; i ++) {
        let endPoint = targets[i][1]
        while (i < targets.length - 1 && targets[i + 1][0] < endPoint) {
            i ++                        
        }
        count ++
    }
    
    return count
}