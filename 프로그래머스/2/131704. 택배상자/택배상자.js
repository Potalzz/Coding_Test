/*
박스를 컨베이어 벨트에 놓인 대로 순서를 정렬한다.
shift를 통해 박스를 빼오면 시간복잡도가 초과되므로, pop을 통해 연산
종료 조건 : priority의 길이가 0이고, 보관함에서 꺼내도 넣지 못할 때.
*/

function solution(order) {
    let priority = []
    let length = order.length
    // 맨 뒤부터 시작해서 박스가 놓인 순서대로, 해당 박스에 순서를 담아 정렬
    for (let i = 0; i < order.length; i ++) {
        priority[length - order[i]] = i+1
    }
    // 임시 보관함 생성
    let temp = []
    // 순서를 나타내는 변수
    let index = 1
    let lastBox = 0
    // 컨베이어 벨트가 빌 때 까지 박스 분류
    while (priority.length > 0) {
        let box = priority.pop()
        if (box === index) {
            index ++
            // 보조 컨베이어 벨트 마지막 박스가 해당하면 빼주기
            while (temp.length > 0) {
                if(lastBox === index) {
                    temp.pop()
                    lastBox = temp[temp.length-1]
                    index++
                } else break
            }
        }
        else {
            lastBox = box
            temp.push(box)
        }
    }
    
    return index - 1
}