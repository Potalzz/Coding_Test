/*
다리의 길이를 1당 1칸이라고 생각하고, 1칸 이동하는데 1초가 소요된다.
트럭을 올릴 다리를 queue구조로 구성.
트럭의 무게, 탈출까지 남은 시간을 배열로 담아준다.
트럭을 올림과 동시에 현재 무게를 나타내는 변수 currWeight변수를 업데이트 해준다.
트럭을 더 올릴 수 있을 경우, 트럭을 계속 올림과 동시에 대기시간을 1씩 빼준다.
대기시간이 0이 되면 트럭은 탈출한다.

트럭은 한 대씩 순차적으로 올라가므로, 남아있는 시간이 동일할 수는 없다.
*/

function solution(bridge_length, weight, truck_weights) {
    // 총 소요 시간
    let time = 0 
    // 트럭을 담을 스택
    let stack = []
    // 현재 올라와있는 트럭들의 무게를 나타내는 변수
    let currWeight = 0

    while (truck_weights.length > 0) {
        let leftTime = 0
        
        // [무게,남은 시간]으로 트럭을 계속 담아주면서 1초씩 +
        while (weight >= currWeight + truck_weights[0] && bridge_length > stack.length) {
            //  stack에 트럭이 이미 올라와 있으면 남은 시간 1초 빼주기
            if (stack.length > 0) {
                stack.map((el) => el[1] -= 1)
                // 남은시간 0이 되면 탈출
                if(stack[0][1] <= 0) {
                    currWeight -= stack[0][0]
                    stack.shift()
                }
            }
            time += 1
            currWeight += truck_weights[0]
            stack.push([truck_weights.shift(),bridge_length])
            // console.log("트럭 올리는 부분",stack,time,currWeight)
        }
        // 트럭을 더 올릴 수 없으면, 맨 앞차가 빠져나갈 때 까지의 시간을 모두 빼줌.
        leftTime = stack[0][1]
        stack.map((el) => {
            el[1] -= leftTime
        })
        currWeight -= stack[0][0]
        stack.shift()
        if (truck_weights.length > 0 && weight >= currWeight + truck_weights[0] && bridge_length > stack.length) {
            currWeight += truck_weights[0]
            stack.push([truck_weights.shift(), bridge_length])
        }
        
        time += leftTime
        // console.log("트럭 올린 뒤",stack,time)
    } // while문 종료
    
    // console.log("남은 트럭 보내기", stack, time)
    if(stack.length > 0) time += stack[stack.length-1][1]
    
  
    return time;
}
