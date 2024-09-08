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
    let answer = 1;
    targets.sort((a, b) => {return a[1] - b[1]});
    targets.sort((a, b) => {return a[0] - b[0]});

    let e = targets[0][1];

    for(const i of targets){
        if(e > i[0]){
            e = Math.min(i[1], e);
        }else {
            answer++;
            e = i[1];
        }
    }

    return answer;
}