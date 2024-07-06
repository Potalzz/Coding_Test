/*
사전에서 해당하는 문자가 몇번 째에 위치하는지 반환하여라.

완전탐색 => DFS를 활용하여 해당 문자가 나오면 종료되게끔 설계.

길이가 5미만일 경우 A를 채워줌.
5x5 크기의 알파벳 Map을 만들어준다.
2중 for문으로 Map을 순환한다.
word의 길이에 따라 얼마나 반복할건지 결정.



*/
function solution(target) {
    const chars = ["A", "E", "I", "O", "U"]
    
    const dic = []
    
    function dfs(cur, len) {
        if (len > 5) {
            return
        }
        
        dic.push(cur)
        
        for (let i = 0; i < 5; i++) {
            dfs(cur + chars[i], len + 1)
        }
    }
    
    dfs("", 0)
    
    return dic.indexOf(target)
}