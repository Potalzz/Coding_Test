/*
n개의 행과 행마다 열이 1개씩 늘어나는 2차원 배열을 만든다.
아래로 내려가면서 맨 앞에 값들을 채워준다.
마지막 행에 도달하면 n개만큼 채워준다.
그 뒤로 위로 올라가면서, 맨 뒤에 값을 채워준다.
한 바퀴를 돌면 round + 1해주고 앞에서 [행][round]에 값을 채워준다.
[행-round]에 도달하면 해당 행의 길이에 빈 값을 모두 채워준다.
*/
function solution(n) {
    let answer = [];
    let snailMap = Array.from({length : n}, () => [])
    for (let i = 0; i < n; i ++) {
        snailMap[i] = Array(i+1).fill(false)
    }
    // 마지막 숫자 구하기
    let lastNum = n % 2 === 0 ? (n + 1) * (n / 2) : n * ((n - 1) / 2) + n
    let last = n - 1
    let round = 0
    let num = 1
    while (num <= lastNum) {
        // 내려가면서 채우기
        for (let y = round * 2; y < n - round; y ++) {
                snailMap[y][round] = num
                num ++
            if (num > lastNum) break
        }
        // 가장 아래 행 다 채우기
        for (let x = round + 1; x < n - round * 2; x ++) {
                snailMap[n - 1 - round][x] = num
                num ++
                if (num > lastNum) break
        }
        // 올라가면서 채우기
        for (let y = n - round - 2; y >= 1 + (round * 2); y --) {
                snailMap[y][y - round] = num
                num ++
                if (num > lastNum) break    
        }
        round ++
    }
    
    let result = []
    for (let i = 0; i < n; i ++) {
        for (let j = 0; j < snailMap[i].length; j ++) {
            result.push(snailMap[i][j])
        }
    }
    return result;
}