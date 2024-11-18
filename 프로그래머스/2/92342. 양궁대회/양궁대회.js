/*
우승자 선정 방식
1. 같은 점수를 더 많이 맞춘 사람이 해당 점수를 가져감.(동률일 경우 도전자가)
    1.1 10점을 각각 2번씩 맞출 경우 도전자가 10점 획득
    1.2 임의의 수 k를 둘 다 0번씩 맞춘 경우 둘다 획득 불가.
2. 1의 방식으로 모든 점수를 계산하고, 최종 점수가 동률일 경우 도전자가 승리

라이언이 가장 큰 점수차로 우승하기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지 10점부터 0점까지의 순서대로 배열에 담아 반환.
(이길 수 없는 경우 [-1] 반환)

시간 복잡도
n이 10이하의 수이므로 시간적 제한은 없다고 봐도 무방함.

풀이 방법
0점부터 10점까지 점수를 순환하면서 모든 경우의 수를 반영한다.

경우의 수는 총 세 가지 이다.
1. 라이언이 점수 획득
2. 어피치가 점수 획득
3. 무승부

문제에서 구하고자 하는 게임 결과는 라이언이 가장 큰 점수차로 승리한 상황이므로
각 점수마다 라이언에게 가장 유리한 상황으로 반영한다.
총 세 가지 경우의 수를 통해 살펴보자.

1. 라이언이 점수 획득
- 라이언이 이겼을 경우는 화살 1개 차이로 이긴 경우가 가장 유리하다

2. 어피치가 점수 획득
- 어피치가 이겼을 경우는 화살을 한 개도 사용하지 않은 경우가 가장 유리하다

3. 무승부
- 무승부는 화살 0개 사용으로 고정되어있다.

각 점수마다 세 가지 상황을 반영하여 나올 수 있는 모든 결과를 재귀적으로 구한다.
그리고 가장 큰 점수차를 기록한 경기는 게임의 점수판을 저장해둔 뒤, 마지막에 반환한다.

우리가 구해야 할 부분은 점수차 이므로, 라이언과 어피치 각각의 점수를 저장하지 않고, 점수 차만 반영하면서 게임을 진행한다.
*/

function solution(n, info) {
    let maxScoreBoard = Array(11).fill(0)
    let maxScoreDifference = 0
    
    const findMaxScore = (scoreDifference, attemptCount, point, scoreBoard) => {        
        if (attemptCount > n) {
            return
        }
        
        if (point > 10) {
            if (scoreDifference > maxScoreDifference) {
                scoreBoard[10] = n - attemptCount
                maxScoreBoard = scoreBoard
                maxScoreDifference = scoreDifference
            }
            return
        }
        
        const index = 10 - point
        // 라이언이 점수 획득
        const updateBoard = [...scoreBoard]
        updateBoard[index] = info[index] + 1
        findMaxScore(scoreDifference + point, attemptCount + info[index] + 1, point + 1, updateBoard)
        // 어피치가 점수 획득
        if (info[index] > 0) {
            findMaxScore(scoreDifference - point, attemptCount, point + 1, scoreBoard )    
        }
        else {
            // 둘다 0점
            findMaxScore(scoreDifference, attemptCount, point + 1, scoreBoard )
        }
    }
    
    findMaxScore(0, 0, 0, maxScoreBoard)
    
    if (maxScoreDifference) {
        return maxScoreBoard
    }
    return [-1]
}