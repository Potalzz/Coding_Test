/*
필요한 기능들을 정의하고, 각 기능별 함수를 만들어준다.

지울 블록을 찾는 함수
board와 동일한 크기의 map에 false로 채워주고, 터지는 블럭일 경우 true로 바꿔준다.

블록 지우고 개수 세는 함수
블록 찾는 함수에서 map을 받아오고, true로 되어있는 값을 board에서 ''로 바꿔준다.

블록 떨어뜨리는 함수
같은 행의 맨 아래부터 위로 올라가면서 비어있는 칸에 위의 값을 채워준다.

메인 게임 로직
각 기능별 함수를 실행
*/

function solution(m, n, board) {
    let boardArray = board.map((el) => el.split(""))
    
    // 지울 블럭 찾는 함수
    function findRemove() {
        let removeMap = Array.from({length : m}, () => Array(n).fill(false))        
        let found = false
        
        for(let y = 0; y < m - 1; y ++) {
            for (let x = 0; x < n - 1; x ++) {
                let cur = boardArray[y][x]
                if (cur &&
                    cur === boardArray[y][x + 1] &&
                    cur === boardArray[y + 1][x] &&
                    cur === boardArray[y + 1][x + 1]) {
                    removeMap[y][x] = removeMap[y][x + 1] = removeMap[y + 1][x] = removeMap[y + 1][x + 1] = true
                    found = true
                }
            }
        }
        return found ? removeMap : ''
    }
    
    // 블럭 지우고 지운 개수 반환 힘수
    function removeBlocks(removeMap) {
        let count = 0
        for (let y = 0; y < m; y ++) {
            for (let x = 0; x < n ; x ++) {
                if (removeMap[y][x]) {
                    boardArray[y][x] = ''
                    count ++
                }
            }
        }
        return count
    }
    
    // 블록 떨어뜨리는 함수
    function dropBlocks(gameMap) {
        for (let x = 0; x < n; x ++) {
            let emptyRow = m - 1
            for (let y = m - 1; y >= 0; y --) {
                if (gameMap[y][x] !== '') {
                    if (y !== emptyRow) {
                        gameMap[emptyRow][x] = gameMap[y][x]
                        gameMap[y][x] = ''
                    }
                    emptyRow --
                }
            }
        }
        return gameMap
    }

    let totalRemoved = 0
    // 메인 게임 로직
    while (true) {
        let removeMap = findRemove()
        if (!removeMap) break
        totalRemoved += removeBlocks(removeMap)
        dropBlocks(boardArray)
    }
    
    return totalRemoved
}