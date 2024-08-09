/*
최대 100 x 100 크기의 행렬

해당 map에서 각 섬의 숫자 합을 반환하여라.

bfs로 해결
한 번 숫자에 방문하면 해당 위치 방문처리하고 상,하,좌,우로 이동


*/


function solution(maps) {
    maps = maps.map(el => el.split(""))
    const n = maps.length
    const m = maps[0].length
    // let visited = Array.from({length : n}, () => Array(m).fill(false))
    
    
    function bfs(x,y) {
        let queue = [[x,y]]
        let total = parseInt(maps[x][y])
        maps[x][y] = "X"
        
        const dx = [0,1,0,-1]
        const dy = [1,0,-1,0]
        
        while (queue.length > 0) {
            let q = queue.shift()
            for (let i = 0; i < 4; i ++) {
                let nx = q[0] + dx[i]
                let ny = q[1] + dy[i]
                if (nx < n && ny < m && nx >= 0 && ny >= 0 &&
                    maps[nx][ny] !== "X") {
                    total += parseInt(maps[nx][ny])
                    maps[nx][ny] = "X"
                    queue.push([nx,ny])
                }
            }    
        }
        return total
    }
    
    const result = []
    for(let x = 0; x < n; x ++) {
        for (let y = 0; y < m; y ++) {
            if (maps[x][y] !== "X") {
                result.push(bfs(x,y))
            }
        }
    }
    
    if (result.length === 0) return [-1]
    return result.sort((a,b) => a-b)
}