/*
실수 경우의 수

순서 헷갈리는 경우
1. X가 O보다 많을 때
2. O가 X보다 2개 이상 많을 때

둘다 승리하는 경우
1. 불가능

게임이 종료되었는데 진행하는 경우
1. X가 승리
1.1 X가 승리조건을 달성하고, O의 개수가 X보다 많을 때

2. O가 승리
2.2 O가 승리 조건을 달성하고, X의 개수와 O와 같거나 많을 때



*/

function solution(board) {
    const winO = checkWinning(board, 'O')
    const winX = checkWinning(board, 'X')
    const countO = countStone(board, 'O')
    const countX = countStone(board, 'X')
    // console.log(winO, winX, countO, countX)
    // 1. 순서 헷갈리는 경우
    if (countX > countO || countO >= countX + 2) {
        return 0
    }
    
    // 2. 둘다 승리
    if (winO && winX) {
        return 0
    }
    
    // 3. 게임이 종료되었는데 진행하는 경우
    // O가 승리
    if (winO && countX >= countO) {
        return 0
    }
    
    // X가 승리
    if (winX && countO > countX) {
        return 0
    }
    
    return 1
}

function checkWinning(board, p) {
    // 대각선 승리 판독
    if (board[0][0] === p && board[1][1] === p && board[2][2] === p) {
        return true
    }
    if (board[0][2] === p && board[1][1] === p && board[2][0] === p) {
        return true
    }
    
    let line = p + p + p
    for (let i = 0; i < 3; i ++) {
        // 가로줄 승리 판독
        if (board[i] === line) {
            return true
        }
        
        // 세로줄 승리 판독
        if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
            return true
        }
    }
    return false
}

function countStone(board, p) {
    let count = 0
    for (let i = 0; i < 3; i ++) {
        for (let j = 0; j < 3; j ++) {
            if (board[i][j] === p) {
                count ++
            }
        }
    }
    
    return count    
}