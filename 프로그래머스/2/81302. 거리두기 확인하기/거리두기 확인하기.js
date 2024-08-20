/*
맨해튼 거리 2 이하는 X
한 칸에서 상하좌우는 2칸씩 대각선은 1칸씩 떨어져야 함.
응시자 사이 파티션이 있는 경우 앉을 수 있음.
대각 1칸은 파티션이 위치 못하므로 무조건 X 

데이터 사이즈
5 X 5크기의 대기실이 5개.
각 대기실 1개씩 비교하여 5번 반복.

대기실 비교
1. 대기실을 순회하며 P를 찾는다.
2. P가 나오면, 인접한 칸에 다른 P가 있는지 확인하고, 있을 경우 판별을 종료하고 0을 반환한다.
3. 인접한 칸에 P가 없을 경우, 2칸 떨어진 상하좌우에 P가 있는지 확인하고, 있는경우 파티션 유무 체크 후 없으면 0반환하고 파티션 있으면 다음으로 넘어간다.
4. 해당 과정을 5개의 대기실에 모두 적용하여 result에 추가한다.
*/
function solution(places) {
    const result = []
    for(let i = 0; i < 5; i ++) {
        result.push(checkPlace(places[i]))
    }
    return result
}

function checkPlace(place) {
        // 1. 대기실을 순회하며 P를 찾는다.
        for (let row = 0; row < 5; row ++) {
            for (let col = 0; col < 5; col ++) {
                // 2. P가 나오면, 상하좌우 대각선 확인
                if (place[row][col] === "P")  {
                    // 상
                    if (row - 1 >= 0 && place[row-1][col] === "P") return 0
                    if (row - 2 >= 0 && place[row-2][col] === "P" && place[row-1][col] === "O") return 0
                    // 하
                    if (row + 1 < 5 && place[row+1][col] === "P") return 0
                    if (row + 2 < 5 && place[row+2][col] === "P" && place[row+1][col] === "O") return 0
                    // 좌
                    if (col - 1 >= 0 && place[row][col-1] === "P") return 0
                    if (col - 2 >= 0 && place[row][col-2] === "P" && place[row][col-1] !== "X") return 0
                    // 우
                    if (col + 1 < 5 && place[row][col+1] === "P") return 0
                    if (col + 2 < 5 && place[row][col+2] === "P" && place[row][col+1] !== "X") return 0
                    // 왼쪽 위
                    if (row - 1 >= 0 && col - 1 >= 0 && place[row-1][col-1] === 'P') {
                        if (place[row-1][col] === 'O' || place[row][col-1] === 'O') return 0
                    }
                    // 오른쪽 위
                    if (row - 1 >= 0 && col + 1 < 5 && place[row-1][col+1] === 'P') {
                        if (place[row-1][col] === 'O' || place[row][col+1] === 'O') return 0
                    }
                    // 왼쪽 아래
                    if (row + 1 < 5 && col - 1 >= 0 && place[row+1][col-1] === 'P') {
                        if (place[row+1][col] === 'O' || place[row][col-1] === 'O') return 0
                    }
                    // 오른쪽 아래
                    if (row + 1 < 5 && col + 1 < 5 && place[row+1][col+1] === 'P') {
                        if (place[row+1][col] === 'O' || place[row][col+1] === 'O') return 0
                    }
                }
            }
        }
        return 1
    }