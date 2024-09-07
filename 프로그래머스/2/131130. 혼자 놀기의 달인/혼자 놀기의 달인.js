/*
1 ~ 100까지의 숫자 존재
임의의 수 n이하의 모든 카드를 각자 상자에 넣음.
상자를 열어서 안에 있는 카드의 번호에 해당하는 index를 가진 상자 오픈.
열어야 하는 상자가 이미 열려있으면 1그룹에 배정. (모두 열리면 0점)
2그룹도 똑같이 진행해서 상자 배정.
1그룹 상자 수 x 2그룹 상자 수 의 최대값 구하기.

최대값 성립
1그룹과 2그룹의 상자 개수가 반씩 나누어 떨어질 때

로직 (그리디)
1. 시작점을 index 1 부터 끝까지 모든 경우의 수에 맞춰 상자 오픈
2. 한 게임이 종료되면 최대값과 비교해서 저장.
*/

function solution(cards) {
    cards.unshift(0)
    console.log(cards)
    
    let maxPoint = 0
    
    for (let i = 1; i < cards.length; i ++) {
        let index = i
        let visited = new Array(cards.length).fill(false)
        let group1 = 0
        let group2 = 0
        while (!visited[index]) {
            visited[index] = true
            group1 ++
            index = cards[index]
        }
        
        if (group1 === cards.length - 1) {
            continue
        }
        
        for (let j = 1; j < cards.length - 1; j ++) {
            if (!visited[j]) {
                let visited2 = [...visited]
                index = j
                while(!visited2[index]) {
                    visited2[index] = true
                    group2 ++
                    index = cards[index]
                }
            }
            maxPoint = group1 * group2 > maxPoint ? group1 * group2 : maxPoint
            group2 = 0
        }
       
        // console.log(group1, group2)
    }
        
    return maxPoint
}