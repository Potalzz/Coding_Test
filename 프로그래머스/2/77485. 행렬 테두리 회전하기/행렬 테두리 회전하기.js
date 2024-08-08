/*
회전을 적용할 때마다 회전하는 값 중에서 가장 작은 값 결과에 저장 후 반환.

행렬의 값은 1부터 row * column까지 순서대로 있다.

행렬 회전 방법
1. 좌 상단부터 시작하고, 시작하는 좌상단 값은 자신의 오른쪽으로 넘겨준다.
2. 아래로 쭉 내려가면서 아래 값을 자신의 값에 지정한다.
3. 직사각형의 맨 아래 행에 도달하면 열을 한 칸씩 이동하면서 다시 값을 교체한다.
4. 맨 오른쪽 열에 도달하면 위로 올라가면서 앞의 과정을 반복한다.
5. 맨 위 행에 도달하면 왼쪽 열로 이동하면서 다음 값을 자신에게 지정한다.

회전하면서 접근한 값들은 따로 temp에 저장해두고, 과정이 끝나면 최소값을 반환한다.
*/

function solution(rows, columns, queries) {
    // 초기 행렬 생성
    let board = Array.from({length : rows}, () => Array())
    for(let row = 0; row < rows; row ++) {
        let n = row * columns
        for (let col = 1; col <= columns; col ++) {
            board[row].push(n + col)
        }    
    }
    
    //행렬 회전하는 함수
    const rotateBoard = (query) => {
        let originBoard = JSON.parse(JSON.stringify(board))
        let x1 = query[0] - 1
        let y1 = query[1] - 1
        let x2 = query[2] - 1
        let y2 = query[3] - 1
        let min = Infinity
        let time = 0
        
        // 좌변 계산
        for (let row = x1; row < x2; row ++) {
            // 좌하단 값 제외한 좌변 값 교체
            let nextValue = originBoard[row + 1][y1]
            board[row][y1] = nextValue
            if (nextValue < min) min = nextValue
        }
        
        // 우변 계산
        for (let row = x2; row > x1; row --) {
            let nextValue = originBoard[row -1][y2]
            board[row][y2] = nextValue
            if (nextValue < min) min = nextValue
        }
        // 윗변 계산
        for (let col = y2; col > y1; col --) {
            let nextValue = originBoard[x1][col - 1]
            board[x1][col] = nextValue
            if (nextValue < min) min = nextValue
        }
        // 밑변 계산
        for (let col = y1; col < y2; col ++) {
            let nextValue = originBoard[x2][col + 1]
            board[x2][col] = nextValue
            if (nextValue < min) min = nextValue
        }
        
        return min
    }
    
    const result = []
    queries.forEach(query => {
        result.push(rotateBoard(query))
    })
    
    return result
}