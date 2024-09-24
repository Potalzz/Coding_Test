/*
문제 정리
각각 떨어진 집을 털어서 얻을 수 있는 돈의 최댓값 구하기

DP[i] = MAX(DP[now], DP[i-2])

점화식
DP[i] = Math.max(DP[i-1], DP[i] + DP[i-2])

*/

function solution(money) {
    if (money.length <= 3) {
        return Math.max(...money)
    }
    
    // 첫 번째 집 턴 경우 마지막 집 0 처리
    const DP1 = money.slice()
    DP1.unshift(0)
    DP1[DP1.length - 1] = 0
    // 마지막 집 턴 경우 첫 번째 집 0 처리
    const DP2 = money.slice()
    DP2.push(0)
    DP2[0] = 0
    for(let i = 2; i < money.length + 1; i ++) {
        DP1[i] = Math.max(DP1[i - 1], DP1[i] + DP1[i - 2])
        DP2[i] = Math.max(DP2[i - 1], DP2[i] + DP2[i - 2])
    }
    
    return Math.max(DP1[DP1.length - 1], DP2[DP2.length - 1])
}