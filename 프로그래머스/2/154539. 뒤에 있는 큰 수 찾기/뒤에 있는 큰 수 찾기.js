/*
자신보다 뒤에 있으면서 큰 수를 반환해라. 큰 수가 없으면 -1 리턴.

투 포인터로 해결 ? => 시간초과
전체 원소 개수를 카운팅하여 사전에 등록.
해당 수보다 큰 수 반환하고 그 수 개수 한개 빼주면 된다.

이분탐색 ?
큰 수가 있는지 확인하고
*/
function solution(numbers) {
    let result = Array(numbers.length).fill(-1)
    let stack = []
    for (let i = 0; i < numbers.length; i++) {
        while (stack.length > 0 && numbers[stack[stack.length-1]] < numbers[i]) {
            result[stack.pop()] = numbers[i]
        }
        stack.push(i)
        
    }
    
    return result
}