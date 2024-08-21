/*
한 번 이동 시 벽이 나올 때 까지 미끄러져 움직이는 형식.
G에 도달할 수 있으면 최소횟수, 도달할 수 없으면 0 반환.

BFS로 구현
1. 방문처리할 배열 생성
2. BFS 함수 구현
2.1 R의 위치로 시작지점 설정.
2.2 queue가 빌 때 까지 이동
2.3 상하좌우 4가지 방향을 각각 이동하여, 벽 또는 D에 부딪힐 때 까지 이동.
2.4 해당 위치의 방문 여부를 판별하여 queue에 삽입.
2.5 목표 위치에 도달하면, 횟수 반환.
*/

function solution(board) {
    const visited = Array.from({length : board.length}, () => Array(board[0].length).fill(false))
    let startPoint = []
    let endPoint = []
    for (let i = 0; i < board.length; i ++) {
        for (let j = 0; j < board[0].length; j ++) {
            if (board[i][j] === "R") {
                startPoint.push(i)
                startPoint.push(j)
                startPoint.push(0)
                if (endPoint.length > 0) break
            }
            if (board[i][j] === "G") {
                endPoint.push(i)
                endPoint.push(j)
                if (startPoint.length > 0) break
                
            }
        }
    }
    
    function bfs(board) {
        let queue = []
        visited[startPoint[0]][startPoint[1]] = true
        queue.push(startPoint)
        const directions = [[0,1], [1,0], [0,-1], [-1,0]]
        
        for (let [cx, cy, distance] of queue) {
            for (let direction of directions) {
                let [nx, ny] = [cx, cy]
                let [dx,dy] = direction
                // 끝까지 이동
                while (true) {
                    nx += dx
                    ny += dy
                    if (nx < 0 || ny < 0 || nx >= board.length ||
                        ny >= board[0].length || board[nx][ny] === "D") {
                        nx -= dx
                        ny -= dy
                        break
                    }
                }
                if (nx === endPoint[0] && ny === endPoint[1]) {
                    return distance + 1
                }
                
                if (!visited[nx][ny]) {
                    visited[nx][ny] = true
                    queue.push([nx, ny, distance + 1])
                }
            }
        }
        return -1
    }
    
    return bfs(board)
}