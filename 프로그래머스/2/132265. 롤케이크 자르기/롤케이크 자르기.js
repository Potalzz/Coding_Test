/*
토핑 종류 수를 반으로 나누는 방법의 수를 반환

종류 수가 홀수이면 0 반환
빼는 건 map 객체에서
추가 하는 건 Set 객체에서
값을 추가하는 건 Set이 좋고, 값을 하나 씩 빼면서 확인하는 건 Map이 좋다.
*/
function solution(topping) {
    let count = 0
    const typeMap = new Map()
    const typeSet = new Set()
    
    topping.forEach((el) => typeMap.set(el, (typeMap.get(el) + 1 || 1)))
    let various = typeMap.size
    
    topping.forEach((el) => {
        typeSet.add(el)
        typeMap.set(el, (typeMap.get(el) -1))
        
        if (typeMap.get(el) === 0) various --
        
        if (typeSet.size >= various / 2) {
            if (typeSet.size === various) count ++
        }
        
    })    
    return count;
}
