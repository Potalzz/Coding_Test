/*
가장 큰 정사각형의 넓이 찾기
칸의 최대 개수 = 100만이므로
o(n log n)밑으로 풀어야 함.
*/
function solution(board) {
    let maxNum = 0
    for (let i = 0; i < board.length - 1; i ++) {
        for (let j = 0; j < board[0].length - 1; j ++) {
            if (board[i][j] > 0 && board[i][j+1] > 0 &&
                board[i+1][j] > 0 && board[i+1][j+1] > 0) {
                board[i+1][j+1] = Math.min(board[i][j], board[i][j+1], board[i+1][j]) + 1
                maxNum = Math.max(maxNum, board[i+1][j+1])
            }
        }
    }
    if (maxNum === 0) {
        for(let i = 0; i < board.length; i ++) {
            for (let j = 0; j < board[0].length; j ++) {
                if (board[i][j] === 1) return 1
            }
        }    
    }
    
    return maxNum * maxNum
}