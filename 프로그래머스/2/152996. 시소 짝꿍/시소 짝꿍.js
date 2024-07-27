function solution(weights) {
    // 해당 값의 배수와 같은 값 찾는 함수 
    const findMatch = (weightsArray) => {
        weightsArray.forEach((weight) => {
            if (weightsMap.get(weight)) {
                count += weightsMap.get(weight)
            }
        })
        return
    }
    
    let count = 0
    // weightsMap생성
    let weightsMap = new Map()
    weights.forEach((w) => {
        weightsMap.set(w, (weightsMap.get(w) + 1) || 1)
    })
    
    // 같은 수가 n개 있으면 ((n * (n-1)) / 2)만큼 조합 가능
    for(let value of weightsMap.values()) {
        if (value > 1) count += (value * (value - 1)) / 2 // 1 : 1 비율
    }
    findMatch(weights.map(w => w * 1.5))     // 2 : 3 비율
    findMatch(weights.map(w => w * 2))       // 2 : 4 비율
    findMatch(weights.map(w => w * (4 / 3))) // 3 : 4 비율

    return count
}