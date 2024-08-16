/*
주어진 수식을 바탕으로 연산자의 순위를 정의했을 때 절댓값기준 가장 큰 값을 구해라.

탐욕법
길이가 100이면 최대 연산자의 개수는 50개.
연산자 종류가 3개이므로 3! = 6개의 조합으로 모든 조합을 시도.
연산자의 개수 = n이라고 가정할 때,
n^2 * 6 = 2500 * 6 = 15000으로 유효시간 이내.

모든 경우의 수 시도
1. 연산자를 기준으로 문자열을 배열로 나눈다.
2. 배열을 숫자, 식으로 총 2개를 만듬. 해당 배열을 비교하면서 다른 배열에 연산 진행
3. 연산자별로 해당 연산자의 index를 저장한다.
4. while문으로 operators를 돌면서 null이 아닌 값은 숫자 배열에서 같은 index로 계산한다.

첫 번째 연산을 진행하고 저장한다.
해당 연산을 토대로 나머지 두개의 연산자로 연산을 2번 진행한다.


*/

function solution(expression) {
    let stack = []
    let nums = []
    let operators = []
    expression = expression.split("")
    for (let i = 0; i < expression.length; i ++) {
        let cur = expression[i]
        if (cur !== "*" && cur !== "+" && cur !== "-") {
            stack.push(cur)
            continue
        }
        nums.push(parseInt(stack.join("")))
        operators.push(cur)
        stack = []
    }
    nums.push(parseInt(stack.join(""))) // 마지막 값 추가
    
    const calculator = (a,b,operator) => {
        if (operator === "*") return a * b
        if (operator === "+") return a + b
        if (operator === "-") return a - b
    }
    
    const calculating = (n, o, priority) => {
        let nums = n.slice();
        let operators = o.slice();
        for (let operator of priority) {
            while (operators.includes(operator)) {
                const index = operators.indexOf(operator);
                nums[index] = calculator(nums[index], nums[index + 1], operator);
                nums.splice(index + 1, 1);
                operators.splice(index, 1);
            }
        }
        return Math.abs(nums[0]);
    }

    const orders = [
        ["*", "+", "-"], ["*", "-", "+"], 
        ["+", "*", "-"], ["+", "-", "*"], 
        ["-", "*", "+"], ["-", "+", "*"]
    ];
    
    let maxResult = 0;
    for (let order of orders) {
        const result = calculating(nums, operators, order);
        maxResult = Math.max(maxResult, result);
    }

    return maxResult;
}