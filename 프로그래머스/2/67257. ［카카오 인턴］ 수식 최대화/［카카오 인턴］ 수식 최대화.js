

function solution(expression) {
    let nums = expression.split(/[\+\-\*]/).map((el) => parseInt(el))
    let operators = expression.match(/[\+\-\*]/g)
    
    function calculator(a, b, operator) {
        if (operator === '*') return a * b
        if (operator === '+') return a + b
        if (operator === '-') return a - b
    }
    
    function calculating(n, o, priority) {
        let nums = n.slice()
        let operators = o.slice()
        for (let operator of priority) {
            while (operators.includes(operator)) {
                const index = operators.indexOf(operator)
                nums[index] = calculator(nums[index], nums[index + 1], operator)
                nums.splice(index+1,1)
                operators.splice(index,1)
            }
        }
        return Math.abs(nums[0])
    }
    
    let orders = [['*', '+', '-'], ['*', '-', '+'], ['+', '*', '-'],
                  ['+', '-', '*'], ['-', '*', '+'], ['-', '+', '*']]
    
    let maxNum = 0
    for (let order of orders) {
        maxNum = Math.max(maxNum, calculating(nums, operators, order))
    }
    
    return maxNum
}