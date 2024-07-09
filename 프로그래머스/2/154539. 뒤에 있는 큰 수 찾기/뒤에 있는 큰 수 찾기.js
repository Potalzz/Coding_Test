/*
자신보다 뒤에 있으면서 큰 수를 반환해라. 큰 수가 없으면 -1 리턴.

투 포인터로 해결 ? => 시간초과

스택을 활용한 풀이
numbers배열을 순회하면서 이전 값들을 index형태로 stack에 저장해둔다.
다음 값인 numbers(i)의 값이 스택에 있는 값보다 큰 경우 해당 원소의 위치에 numbers(i)값을 넣어주는 과정을 while문을 통해 stack이 빌 때 까지 반복한다.
numbers 배열을 전부 순환할 때 까지 더 큰 값이 나오지 않은 값들은, 인덱스 상태로 stack에 머무르게 된다.
result에 디폴트값으로 -1을 넣어놨기 때문에 stack에서 빠져나가지(뒷 큰수가 없는 값) 않은 값들은 -1을 가진다.
원소로 저장하지 않고 인덱스로 저장하는 이유 => 원소로 저장하게 되면 스택의 값과 numbers[i]의 값의 순서 비교가 불가하다.
*/
function solution(numbers) {
    const result = new Array(numbers.length).fill(-1)
    let stack = []
    for (let i = 0; i < numbers.length; i ++) {
        while (stack.length > 0 && numbers[stack[stack.length - 1]] < numbers[i] ) {
            result[stack.pop()] = numbers[i]
        }
        stack.push(i)
    }
    
    return result
}