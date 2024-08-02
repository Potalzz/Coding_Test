/*
다익스트라 알고리즘으로 구현 

계획
1. 시작 노드인 1번 노드에서 모든 노드마다의 경로를 구해 저장한다.
2. 경로를 구하고, 해당 노드에서 최단 거리인 노드에서부터 다시 다른 노드간의 경로를 구한다.
3. 2번에서 구한 경로의 값이, 처음 구한 경로보다 가까울 경우, 거리를 업데이트한다.

위 계획이 성립되기 위한 조건
1. 노드간의 연결 상태를 알고 있어야 한다.
2. 노드간의 거리는 양수여야 한다.
3. 모든 노드는 시작 노드에서 출발해 도달할 수 있어야 한다.

코드로 구현
1. 각 노드마다 인접 노드들을 담은 2차원 배열을 만들어준다.
2. 시작 노드와 연결된 노드들의 거리를 저장해준다.
3. 시작 노드에서부터 최단 거리인 노드로 이동해, 해당 노드에서 인접 노드들의 거리를 계산하고 거리가 더 짧다면 거리를 업데이트 해준다.
4. 3번의 과정을 마지막 노드까지 반복한다.
*/

function solution(N, road, K) {
    let costs = new Array(N+1).fill(Infinity)
    costs[1] = 0
    const visited = new Array(N+1).fill(false)
    
    // 초기 비용 설정
    for(let i = 0; i < road.length; i ++) {
        if (road[i][0] === 1) {
            costs[road[i][1]] = Math.min(costs[road[i][1]], road[i][2])
        }
        else if (road[i][1] === 1) {
            costs[road[i][0]] = Math.min(costs[road[i][0]], road[i][2])
        }
    }
    // 제일 비용이 낮은 노드 찾기
    const findMinCostNode = () => {
        let minCostNode = 0
        for (let i = 2; i < costs.length; i ++) {
            if (!visited[i] && costs[i] < costs[minCostNode]) {
                minCostNode = i
            }
        }
        return minCostNode
    }
    
    // 최소 비용 노드에서 비용 업데이트하는 함수
    const costUpdate = () => {
        let minCostNode = findMinCostNode()
        visited[minCostNode] = true
        
        for(let i = 0; i < road.length; i ++) {
            if (road[i][0] === minCostNode || road[i][1] === minCostNode) {
                let target = road[i][0] === minCostNode ? road[i][1] : road[i][0]
                let cost = road[i][2]
                // 비용 더 작으면 비용 업데이트
                if (costs[minCostNode] + cost < costs[target]) {
                    costs[target] = costs[minCostNode] + cost
                }
            }
        }
        return
    }
    
    // N번 만큼 함수 비용 업데이트
    for (let i = 0; i < N; i ++) {
        costUpdate()
    }
    
    // 만족하는 조건 카운트
    let count = 1
    for(let i = 2; i < costs.length; i ++) {
        if (costs[i] <= K) count ++
    }
    
    return count
}