/*
10 * 10 좌표평면에서 캐릭터가 처음 이동한 길의 길이 총 합을 구해라.

왔던 길인지 판별하는 로직
하나의 길을 이동하는 방법은 총 두 가지 이므로, 두 가지를 모두 문자열 형태로 저장.
해당 루트가 포함되어있으면 횟수 추가 x
*/

function solution(dirs) {
    let distance = 0;
    const pathMap = new Map()
    pathMap.set("R", 0)
    pathMap.set("D", 1)
    pathMap.set("L", 2)
    pathMap.set("U", 3)
    
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
    let x = 0
    let y = 0
    let route1 = ""
    let route2 = ""
    let pathList = []
    for(let i = 0; i < dirs.length; i ++) {
        let nx = x + dx[pathMap.get(dirs[i])]
        let ny = y + dy[pathMap.get(dirs[i])]
        if (nx > 5 || ny > 5 || nx < -5 || ny < -5 ) {
            continue
        }
        route1 = x.toString() + y.toString() + nx.toString() + ny.toString()
        route2 = nx.toString() + ny.toString() + x.toString() + y.toString()
        x = nx
        y = ny
        if (pathList.includes(route1)) continue
        pathList.push(route1)
        pathList.push(route2)
        distance ++
    }
    return distance;
}