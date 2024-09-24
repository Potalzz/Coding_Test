/*
문제 정의
N을 사용해서 number를 만들 수 있는 최소 사용 횟수를 구해라.

하위 문제
number가 되는 연산이 무엇인가 ?

추측
연산을 통해 만들어질 다음 값

추측의 개수는 연산의 개수인 총 4가지 + '-'와 '/'의 반대 순서 2가지 = 총 6가지와
자리수 7자리 부터 1자리까지 하여 7 * 6 = 42가지

하위 문제와 해 연결(점화식)
DP(n, count) = n 연산자 n

알고리즘 구현(검증)
상향식으로 구현

8번의 연산이 되면 끝이므로 명확한 종료 지점 존재하며, 모든 연산을 통해 위상 순서를 만족한다.
*/

function solution(N, number) {
    // 연산자와 연산 함수
    const operators = ['*', '+', '/', '-', '--', '//']
    const calculator = (k, op, num) => {
        if (op === '*') return k * num
        if (op === '/') return Math.floor(k / num)
        if (op === '+') return k + num
        if (op === '-') return k - num
        // 빼기와 나누기의 경우 순서에 따라 결과가 달라지는 부분 고려
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