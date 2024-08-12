/*
시작 지점 -> 레버 -> 출구 가장 빠른 길을 반환해라.
그래프에서 최단경로를 찾는 문제. bfs로 해결

1. 방문 여부 변수를 만들어준다.
2. bfs를 통해서 레버까지의 최단 경로를 찾고, 소요 시간, 좌표를 저장한다.
3. 레버부터 출구까지 최단 경로를 찾고, 레버까지의 소요 시간을 더해준다.
*/

function solution(maps) {
    const bfs = (x, y, goal) => {
        // 방문 여부 판별
        const visited = Array.from({length : maps.length}, () => Array(maps[0].length).fill(false))
        // 이동 방향 정의
        const dx = [0, 1, 0, -1]
        const dy = [1, 0, -1, 0]
        // 시작 지점 방문 처리
        visited[x][y] = true
        // 시작지점 queue에 삽입 
        let queue = [[x, y, 0]]
        // 다음 이동할 곳이 없을 때 까지 이동
        for (let [cx, cy, distance] of queue) {
            // 방향 별로 이동
            for (let i = 0; i < 4; i ++) {
                let nx = cx + dx[i] // 다음 x 좌표
                let ny = cy + dy[i] // 다음 y 좌표
                // 이동 가능여부 판별
                if (nx >= 0 && ny >= 0 && nx < maps.length && ny < maps[0].length &&
                    maps[nx][ny] !== "X" && !visited[nx][ny]) {
                    // 목표지점 도달 시 좌표, 거리 반환
                    if (maps[nx][ny] === goal) return [nx, ny, distance + 1]
                    
                    visited[nx][ny] = true
                    queue.push([nx, ny, distance + 1])
                }
            }
        }
        // 목표 도달하지 못했을 경우 false 반환
        return [false, false, false]
    }
    // 시작 좌표 찾기
    let startX, startY
    for (let i = 0; i < maps.length; i ++) {
        for (let j = 0; j < maps[0].length; j ++) {
            if (maps[i][j] === "S") {
                startX = i
                startY = j
            }
        }
    }
    
    const [x, y, distance] = bfs(startX, startY, "L")
    if (x === false) return -1
    const [x2, y2, distance2] = bfs(x, y, "E")
    if (x2 === false) return -1
    
    return distance + distance2
}