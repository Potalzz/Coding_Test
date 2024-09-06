/*
전체 n * n 크기의 공간을 만들지 않아도 된다.
어차피 row를 통해 방문하므로 row의 방문을 체크하지 않아도 된다.
column 방문은 공통되므로 배열의 크기는 column개수 만큼만.

로직 (재귀)
1. row를 하나씩 증가시키면서, 놓을 수 있는 곳에 Q를 놓는다.
2. Q를 놓으면, column방문 처리 배열에 column에 해당하는 index에 row를 저장한다.
3. row + 1을 전달받아 다음 열로 넘어가 재귀를 시작한다.
4. 해당 재귀가 끝나면 다시 해당 column의 방문을 취소처리하고 위의 과정을 반복한다.
5. 맨 마지막 열까지 도달할 경우 result += 1을 해준다.

Q를 놓을 수 있는지 판별
세로줄
- 해당 column이 방문하지 않은 상태일 경우

가로줄
- row를 증가시키며 확인하므로 겹칠 일 X

대각선
- column 방문 처리 배열에 각 column에 놓여져 있는 Queen의 row를 저장함으로써, 해당 row와 현재 확인하는 row의 차이만큼 column을 더하고, 빼고 두 가지 경우를 통해 양쪽 대각선을 확인한다.
EX) 이미 놓여진 Queen의 row,와 column이 (2,3)에 놓여져 있고, 현재 확인하는 칸이 (5, 6)일 경우
3 - (5 - 2) = 0 (좌쪽 대각선)
3 + (5 - 2) = 6 (우측 대각선)
현재 확인하는 column이 6이므로 해당 칸은 Queen을 놓을 수 없다.

후기
0에 false로 작용되는 사실을 캐치하지 못하여 계속 틀린 답이 나왔다.
또한 재귀를 싱글스레드처럼 하나의 작업이 실행되다 재귀가 호출되면 해당 재귀로 들어가 작업을 시작하는..
이런 일련의 과정을 머릿속에 그려보니 재귀를 이해하는데 도움이 괴었다.
*/


function solution(n) {
    
    return checkQueen(n)
}

function checkQueen(n) {
    const colVisited = new Array(n).fill(false)
    let result = 0
    function dfs(row) {
        if (row === n) {
            result += 1    
            return
        }
        
        for (let col = 0; col < n; col ++) {
            if (typeof colVisited[col] !== 'number') {
                let check = true
                for (let c = 0; c < n; c ++) {
                    let r = colVisited[c]
                    if (typeof r === "number") {
                    if (c + (row - r) === col ||
                        c - (row - r) === col) {
                            check = false
                            break
                        }
                    }
                }
                
                if (check) {
                    colVisited[col] = row
                    dfs(row + 1)
                    colVisited[col] = false
                }
            }
        }
    }
    dfs(0)
    
    return result
}
