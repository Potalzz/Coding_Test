/*
사전에서 해당하는 문자가 몇번 째에 위치하는지 반환하여라.

완전탐색 => DFS를 활용하여 사전을 채우고, 해당 단어의 index찾기.

roop돌릴 문자열 모음 배열 생성
빈 사전 생성.
dfs 함수 정의.
길이와 문자를 인수로 받음

종료 조건 설정
길이가 5를 달성할 시 종료

aeiou를 roop돌리면서 dfs함수 호출
dfs함수 호출될 때마다 문자열을 추가해주고, 길이 +1
*/
function solution(word) {
    const chars = ["A", "E", "I", "O", "U"]
    const dict = []
    
    function dfs(cur, len) {
        if (len > 5) return
        dict.push(cur)
        
        chars.forEach((el) => {
            dfs(cur + el, len + 1)
        })
    }
    dfs("", 0)
    
    return dict.indexOf(word)
}