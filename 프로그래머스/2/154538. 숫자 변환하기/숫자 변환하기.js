/*
+ n, * 2, * 3
세 가지 연산을 사용해서 x를 y로 만드는 최소 연산 횟수 반환.
불가능하면 -1 반환

최단거리 BFS
*2, *3, +n 3가지 경우의 수로 진행
인수로 넣을 값
(총합, 연산 횟수)
초기 값 (x, 0)
종료 지점 합계가 n보다 같거나 클 때
*/

function solution(x, y, n) {
    if(x === y) return 0
    const dp = {}
    dp[x] = 0
    let datas = [x]
    while(datas.length) {
        const newDatas = []
        for(const data of datas) {
            for(const value of [data + n, data * 2, data * 3]) {
                if (value > y || dp[value])  continue
                if (value === y) return dp[data] + 1
                dp[value] = dp[data] + 1
                newDatas.push(value)
            }
        }
        datas = newDatas
    }
    return -1
}