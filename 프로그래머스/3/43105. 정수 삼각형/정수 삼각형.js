/*
동적 계획법 5단계
1. 하위 문제 정의
2. 하위 문제 부분 해 구하기
3. 해법과 하위 문제 연결
4. 메모이제이션 or 재귀로 알고리즘 구현
5. 원래 문제 풀기

다음 row에서는 이전 column과 column + 1로만 이동 가능하다.

하위 문제
다음 row에서의 최대값 구하기

*/

function solution(triangle) {
    for (let i = 0; i < triangle.length - 1; i ++) {
        triangle[i+1][0] += triangle[i][0]
        triangle[i+1][triangle[i+1].length -1] += triangle[i][triangle[i].length - 1]
        for (let j = 1; j < triangle[i+1].length - 1; j ++) {
            triangle[i+1][j] += Math.max(triangle[i][j-1], triangle[i][j])
        }
    }
    
    let answer = 0
    let height = triangle.length - 1
    for (let i = 0; i < triangle.length; i ++) {
        let value = triangle[height][i]
        if (value > answer) {
            answer = value
        }
    }
    
    return answer
}