/*
각 가격 별로 몇 초간 가격이 떨어지지 않았는지 반환.

비교 방법
해당 가격을 쭉 돌면서 자신보다 낮아지는 지점을 찾는다.
해당 지점까지의 거리를 answer배열에 추가한다.
모든 가격에 대해 해당 작업 반복.

스택을 통한 비교방법
prices를 돌면서 stack에 추가한다.
stack의 마지막 값이 추가할 값보다 작거나 같다면 계속 추가한다.
stack의 마지막 값이 추가할 값보다 크다면 가격이 떨어진 것이므로 pop을 하면서 answer배열에 시간을 추가한다.(시간을 알아내는 방법? stack에 추가할 때 원소 말고 index로 저장한다.)
가격이 한 번 떨어지면 stack의 마지막 값과 계속 비교하면서 또 떨어진 값이있나 찾아낸다. 
떨어진 값이 있으면 해당 값을 pop하고 시간을 추가한다.
떨어진 값이 없으면 계속해서 마지막 값과 비교하면서 값을 추가한다.

마지막에 stack에 값이 남은 index들은, 길이 - index만큼 해당 index를 추가한다.
맨 마지막 값은 0이므로 비교하지 않는다.


가격 별로 index를 stack에 저장해놓는다.
prices가 줄어드는 구간에 


[1,2,3,4,5,6,7,8,9,10]
*/
function solution(prices) {
    let result = new Array(prices.length).fill(0)
    let stack = [0]
    let idx = 0
    for(let i = 1; i < prices.length-1; i++) {
        while (stack.length > 0 && prices[stack[stack.length-1]] > prices[i]) {
            idx = stack.pop()
            result[idx] = i - idx
        }
        stack.push(i)
    }
    stack.forEach((el) => {
        result[el] = prices.length - el-1
    })
    return result;
}