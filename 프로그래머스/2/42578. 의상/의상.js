/*
위상 정렬

*/


function solution(clothes) {
    let quantity = clothes.length
    let clothMap = new Map()
    for (let [cloth, body] of clothes) {
        clothMap.set(body, clothMap.get(body) + 1 || 2)
    }
    if ([...clothMap.keys()].length === 1) return clothes.length
    let nums = [...clothMap.values()]
    let result = clothes.length
    let num = 1
    for (let n of nums) {
        num *= n
    }
  
    
    return num - 1
}

