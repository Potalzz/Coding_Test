/*
손님들의 주문에서 단품 메뉴의 조합을 통해 course에 있는 메뉴 개수로 조합 가능한 코스 요리들을 반환하라.
오름차순 반환. 내부 알파벳도 오름차순으로.

각 문자열마다 모든 조합을 기록한다.
course에 있는 숫자들을 순회하면서 해당하는 조합들을 모두 answer에 넣는다.

메뉴 조합 기록 로직
알파벳 사전 순으로 정렬되어 있으므로, "CA"처럼 뒤집어진 경우 고려할 필요 X 
완전탐색으로 모든 조합 사전에 기록.


백트래킹
객체 생성
조합만들기 생성

*/

function solution(orders, course) {
    const ordered = {}
    const candidates = {}
    const maxOrderCount = Array(11).fill(0)
    
    const getCourseMenu = (order, start, len, foods) => {
        if (len === 0) {
            ordered[foods] = (ordered[foods] + 1) || 1
            if (ordered[foods] > 1) {
                candidates[foods] = ordered[foods]
                maxOrderCount[foods.length] = Math.max(maxOrderCount[foods.length], ordered[foods])
            }
            return
        }
        for (start; start < order.length; start ++) {
            getCourseMenu(order, start + 1, len - 1, foods + order[start])
        }
        
    }
    
    orders.forEach(order => {
        const sortedOrder = order.split("").sort()
        course.forEach((len) => {
            getCourseMenu(sortedOrder, 0, len, "")
        })
    })
    const launched = Object.keys(candidates).filter((food) => {
        if (maxOrderCount[food.length] === candidates[food]) return food
        
    })
    
    return launched.sort()
}