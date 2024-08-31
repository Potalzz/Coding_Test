/*
데이터의 최대 개수 : 8개
속성의 최대 개수 : 20개

유일성 : 데이터 중복이 없어야 함.
최소성 : 데이터 식별을 가능케 하는 속성의 최소 개수.

속성 n개가 있을 때, n개의 속성들로 만들 수 있는 조합의 개수는 ?
(중복 허용 X, 순서 상관 X)
각 단계는 피보나치(n-(t-1))의 복잡도를 가진다.
전체 시간 복잡도는 (n^2 - tn - n) 이므로 O(n^2)
이를 통해 최대 연산 횟수를 계산해보면, n = 20일 때, 3800이다.
*/

function solution(relation) {
    const arr = []
    for (let i = 0; i < relation[0].length ; i++) {
        arr.push(i)
    }
    let candidates = getCandidates(arr)
    // candidates.sort((a,b) => a[0] - b[0])
    candidates.sort((a,b) => a.length - b.length)
    // console.log(candidates)
    candidates = checkUniqueness(relation, candidates)
    // console.log(candidates)
    candidates = checkMinimality(candidates)
    // console.log(candidates)
    
    return candidates.length
}

function getCandidates(arr) {
    const result = []
    function dfs(curr, start) {
        if (curr.length > 0) {
            result.push([...curr])
        }
        for (let i = start; i < arr.length; i ++) {
            curr.push(arr[i])
            dfs(curr, i + 1)
            curr.pop()
        }
    }
    dfs([], 0)
    return result
}

function checkUniqueness(relation, candidates) {
    const result = []
    
    for (let candidate of candidates) {
        let set = new Set()
        for (let rel of relation) {
            set.add(candidate.map((el) => rel[el]).join(','))
        }
        if (set.size === relation.length) {
            result.push(candidate)
        }
        
    }
    return result
}

function checkMinimality(candidates) {
    function checkContains(arr, subArr) {
        for (let item of subArr) {
            if (arr.includes(item) === false) {
                return false
            }
        }
        return true
    }
    let prev = 0
    let curr = 1
    while (prev < candidates.length - 1) {
        if (checkContains(candidates[curr], candidates[prev])) {
            candidates.splice(curr, 1)
        }
        else {
            curr ++
        }
        
        if (curr > candidates.length - 1) {
            prev ++
            curr = prev + 1
        }
    }
    
    return candidates
}
