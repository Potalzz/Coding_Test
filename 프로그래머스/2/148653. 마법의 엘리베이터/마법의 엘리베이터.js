/*
10의 제곱들로 이루어진 버튼을 눌러서 0층으로 가는 최소 횟수.

현재 층에서 가장 가까운 10의 제곱의 배수인 층인 goal으로 이동.
goal으로 이동하기 위해, 끝자리 수를 계속해서 0으로 만들어야 한다.
0으로 만드는 최소한의 횟수로 0으로 만들고, 해당 수가 5일 경우만 앞자리를 보고 판단.
앞자리가 5미만이면 -를 5이상이면 +를 해준다.

맨 앞자리를 제외한 뒤자릿수의 수가 0이 될 경우 맨 앞자리 수만큼 이동하고 정답 반환.



*/

function solution(storey) {
    let count = 0;
    // 배열로 변환
    storey = storey.toString().split("").map(el => parseInt(el))
    
    // 메인 로직
    for (let i = storey.length - 1; i > 0; i --) {
        let currValue = storey[i]
        if (currValue === 0) continue
        // 5일 경우
        if (currValue === 5) {
            if (storey[i-1] >= 5) {
                if (storey[i-1] === 9) {
                    isNine(storey, i)
                }
                else {
                    storey[i-1] ++    
                }
                count += (10 - currValue)
            }
            else {
                count += currValue    
            }
        }
        // 5보다 클 경우
        else if (currValue > 5) {
            if (storey[i-1] === 9) {
                isNine(storey, i)    
            }
            else {
                storey[i-1] ++
            }
            count += (10 - currValue)
        }
        // 5보다 작을 경우
        else {
            count += currValue
        }
    }
    
    
    // 맨 앞자리 수 더해줌
    let firstValue = storey[0]
    if (firstValue > 5) {
        count += (10 - firstValue) + 1
    }
    else {
        count += firstValue
    }
        
    return count
}

// 9일 경우 앞자리 수를 올려주는 함수
function isNine(arr, i) {
    let idx = 1            
    while ((i - idx) > 0 && arr[i-idx] === 9) {
        arr[i - idx] = 0
        idx ++
    }
    if (i === idx) {
        arr[0] ++
    } else {
        arr[i- (idx+1) ] ++
        
    }
    return
}

