/*
개수는맞지만 짝이 맞지 않은 대괄호  "()"를 짝이 맞게 반환해라.

변환 과정
1. 개수에 맞게 A와 B로 2등분 한다.
2. A가 올바른 괄호라면 B가 올바론 괄호가 될 때 까지 1단계를 재귀적으로 적용한다.
    2-1. B가 올바른 괄호가 되면, A와 B를 이어붙인 후 반환한다.
3. A가 올바론 괄호가 아니라면, B에 2단계를 적용하여 올바른 괄호를 만들고, "()"사이에 넣는다.
    3-1. A의 첫 번째, 마지막 문자를 제거하고 나머지 문자열의 괄호 방향을 뒤집어서 4단계 결과 뒤에 붙여 반환한다.
*/

function solution(p) {
    return problemSolve(p)
}

function isCorrect(w) {
    let count = 0
    for (let i = 0; i < w.length; i ++) {
        w[i] === '(' ? count -- : count ++
        if (count >= 1) return false
    }
    return true
}

function problemSolve(w) {
    // 1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다.
    if (w.length === 0) {
        return ""
    }
    // 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다.
    //단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다. 
    let u = ""
    let v = ""
    let count = 0
    for (let i = 0; i < w.length; i ++) {
        u += w[i]
        w[i] === '(' ? count -- : count ++
        if (count === 0) {
            v = w.slice(i + 1)
            break
        }
    }
    
    // 3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다. 
    // 3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다.
    if (isCorrect(u)) {
        return u + problemSolve(v)
    }
    
    // 4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다.
    // 4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다. 
    // 4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다. 
    // 4-3. ')'를 다시 붙입니다
    // 4-5. 생성된 문자열을 반환합니다.
    return '(' + problemSolve(v) + ')' + transformU(u)
}

// 4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다.
function transformU (u) {
    u = u.split("").slice(1)
    u.pop()
    
    if (u.length === 0) return ''
    for (let i = 0 ; i < u.length; i ++) {
        u[i] = u[i] === '(' ? ')' : '('
    }
    return u.join("")
}