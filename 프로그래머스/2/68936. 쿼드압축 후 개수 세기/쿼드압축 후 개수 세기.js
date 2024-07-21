/*
최대 행의 개수가 1024이므로 값의 개수는 n^2 미만으로 해결

가장 작은 사각형부터 시작해서, 조건에 일치하면 숫자 하나로 변환한다.
4개 확인해서 압축 가능하면 압축 압축하면 해당 배열은 뭐로 변경 ?
한 번 압축 후 다음 압축은 4개 모두 압축되어야 압축 가능.
압축 여부를 확인하는 배열 생성
한 번씩 압축할 때마다 새로운 배열에 담아줌.
*/
function solution(arr) {
    
    function isUniform(x, y, size) {
        let value = arr[x][y]
        for (let i = x; i < x + size; i++) {
            for (let j = y; j < y + size; j++) {
                if (arr[i][j] !== value) {
                    return false
                }
            }
        }
        return true
    }
    
    function compress(x, y, size) {
        if(size === 1 || isUniform(x, y, size)) {
            return arr[x][y] === 0 ? [1, 0] : [0, 1]
        }
        
        let harfSize = size / 2
        let topLeft = compress(x, y, harfSize)
        let topRight = compress(x, y + harfSize, harfSize)
        let bottomLeft = compress(x + harfSize, y, harfSize)
        let bottomRight = compress(x + harfSize, y + harfSize, harfSize)
        
        return [topLeft[0] + topRight[0] + bottomLeft[0] + bottomRight[0],
                topLeft[1] + topRight[1] + bottomLeft[1] + bottomRight[1]
               ]
        
    }
    
    
    return compress(0, 0, arr.length)
}
    