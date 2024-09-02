/*
if 종료 시간이 다음 과제 시작 시간보다 이르면, result에 추가.
else 다음 과제 시작 시간까지 진행시간 줄이고, stack에 추가.

새로운 과제 종료 후, 다음 과제 시작 시간까지 stack의 마지막 과제를 진행하고, 과제가 완료되면 pop한 뒤에 stack의 다음 과제 진행.

로직
1. plans 데이터를 시작시간이 빠른 순으로 정렬한다.
2. 시간 계산 함수를 만들어준다.
3. 시작 시간별로 과제를 실행하면서, 시간 계산 함수를 통해서 종료시간 비교하며 진행.

다음 과제 시작 시간까지 여유 시간을 계산해서, 해당 시간만큼 과제에 분배.
*/

function solution(plans) {
    const result = []
    // 문자열 시간 숫자로 변경하고 시작 시간 순으로 정렬.
    for (let i = 0; i < plans.length; i ++) {
        plans[i][1] = plans[i][1].slice(0,2) + plans[i][1].slice(3)
        plans[i][2] = parseInt(plans[i][2])
    }
    plans.sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
    
    // console.log(plans)
    
    const stack = []
    for (let i = 0; i < plans.length; i ++) {
        let [curPlan, curStart, curSpend] = plans[i]
        if (i === plans.length - 1) {
            result.push(curPlan)
            break
        }
        let remainTime = timeDiff(curStart, plans[i + 1][1])
        // console.log(curPlan, '에서 남은시간', remainTime)
        if (remainTime >= curSpend) {
            remainTime -= curSpend
            result.push(curPlan)
            while (remainTime > 0 && stack.length > 0) {
                [curPlan, curStart, curSpend] = stack.pop()
                if (remainTime >= curSpend) {
                    remainTime -= curSpend
                    result.push(curPlan)
                }
                else {
                    curSpend -= remainTime
                    remainTime = 0
                    stack.push([curPlan, curStart, curSpend])
                }
            }
        }
        else {
            curSpend -= remainTime
            remainTime = 0
            stack.push([curPlan, curStart, curSpend])
        }
        // console.log(curPlan, '끝날 때 남은시간', remainTime)
        // console.log('스택', stack)
        // console.log('결과', result)
    }
    
    // plans배열 다 돌고 남아있는 과제들 차례대로 추가
    while (stack.length > 0) {
        result.push(stack.pop()[0])
    }
    
    return result
}


function timeDiff(curr, next) {
    let hour = Number(next.slice(0,2)) - Number(curr.slice(0,2))
    let currM = Number(curr.slice(2))
    let nextM = Number(next.slice(2))
    let minute = 0
    if (currM > nextM) {
        hour --
        minute = (60 - currM) + nextM
    }
    else {
        minute = nextM - currM
    }
    
    return (hour * 60) + minute
}
