/*
송전탑 개수 n개(최대 100개)
n의 절반과 가장 가까운 수 찾고, n - 해당수 를 반환

간선을 가장 많이 가지고 있는 노드를 맨 꼭대기로 올린다.
그리고, 자식 노드들의 수가 가장 비슷해지도록 하나의 자식 노드와 연결을 끊는다.
[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]] 의 원본 배열을
= > [[], [3], [3], [1,2,4], [3,5,6,7], [4], [4], [4,8,9], [7], [7]] 로 변경한다.
간선이 가장 많은 노드를 찾는다.
topNode의 자식 노드별로 자식의 개수를 저장한다.
    - 자식 개수를 반환하는 함수를 만든다.
    - (tree, node)를 인수로 받아서 node부터 방문 처리를 해가며 tree를 순환하여 총 자식 수 반환.
전체 노드의 절반과 가장 근접한 자식 개수를 가진 노드와 연결을 끊는다.


맨 꼭대기 노드를 정해두는 게 아니라,
각자 노드마다 연결된 노드 중 (n - 연결된 노드의 자식의 개수)가 가장 낮은 값을 찾으면 됨.
*/

function solution(n, wires) {
    // 트리 형태로 변환
    const tree = Array.from({length : n + 1}, () => Array())
    for (let node of wires) {
        tree[node[0]].push(node[1])
        tree[node[1]].push(node[0])
    }
    console.log(tree)
    
    
    const countChildNode = (nodeTree, parentNode, nodeNum) => {
        let visited = new Array(n+1).fill(false)
        visited[nodeNum] = true
        visited[parentNode] = true
        let queue = JSON.parse(JSON.stringify(nodeTree[nodeNum]))
        let countChild = 1
        while (queue.length > 0) {
            let childNode = queue.shift()
            if (visited[childNode]) continue
            visited[childNode] = true
            countChild ++
            
            for(let child of nodeTree[childNode]) {
                if (!visited[child]) {
                    visited[child] = true
                    countChild ++
                    for (let item of nodeTree[child]) {
                        queue.push(item)
                    }
                }
            }
        }
        return countChild
    }
    // let topNode = 0
    // for (let i = 1; i < tree.length; i ++) {
    //     if (countChildNode(i) > topNode) {
    //         topNode = i
    //     }
    // }
    // console.log("topNode = ",topNode)
    
    // for(let node of tree[topNode]) {
    //     let value = countChildNode(node)
    //     console.log("value", value)
    //     if (Math.abs(n - value * 2) < answer) {
    //         answer = Math.abs(n - value * 2)
    //     }
    // }
    // console.log(answer)
    
    
    let answer = n
    let result = n
    let numList = []
    let half = Math.floor(n / 2)
    for(let i = 1; i <= n; i++) {
        
        for (let node of tree[i]) {
            numList.push(Math.abs(n - countChildNode(tree, i, node) * 2))
            // console.log(countChildNode(tree, i, node))
        }
        
    }
    return Math.min(...numList)
}