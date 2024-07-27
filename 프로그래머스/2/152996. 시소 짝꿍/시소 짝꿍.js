/*
몸무게 x (1, 1.5, 2) 중 하나를 곱한 값이 같은 쌍을 반환하라.

같은 값 제거 -> set으로 변환해서 길이 변화 체크.
1.5배 또는 2배 제거 x = 4/3
경우의 수
모든 값에 1.5씩 곱해줌. 중복제거
1.5씩 곱한 값에 4/3씩 곱해줌. 중복제거
원상태로 돌리고 모든 값에 2씩 곱해줌. 중복제거

중복제거 로직
stk배열을 생성
weights배열을 copyWeights에 할당한다.
weights의 마지막 값을 pop하여 변수 weight에 할당.
copyWeights의 길이가 1이상이라면 마지막 값이 weight값과 같을 경우 CopyWeights를 pop해준다.
다를 경우, weight값을 copyWeights에 넣어준다.
해당 과정을 함수로 만들어서 사용.

같은 수 찾는 방법
weights배열과 같은 set을 만든다.
weights배열을 순회하면서 1.5씩 곱해서 set에 push한다.
set의 사이즈가 
*/

function solution(weights) {
    // 깊은 복사 함수
    const deepCopy = (arr) => {
        return JSON.parse(JSON.stringify(arr))
    }
    
    // 중복 제거 함수
    const removeDuplicates = (arr) => {
        let weightsArray = deepCopy(arr)
        let stck = []
        let count = 0
        
        while (weightsArray.length > 0) {
            let weight = weightsArray.pop()
            if (stck.length > 0 && stck[stck.length-1] === weight) {
                stck.pop()
                count ++
            }
            else {
                stck.push(weight)
            }
        }
        
        return count
    }

    // 해당 값의 배수와 같은 값 찾는 함수 
    const findMatch = (weightsArray, weightsMap) => {
        let count = 0
        
        for(let i = 0; i < weightsArray.length; i ++) {
            let value = weightsArray[i]
            if (weightsMap.get(value)) {
                count += weightsMap.get(value)
                // console.log(value)
            }
        }
        return count
    }

    let result = 0
    let weightsMap = new Map()
    
    // map생성
    weights.forEach((w) => {
        weightsMap.set(w, (weightsMap.get(w) + 1) || 1)
    })
    
    // 같은 값 짝꿍 만들어주기
    for(let value of weightsMap.values()) {
        if (value > 1) {
            value --
            if (value === 1) result += 1
            else if (value % 2 === 0) {
                result += (value + 1) * (value / 2)
            }
            else {
                result += (value + 2) * ((value + 1) / 2) - (value + 1)
            }
        }
    }
    // console.log(weightsMap)
    
    // 같은 수가 n개 있으면 !(n-1)만큼 조합 가능.
    
    result += findMatch(weights.map(el => el * (4 / 3)), weightsMap)
    result += findMatch(weights.map(el => el * 2), weightsMap)
    result += findMatch(weights.map(el => el * 1.5), weightsMap)

    return result
}