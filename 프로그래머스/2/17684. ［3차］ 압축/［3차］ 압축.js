/*
문자를 하나씩 순회하면서 사전에 있으면, 사전에 없을 때 까지 다음 문자를 포함시킨다.
사전에 포함되지 않은 문자가 나오면, 사전에 포함된 문자까지 포함된 문자의 번호를 출력하고,
포함되지 않은 문자까지 사전에 추가한다. 문자가 끝날 때 까지 해당 작업을 반복.
*/
function solution(msg) {
    let answer = [];
    
    // 사전 정의
    const dict = new Map()
    // A ~ Z 사전에 추가
    for (let i = 65; i <= 90; i ++) {
        dict.set(String.fromCharCode(i), i - 64)
    }
    let index = 26
    
    let words = msg.split("").reverse()
    let char = words.pop()
    
    while (words.length > 0) {
        index ++ // 새로 추가할 사전 번호 업데이트
        char += words.pop() // 비교할 문자 추가
           
        // 사전에 포함된 문자일경우, 포함되지 않은 문자가 나올 때 까지 char 업데이트
        if (dict.has(char)) {
            while (words.length > 0) {
                char += words.pop()
                if (!dict.has(char)) break
            }
        }
        
        
        if (words.length == 0) break // char 업데이트를 끝내고, 남아있는 문자가 없으면 종료
        
        dict.set(char, index) // 사전에 문자 새로 추가
        answer.push(dict.get(char.slice(0,-1))) // 마지막 문자 제외하고 사전에서 번호 추가
        char = char[char.length-1] // char에 마지막 문자만 남겨두기
    }

    // while문 종료 후 남아있는 문자 처리 로직
    if (dict.get(char)) {
        answer.push(dict.get(char))    
    } else {
        answer.push(dict.get(char.slice(0,-1)))
        answer.push(dict.get(char[char.length-1]))
    }
    
    return answer;
}