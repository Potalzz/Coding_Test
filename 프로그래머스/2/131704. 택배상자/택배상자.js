/*
박스를 컨베이어 벨트에 놓인 대로 순서를 정렬한다.
shift를 통해 박스를 빼오면 시간복잡도가 초과되므로, pop을 통해 연산
종료 조건 : priority의 길이가 0이고, 보관함에서 꺼내도 넣지 못할 때.
*/

function solution(order) {
    const stack = [];
    let currentBox = 1;
    let index = 0;
    const n = order.length;

    for (let i = 0; i < n; i++) {
        const targetBox = order[i];

        while (currentBox <= targetBox) {
            stack.push(currentBox++);
        }

        if (stack[stack.length - 1] === targetBox) {
            stack.pop();
            index++;
        } else {
            break;
        }
    }

    return index;
}