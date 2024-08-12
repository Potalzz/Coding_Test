/*
시작 지점 -> 레버 -> 출구 가장 빠른 길을 반환해라.
그래프에서 최단경로를 찾는 문제. bfs로 해결

1. 방문 여부 변수를 만들어준다.
2. bfs를 통해서 레버까지의 최단 경로를 찾고, 소요 시간, 좌표를 저장한다.
3. 레버부터 출구까지 최단 경로를 찾고, 레버까지의 소요 시간을 더해준다.
*/
function solution(maps) {
    const bfs = (start, goal) => {
        const [x, y] = start
        const visited = Array.from({length : maps.length}, () => Array(maps[0].length).fill(false))
        const dx = [0, 1, 0, -1]
        const dy = [1, 0, -1, 0]
        visited[x][y] = true
        let queue = [[x, y, 0]]
        
        // 이동할 곳이 없을 때 까지 이동
        for (let [cx, cy, distance] of queue) {
            for (let i = 0; i < 4; i ++) {
                let nx = cx + dx[i] 
                let ny = cy + dy[i] 
                // 이동 가능여부 판별
                if (nx >= 0 && ny >= 0 && nx < maps.length && ny < maps[0].length &&
                    maps[nx][ny] !== "X" && !visited[nx][ny]) {
                    // 목표지점 도달 시 좌표, 거리 반환
                    if (maps[nx][ny] === goal) return distance + 1 
                    visited[nx][ny] = true
                    queue.push([nx, ny, distance + 1])
                }
            }
        }
        // 목표 도달하지 못했을 경우 null 반환
        return null
    }
    // 시작 좌표 찾는 함수
    const findPosition = (target) => {
        for (let i = 0; i < maps.length; i ++) {
            for (let j = 0; j < maps[0].length; j ++) {
                if (maps[i][j] === target) {
                    return [i,j]
                }
            }
        }
        return null
    }
    
    // 실행 로직
    const lever = bfs(findPosition("S"), "L")
    if (lever === null) return -1
    const exit = bfs(findPosition("L"), "E")
    if (exit === null) return -1
    
    return lever + exit
}