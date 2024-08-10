/*
다익스트라로 알고리즘
다익스트라 ? => 시작 노드에서 다른 모든 노드까지의 최단 거리를 구하는 알고리즘.

동작 과정
1. 시작 노드에서 각 노드까지의 거리를 배열에 저장한다.
2. 거리를 저장한 배열에서 가장 가까운 노드로 방문 후 방문처리를 해주고, 해당 노드를 거쳐 다른 노드로 이동하는 거리가 더욱 가까울 경우 거리를 저장한 배열을 업데이트 해준다.
3. 2의 과정을 모든 노드를 방문할 때 까지 반복하며 거리를 저장한 배열을 업데이트 해준다.
*/

function solution(N, road, K) {
    // 저장할 때 편의를 위해 0번 노드는 비워놓는다.
    const visited = new Array(N + 1).fill(false)
    visited[0] = true
    const nodeCosts = new Array(N + 1).fill(Infinity)
    nodeCosts[1] = 0
    
    // 거리 설정
    let targetNode = 1
    let count = 1
    while (count <= N) {
        visited[targetNode] = true
        
        for (let r of road) {
            let [nodeA, nodeB, cost] = r
            if (nodeA === targetNode && nodeCosts[nodeA] + cost < nodeCosts[nodeB]) {
                nodeCosts[nodeB] = nodeCosts[nodeA] + cost
            }
            else if (nodeB === targetNode && nodeCosts[nodeB] + cost < nodeCosts[nodeA]) {
                nodeCosts[nodeA] = nodeCosts[nodeB] + cost
            }
        }
        // 가장 가까운 노드 타겟으로 설정
        targetNode = 0
        for (let i = 2; i <= N; i ++) {
            if (!visited[i] && nodeCosts[i] <= nodeCosts[targetNode]) {
                targetNode = i
            }
        }
        count ++
    }
    let result = 0
    for(let node of nodeCosts) {
        if (node <= K) result ++
    }
    return result
}