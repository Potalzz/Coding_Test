/*
+ n, * 2, * 3
세 가지 연산을 사용해서 x를 y로 만드는 최소 연산 횟수 반환.
불가능하면 -1 반환

완전탐색 DFS
*2, *3, +n 3가지 경우의 수로 진행
인수로 넣을 값
(총합, 연산 횟수)
초기 값 (x, 0)
종료 지점 합계가 n보다 같거나 클 때
*/

function solution(x, y, n) {
    function calc(num, i) {
        switch(i) {
            case 1 :
                return num - n
            case 2 :
                if(num % 2 === 0) return num / 2
                else return 0
            case 3 :
                if (num % 3 === 0) return num / 3
                else return 0
        }
    }
    
    function bfs() {
        let queue = [[y,0]]
        const visit = {}
        visit[y] = 1
        while (queue.length) {
            let [curValue, count] = queue.shift()
            if(curValue === x) return count
            for(let i = 1; i <= 3; i ++) {
                let nextValue = calc(curValue, i)
                if(nextValue >= x && visit[nextValue] !== 1) {
                    visit[nextValue] = 1
                    queue.push([nextValue, count+1])
                }
            }
            
        }
        return -1
    }
    
    
    return bfs()
}