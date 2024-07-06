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
        index ++
     
        char += words.pop()
           
        if (dict.has(char)) {
            while (words.length > 0) {
                char += words.pop()
                if (!dict.has(char)) break
            }
            
        }
        if (words.length == 0) {
            break
        }
        dict.set(char, index)
        answer.push(dict.get(char.slice(0,-1)))
        char = char[char.length-1]
    }
    
    if (dict.get(char)) {
        answer.push(dict.get(char))    
    } else {
        answer.push(dict.get(char.slice(0,-1)))
        answer.push(dict.get(char[char.length-1]))
    }
    
    return answer;
}