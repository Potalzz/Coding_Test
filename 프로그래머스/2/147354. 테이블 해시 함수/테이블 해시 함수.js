/*
bitwise XOR 이란 ?
1. 수를 2진수로 변환하고, 두 수의 자리수를 비교해 같으면 0, 다르면 1을 가진다.
2. 1을 통해 나온 결과를 다시 10진수로 변환한다.

1. 주어진 data를 col번째 컬럼 기준으로 하여 재정렬한다.
2. row_begin <= i <= row_end 의 범위에 속하는 행마다 각 행의 값들을 i로 나눈 모든 값을 더해서 저장한다.
3. 저장해서 나온 모든 값에 bitwise XOR을 하여 반환한다.
*/


function solution(data, col, row_begin, row_end) {
    // 1. 주어진 data 정렬
    let priorityRow = []
    for (let i = 0; i < data.length; i ++) {
        priorityRow.push(i)
    }
    col--
    priorityRow.sort((a, b) => {
        if (data[a][col] === data[b][col]) {
            return data[b][0] - data[a][0]
        }
        return data[a][col] - data[b][col]
    })
    
    const sortedData = []
    
    for (let idx of priorityRow) {
        sortedData.push(data[idx])
    }
    
    // 2. i행의 값들을 i로 나눈 모든 값을 더해서 저장한다. (범위에 포함되는 경우)
    let results = []
    for (let i = row_begin - 1; i <= row_end - 1; i ++) {
        results.push(sortedData[i].reduce((sum,el) => sum + (el % (i + 1)),0))
    }
    let result = results[0] ^ results[1]
    // 3. 저장해서 나온 모든 값에 bitwise XOR을 하여 반환한다.
    for (let i = 2; i < results.length; i ++) {
        result = result ^ results[i]
    }
    
    return result
}