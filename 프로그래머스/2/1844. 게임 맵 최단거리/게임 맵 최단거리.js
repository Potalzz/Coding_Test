/*
n x m 크기의 사각형에서 0,0시작점에서부터 n-1,m-1까지 최단 거리를 구하여라.
=> bfs를 활용한 풀이.

n과 m의 크기를 정의해준다.
x와 y의 이동방향을 담은 변수를 만들어준다.
maps의 크기와 동일한 방문 여부 확인 사각형을 만든다.
초기값을 할당해준다. (시작점, queue)

queue가 빌 때 까지 while문을 반복해준다.
queue에 담긴 칸에대한 정보를 변수로 할당해준다. (해당 칸에 대한 정보를 가지고 동작)

종료조건(n-1, m-1에 도착)을 할당해준다.

현재의 칸에서 상하좌우 로 이동한다.
칸에 이동할 수 있을 경우 방문 처리하고, 해당 칸에 대한 정보를 queue에 담는다.
while문 처음으로 돌아가서 queue에 담긴 해당 칸의 정보를 shift해서 해당 칸으로부터 다시 이동을 한다.

queue가 모두 비었을 경우, 모든 칸을 이동할 동안 종료조건(도착지점에 도달)을 만족하지 못했으므로
-1(불가능)을 반환한다.
*/

function solution(maps) {
    const n = maps.length
    const m = maps[0].length
    
    const dx = [0,1,0,-1]
    const dy = [1,0,-1,0]
    
    const visited = Array.from({ length : n }, () => Array(m).fill(false))
    visited[0][0] = true
    
    const queue = [[0, 0, 1]]
    
    while (queue.length > 0) {
        const [x, y, distance] = queue.shift()
        
        if (x === n - 1 && y === m - 1) return distance
        
        for (let i = 0; i < 4; i ++) {
            const nx = x + dx[i]
            const ny = y + dy[i]
            
            if (nx >= 0 && ny >= 0 && nx < n && ny < m &&
                maps[nx][ny] === 1 && !visited[nx][ny]) {
                visited[nx][ny] = true
                queue.push([nx, ny, distance + 1])
            }
        }
    }
    
    return -1;
}