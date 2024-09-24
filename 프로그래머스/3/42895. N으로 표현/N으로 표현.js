/*
문제 정의
N을 사용해서 number를 만들 수 있는 최소 사용 횟수를 구해라.

하위 문제
number가 되는 연산이 무엇인가 ?
연산자 4개와 최대 8번 이므로 4^8인데 해결 시간은 상수 시간

추측
number가 될 수 있는 마지막 숫자.
Ex) 더하기나 빼기, 곱하기 나누기 총 4개 중 한 번의 연산으로 number가 되는 수.
추측의 개수는 연산의 개수인 총 3가지(첫 연산 이후)

하위 문제와 해 연결(점화식)
DP(k, o) = k 연산자 N (첫 연산만 4가지 이후는 이전 연산 역연산 제외 3가지)

알고리즘 구현(검증)
재귀함수를 통해 구현

순환을 방지하기 위해, 이전 연산의 역이 되는 연산을 방지한다.

8번의 연산이 되면 끝이므로 명확한 종료 지점 존재.
*/

function solution(N, number) {
    // 연산자와 연산 함수
    const operators = ['*', '+', '/', '-', '--', '//']
    const calculator = (k, op, num) => {
        if (op === '*') return k * num
        if (op === '/') return Math.floor(k / num)
        if (op === '+') return k + num
        if (op === '-') return k - num
        if (op === '--') return num - k
        if (op === '//') return Math.floor(num / k)
    }
    
    // N의 개수 별로 배열 생성
    const nArray = [0]
    for (let i = 1; i < 8; i ++) {
        nArray.push(parseInt(N.toString().repeat(i)))
    }
    
    let minCount = 9
    // DP함수 로직
    function dp(k, count) {
        if (k === number) {
            minCount = Math.min(minCount, count)
            return
        }
        if (count > 8) {
            return
        }
        for (let op of operators) {
            for (let j = 1; j < Math.min(9, 9 - count); j ++) {
                let calK = calculator(k,op, nArray[j])
                dp(calK, count + j)
            }
        }
    }
    // DP 실행
    for (let i = 1; i <= 7; i++) {
        dp(nArray[i], i)
    }
    
    // 최솟값이 8 초과인 경우 -1 반환
    if (minCount > 8) minCount = -1
    
    return minCount
}
