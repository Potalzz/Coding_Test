/*
반지름 r인 원 내에 있는 꼭짓점의 점의 개수
4분 원을 기준으로 줄 마다 점의 개수가 몇개인지 세기
높이 = x, 반지름 = r
x = 0일 때, r + 1
x = 1일 때, r

높이 1씩 올라가면서 해당 대각선 길이 모자라면 1씩 줄여가며 r-1 까자 테스트


*/

function solution(r1, r2) {
    let y1 = 0
    let y2 = 0
    let answer = 0
    for (let i = 1; i <= r2; i ++) {
        y2 = Math.sqrt(Math.pow(r2, 2) - Math.pow(i, 2))
        y1 = Math.sqrt(Math.pow(r1, 2) - Math.pow(i, 2))
        if (isNaN(y1)) {
            y1 = 0
        }
        
        answer += Math.floor(y2) - Math.ceil(y1) + 1
    }
    
    return answer * 4
}
    