/*
주어진 edge배열을 adjency List(인접 리스트) 형태로 만들어준다.
필요한 자료구조
Array
- visted (정점 방문 처리목적)
Object
- adj list (인접 노드 구분)
- distance (정점별 거리 저장)

BFS로 구현
시작점 S인 1번 노드부터, queue에 담아 while문을 시작하고 queue가 비면 종료한다.
for문을 통해 해당 노드와 연결된 간선을 인접리스트를 통해 가져오고, queue에 삽입한다.
방문한 노드는 visited 처리를 해주며, 깊이당 거리를 1씩 더해준다.

X
다익스트라로 최단 경로 모두 구하고 가장 큰 값들만 반환 ?
*/

function solution(n, edge) {
    const adjList = {}
    const nodeCosts = new Array(n+1).fill(Infinity)
    const visited = new Array(n+1).fill(false)
    for (let i = 1; i <= n; i++ ) {
        adjList[i] = []
        nodeCosts[i] = Infinity
    }
    
    for (let v of edge) {
        adjList[v[0]].push(v[1])
        adjList[v[1]].push(v[0])
    }
    
    // 초기값 설정
    nodeCosts[1] = 0
    let targetNode = 1
    let count = 1
    // console.log(adjList, visited, nodeCosts)
    // 거리 계산
    while (count <= n) {
        visited[targetNode] = true
        let cost = nodeCosts[targetNode] + 1
        // 연결된 노드에 거리 업데이트
        for (let node of adjList[targetNode]) {
            if (nodeCosts[node] > cost) {
                nodeCosts[node] = cost
            }
        }
        targetNode = 0
        for (let i = 2; i <= n; i ++) {
            if (!visited[i] && nodeCosts[i] !== Infinity) {
                if (nodeCosts[targetNode] > nodeCosts[i]) {
                    targetNode = i
                }
            }
        }
        count ++
    }
    
    // console.log(nodeCosts)
    nodeCosts[0] = 0
    let maxDistance = Math.max(...nodeCosts)
    // console.log(maxDistance)
    let result = nodeCosts.reduce((total, el) => {
        if (el === maxDistance) {
            return total + 1
        }
        else return total
    }, 0)
    
    return result
}