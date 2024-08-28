/*
arr은 콜라츠 배열을 의미.
구간 [a,b]가 주어졌을 떄, 해당 구간은 [a, arr.length + b - 1]

1. k에 해당하는 콜라츠 배열 먼저 생성.
2. y좌표를 저장하는 배열, 구간 별 넓이를 저장해놓는 배열 총 두개 생성.
3. 구간에 따라 넓이를 result에 추가.
*/

function solution(k, ranges) {
    let result = []
    let areas = []
    let yValues = [k]
    while (k > 1) {
        k = k % 2 === 0 ? k / 2 : k * 3 + 1
        yValues.push(k)
    }
    // console.log(yValues)
    // 넓이 구해서 배열에 추가
    for (let i = 0; i < yValues.length - 1; i++) {
        let y1= yValues[i]
        let y2= yValues[i+1]
        areas.push((Math.max(y1, y2) - Math.min(y1, y2)) / 2 + Math.min(y1,y2))
    }
    // console.log(areas)
    
    for(let i = 0; i < ranges.length; i ++) {
        let a  = ranges[i][0]
        let b = yValues.length + ranges[i][1] - 1
        // console.log(a, b)
        
        if (a === b)
        {
            result.push(0)    
            continue
        }
        if (a > b)
        {
            result.push(-1)    
            continue
        }
        let area = 0
        for (let j = a; j < b; j ++) {
            area = area + areas[j]
        }
        result.push(area)
    }
    
    return result
}
