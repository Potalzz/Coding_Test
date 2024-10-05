/*
동적 계획법 단계
1. 하위 문제 정의
2. 해의 일부 추측
3. 하위 문제와 해법 연결 (점화식 세우기)
4. 코드 구현
5. 원래 문제와 비교

맨 아래 숫자부터 위로 올라가면서 큰 수를 배정


*/

function solution(triangle) {
    for (let i = triangle.length - 2; i >= 0; i --) {
        for (let j = 0; j < triangle[i].length; j ++) {
            triangle[i][j] += Math.max(triangle[i+1][j], triangle[i+1][j+1])
        }
    }
    
    return triangle[0][0]
}