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
    // 숫자 같은 경우 0 반환
    if(x === y) return 0
    // dp테이블 생성
    const dp = {}
    //dp테이블에 연산해서 나온 값을 index로 count횟수를 넣어준다.
    dp[x] = 0
    
    // 연산해서 나온 값들로 계속해서 연산 작업
    let datas = [x]
    // 목표값인 y를 넘어가는 값들로 이루어질 때까지 진행
    while(datas.length) {
        const temp = []
        // 이전 연산의 결과값들로 다시 연산 진행
        for(const data of datas) {
            // 연산한 값을 value에 해당
            for(const value of [data + n, data * 2, data * 3]) {
                // y를 넘어가는 경우 패스
                if (value > y || dp[value])  continue
                // 목표값과 일치할 경우 이전 연산횟수에 1을 더해준 값 반환
                if (value === y) return dp[data] + 1
                // dp[값] = count횟수로 dp테이블에 저장
                dp[value] = dp[data] + 1
                // 연산해서 나온 값들을 data에 넣어주기 위해 temp에 임시 저장
                temp.push(value)
            }
        }
        datas = temp
    }
    return -1
}