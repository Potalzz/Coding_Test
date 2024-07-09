/*
10 * 10 좌표평면에서 캐릭터가 처음 이동한 길의 길이 총 합을 구해라.

왔던 길인지 판별하는 방법
하나의 길을 이동하는 방법은 총 두 가지
한 번의 이동마다 두 가지 경로를 모두 문자열 형태로 저장.
해당 경로가 저장되어 있으면 횟수 추가 x
*/

function solution(dirs) {
    let distance = 0;
    const directions = {
        R: [0, 1],
        D: [1, 0],
        L: [0, -1],
        U: [-1, 0]
    };
    
    const pathSet = new Set();
    let x = 0, y = 0;
    
    for (const dir of dirs) {
        const [dx, dy] = directions[dir];
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx > 5 || ny > 5 || nx < -5 || ny < -5) {
            continue;
        }
        
        const route1 = `${x},${y},${nx},${ny}`;
        const route2 = `${nx},${ny},${x},${y}`;
        
        if (!pathSet.has(route1)) {
            pathSet.add(route1);
            pathSet.add(route2);
            distance++;
        }
        
        x = nx;
        y = ny;
    }
    
    return distance;
}
