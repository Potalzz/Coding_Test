/*
DFS를 통한 풀이 -> 조합의 개수가 너무 많아 시간초과
시간 복잡도가 (4^10)^5이므로 초과

DP를 활용한 풀이
문제 작게 쪼개기
한 행의 값을 이전 행의 가장 큰 값과 더한 값. 같은 열의 값은 두 번째로 큰 값과의 합.
한 행의 가장 큰 값과 두 번째로 큰 값을 구한다.
다음 행의 모든 값에 가장 큰 값을 더해주고, 가장 큰 값과 같은 index를 갖는 값에는 두 번째로 큰 값을 더해준다. 
*/
function solution(land) {
    const N = land.length
    let dp = []
    for (let i = 0; i < N; i ++ ) {
        dp[i] = land[i].slice()    
    }
    
    for(let i = 1; i < N; i ++) {
        for (let j = 0; j < 4; j ++) {
            dp[i][j] += Math.max(dp[i-1][(j + 1) % 4], dp[i-1][(j + 2) % 4], dp[i-1][(j + 3) % 4])
        }
    }
    return Math.max(...dp[N-1])
}