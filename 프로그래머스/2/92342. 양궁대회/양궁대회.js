/*
도전자(어피치)가 모든 화살을 쏘고, 전 우승자(라이언)이 모든 화살 발사.
이전 우승자에게 디메리트 적용.

우승자 선정 방식
1. 같은 점수를 더 많이 맞춘 사람이 해당 점수를 가져감.(동률일 경우 도전자가)
    1.1 10점을 각각 2번씩 맞출 경우 도전자가 10점 획득
    1.2 임의의 수 k를 둘 다 0번씩 맞춘 경우 둘다 획득 불가.
2. 1의 방식으로 모든 점수를 계산하고, 최종 점수가 동률일 경우 도전자가 승리

라이언이 가장 큰 점수차로 우승하기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지 10점부터 0점까지의 순서대로 배열에 담아 반환.
(이길 수 없는 경우 [-1] 반환)

시간 복잡도
n이 10이하의 수이므로 시간적 제한은 없다고 봐도 무방함.




*/

function solution(n, info) {
    let answer = Array(11).fill(0)
    let maxPoint = 0
    
    
    function findMaxPoint(challengerPoint, championPoint, usedShot, currentPoint, arr) {
        if (usedShot > n) {
            return
        }
        
        if (currentPoint > 10) {
            let diff = championPoint - challengerPoint
            if (diff > maxPoint) {
                arr[10] = n - usedShot
                maxPoint = diff
                answer = arr
            }
            return
        }
        
        let currentArr = [...arr]
        currentArr[10 - currentPoint] = info[10 - currentPoint] + 1
        
        findMaxPoint(
        challengerPoint,
        championPoint + currentPoint,
        usedShot + info[10 - currentPoint] + 1,
        currentPoint + 1,
        currentArr
        )
        
        
        if (info[10 - currentPoint] > 0) {
            findMaxPoint(challengerPoint + currentPoint, championPoint, usedShot, currentPoint + 1, arr)
        }
        else {
            findMaxPoint(challengerPoint, championPoint, usedShot, currentPoint + 1, arr)
        }
    }
    
    findMaxPoint(0,0,0,0,answer)
    
    return maxPoint <= 0 ? [-1] : answer
}