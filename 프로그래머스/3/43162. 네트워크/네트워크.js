/*
adj리스트로 변환하고, bfs를 통해 해결
더이상 갈곳이 없을 때 마다, count를 1씩 올리고 새로운 노드로 시작.
*/

function solution(n, computers) {
    const adj = {}
    for (let r = 0; r < n; r ++) {
        adj[r+1] = []
        for (let c = 0; c < n; c ++) {
            if (c !== r && computers[r][c] === 1) {
                adj[r+1].push(c+1)
            }
        }
    }
    
    // BFS 탐색
    const visited = new Array(n + 1).fill(false)
    let visitCount = 0
    let netWorkCount = 1
    let queue = adj[1]
    visited[1] = true
    visitCount ++
    while (visitCount < n) {
        while (queue.length > 0) {
            let v = queue.shift()
            if (!visited[v]) {
                visited[v] = true
                visitCount ++
                queue.push(...adj[v])
            }
        }
        // 새로운 대륙에서 시작점 찾기
        for (let i = 1; i <= n; i ++) {
            if (!visited[i]) {
                queue.push(i)
                netWorkCount ++
                break
            }
        }
    }
    
    return netWorkCount
}