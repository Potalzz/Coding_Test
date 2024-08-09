/*
계속해서 압축을 진행해서 압축이 가능해지거나 1이 되면 반환.

필요한 함수
1. 압축 가능 판별 함수
2. 압축하는 함수
*/

function solution(arr) {
    const isUniform = (x, y, size) => {
        let value = arr[x][y]
        for (let i = x; i < x + size; i ++) {
            for (let j = y; j < y + size; j ++) {
                if (arr[i][j] !== value) return false
            }
        }
        return true
    }
    
    const compress = (x, y, size) => {
        if (size === 1 || isUniform(x, y, size)) {
            return arr[x][y] === 0 ? [1,0] : [0,1]
        }
        let halfSize = size / 2
        let topLeft = compress(x, y, halfSize)
        let topRight = compress(x, y + halfSize, halfSize)
        let bottomLeft = compress(x + halfSize, y, halfSize)
        let bottomRight = compress(x + halfSize, y + halfSize, halfSize)
        
        return [topLeft[0] + topRight[0] + bottomLeft[0] + bottomRight[0],
               topLeft[1] + topRight[1] + bottomLeft[1] + bottomRight[1]]
        
    }

    return compress(0,0,arr.length)
}