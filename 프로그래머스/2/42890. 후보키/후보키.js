/*
column의 길이로 생성할 수 있는 조합을 모두 만들고, 유일성과 최소성을 체크하며 조합을 걸러낸다.
유일성과 최소성을 체크하는 함수를 구현하고, 해당 함수를 통해 필터링 하기.

설계 과정
크게 조합 생성, 유일성 체크, 최소성 체크 세 단계로 나누어 정답을 도출해낼 계획이다.
1. 조합 생성
    1.1 column에 따른 분류의 이름을 각각의 index에 맞춰 숫자로 치환한다.
    1.2 해당 index의 조합으로 만들 수 있는 조합 모두 생성하기.
    
2. 유일성 체크
    2.1 1의 과정에서 만들어진 조합으로, 

*/

function solution(relation) {
    const arr = []
    for (let i = 0; i < relation[0].length; i ++) {
        arr.push(i)
    }
    let combinations = makeCombination(arr)
    combinations.sort((a,b) => a.length - b.length)
    // console.log(combinations)
    combinations = uniqueness(combinations, relation)
    // console.log(combinations)
    combinations = minimality(combinations)
    // console.log(combinations)
        
    return combinations.length
}

// 중복 X 순서 상관 X
function makeCombination(arr) {
    const result = []
    function dfs(start, curr) {
        if (curr.length) {
            result.push(curr.slice())
        }
        
        for (let i = start; i < arr.length; i ++) {
            curr.push(arr[i])
            dfs(i + 1, curr)
            curr.pop()
        }
    }
    dfs(0, [])
    
    return result
}

function uniqueness(combinations, relation) {
    const result = []
    for (let comb of combinations) {
        let set = new Set()
        for (let rel of relation) {
            let w = ''
            for (let c of comb) {
                w += rel[c]
            }
            set.add(w)  
        }
        if (set.size === relation.length) {
            result.push(comb)
        }
    }
    return result
}

function minimality(combinations) {
    function checkContain(arr, subArr) {
        for (let el of subArr) {
            if (!arr.includes(el)) {
                return false
            }
        }
        return true
    }
    let prev = 0
    let curr = 1
    while (prev < combinations.length - 1) {
        if (checkContain(combinations[curr], combinations[prev])) {
            combinations.splice(curr, 1)
        }
        else {
            curr ++
        }
        if (curr >= combinations.length) {
            prev ++
            curr = prev + 1
        }
    }
    
    return combinations
}