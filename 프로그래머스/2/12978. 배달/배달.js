function solution(N, road, K) {
    let costs = new Array(N + 1).fill(Infinity);
    const visited = new Array(N + 1).fill(false);

    costs[1] = 0; // 출발점의 비용은 0

    // 초기 비용 설정
    for (let i = 0; i < road.length; i++) {
        if (road[i][0] === 1) {
            costs[road[i][1]] = Math.min(costs[road[i][1]], road[i][2]);
        }
        if (road[i][1] === 1) {
            costs[road[i][0]] = Math.min(costs[road[i][0]], road[i][2]);
        }
    }

    const findMinCostNode = () => {
        let minCostNode = -1;
        for (let i = 1; i < costs.length; i++) {
            if (!visited[i] && (minCostNode === -1 || costs[i] < costs[minCostNode])) {
                minCostNode = i;
            }
        }
        return minCostNode;
    };

    const costUpdate = () => {
        let minCostNode = findMinCostNode();
        if (minCostNode === -1) return; // 더 이상 방문할 노드가 없으면 종료
        visited[minCostNode] = true;
        
        for (let i = 0; i < road.length; i++) {
            if (road[i][0] === minCostNode || road[i][1] === minCostNode) {
                let start = road[i][0] === minCostNode ? road[i][0] : road[i][1];
                let target = road[i][0] === minCostNode ? road[i][1] : road[i][0];
                let cost = road[i][2];
                if (costs[minCostNode] + cost < costs[target]) {
                    costs[target] = costs[minCostNode] + cost;
                }
            }
        }
    };

    // 모든 노드를 방문할 때까지 반복
    while (true) {
        let minCostNode = findMinCostNode();
        if (minCostNode === -1) break; // 더 이상 방문할 노드가 없으면 종료
        costUpdate();
    }

    // 만족하는 조건 카운트
    let count = 0;
    for (let i = 1; i < costs.length; i++) {
        if (costs[i] <= K) count++;
    }

    return count;
}
