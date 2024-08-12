/*
2명 이상이 주문한 조합을 목록에 포함하여 반환.
조합을 만들고 싶은 요리의 개수가 course에 담겨있고, 가장 많이 주문 된 조합을 추가한다. (동률이면 모두 추가)

1. 각 주문마다 만들 수 있는 조합을 모두 만들고, 객체에 추가한다.
2. 객체를 순회하면서 corse의 길이만큼, 개수가 높은 조합을 result에 추가한다.

조합 만들기
1. 모든 길이를 만들 필요 없고 필요한 길이의 단어들만 만들어준다.
2. (주문, 시작 지점, 길이, 단어)를 인자로 받아서 해당 길이를 충족하면 조합에 추가한다.
3. 해당 코스의 주문 수가 2를 넘으면 후보에 등록시켜주고, 해당 길이 최대 갯수를 업데이트 해준다.
4. 코스 후보에서 각 길이별 최대 개수의 메뉴를 정렬하여 결과에 추가한다.
5. 결과에 있는 코스들을 오름차순으로 정렬해준다.
*/

function solution(orders, course) {
    const courseMap = new Map()
    const candidates = new Map()
    const maxCount = new Array(11).fill(0)
    
    const makeComb = (order, start, len, menu) => {
        if (len === 0) {
            courseMap.set(menu, (courseMap.get(menu) + 1) || 1)
            if (courseMap.get(menu) > 1) {
                candidates.set(menu, courseMap.get(menu))
                maxCount[menu.length] = Math.max(maxCount[menu.length], candidates.get(menu))
            }
            return
        }
        
        for (let i = start; i < order.length; i ++) {
            makeComb(order, i + 1, len - 1, menu + order[i])
        }
    }
    
    for (let order of orders) {
        order = order.split("").sort().join("")
        for (let len of course) {
            makeComb(order, 0, len, "")    
        }
    }
    let result = []
    for (let len of course) {
        let max = maxCount[len]
        for (let comb of candidates.keys()) {
            if (comb.length === len) {
                if (candidates.get(comb) === max) {
                    result.push(comb)
                }
                candidates.delete(comb)
            }
        }
    }
    
    return result.sort()    
}