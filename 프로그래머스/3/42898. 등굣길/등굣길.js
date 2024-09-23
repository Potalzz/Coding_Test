/*
문제 정의
목표 지점 v까지의 최단 경로 개수

하위 문제
i,j의 칸에 해당 칸으로 갈 수 있는 위, 왼쪽칸에 갈 수 있는 경우의 수를 더해준다.

추측
도착 지점과 맞 닿아있는 지점의 도착할 수 있는 경우의 수를 구한다.

하위문제와 해결방안 연결 (점화식 세우기)
DP(i,j) = DP(i-1, j) + DP(i, j-1)

알고리즘 구현(검증)
오른쪽, 아래로만 이동하므로 비순환적인 위상 순서를 만족한다.

원래 문제 풀기
도착 지점까지 이동하고, 도착가능한 경우는 모두 최단 경로이다.

*/

function solution(m, n, puddles) {
    const dp = Array.from({length : n + 1}, () => Array(m + 1).fill(0))
    dp[1][1] = 1
    
    const checkPuddle = (i,j) => {
        for (let [y,x] of puddles) {
            if (i === x && j === y) {
                return true
            }
        }
        return false
    }
    
    for (let i = 1; i < n + 1; i ++) {
        for (let j = 1; j < m + 1; j ++) {
            if (checkPuddle(i,j)) {
                continue
            }
            else {
                dp[i][j] += dp[i - 1][j] + dp[i][j - 1] % 1000000007
            }
            
        }
    }
    return dp[n][m] % 1000000007
}

