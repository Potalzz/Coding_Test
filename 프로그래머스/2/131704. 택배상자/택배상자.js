/*
종료 조건 : priority의 길이가 0이고, 보관함에서 꺼내도 넣지 못할 때
*/

function solution(order) {
    let count = 0
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
    
    // 컨테이너 벨트가 빌 때 까지 박스 분류 작업
    while (priority.length > 0) {
        let box = priority.pop()
        if (box === index) {
            count ++
            index ++
            while (true) {
                if(temp[temp.length-1] === index) {
                    temp.pop()
                    count++
                    index++
                } else break
            }
        }
        else {
            temp.push(box)
        }
    }
    
    // 보조 컨테이너 벨트가 빌 때 까지 분류 작업
    while (true) {
        if (temp.pop() === index) {
            count ++
            index ++
        } else {
            break
        }
    }
    
    return count
}