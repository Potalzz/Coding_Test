/*
n x m 보드의 지워지는 블록 총 개수 반환
최대 30 x 30

블록을 오른쪽으로 90도 회전한 모양으로 바꿔 배열로 만든다.
(블록이 터지면서 위에 있는 블록이 아래로 내려오는 성질과 배열의 성질이 일치하기 때문)

블록 확인
한 행씩 순회하면서 같은거 2개 연속이면 다음 행으로 가서 확인.
모든 칸을 다 돌 때 까지 정보 기억하고 있음.
맞는 경우 false로 바꿔줌

블록 터뜨리는 로직
filter로 false가 아닌 값들로만 재구성
*/
function solution(m, n, board) {
    let newBoard = Array.from({length : n}, () => Array(m).fill(false))
    let index = m  - 1
    // array와 동일한 성질이 되도록 요소 재배치
    for(let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            newBoard[x][y] = board[index][x]
        }
        index --
    }
    
    let count = 0
    // 블록게임 작동 로직
    while (true) {
        let temp = []
        // 터뜨릴 블록 찾기
        for(let x = 0; x < newBoard.length -1; x ++) {
            for(let y = 0; y < newBoard[x].length -1; y ++) {
                let curr = newBoard[x][y]
                if (newBoard[x][y+1] === curr &&
                    newBoard[x+1][y] === curr &&
                    newBoard[x+1][y+1] === curr) {
                    temp.push([x,y])
                }
            }
        }
        if(temp.length === 0) break
        
        // 터뜨릴 블록들 false로 값 바꾸기
        
        temp.forEach(([x,y]) => {
            if(newBoard[x][y]) {
                newBoard[x].splice(y, 1, false)
                count ++
            }
            if(newBoard[x][y+1]) {
                newBoard[x].splice(y+1, 1, false)
                count ++
            }
            if(newBoard[x+1][y]) {
                newBoard[x+1].splice(y, 1, false)
                count ++
            }
            if(newBoard[x+1][y+1]) {
                newBoard[x+1].splice(y+1, 1, false)
                count ++
            }
        })
        
        // 블록 삭제함으로써 위 블록이 아래로 자동으로 내려오도록, 개수 카운팅
        for(let i = 0; i < newBoard.length; i ++) {
            newBoard[i] = newBoard[i].filter((el) => el !== false)
        }
    }
    
    
    return count;
}