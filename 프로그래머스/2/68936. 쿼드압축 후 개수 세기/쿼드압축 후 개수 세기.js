/*
재귀함수로 표현
값이 하나가 될 때 까지 재귀적으로 계속해서 호출.
*/

function solution(arr) {
    
    const isUniform = (x, y, size) => {
        let value = arr[x][y]
        for(let i = x; i < x + size; i ++) {
            for(let j = y; j < y + size; j ++) {
                if (arr[i][j] !== value) return false
            }
        }
        return true
    }
    
    const compress = (x, y, size) => {
        if (size === 1 || isUniform(x, y, size)) {
            return arr[x][y] === 0 ? [1, 0] : [0, 1]
        }
        let harfSize = size / 2
        let leftTop = compress(x, y, harfSize)
        let rightTop = compress(x, y + harfSize, harfSize)
        let leftBottom = compress(x + harfSize, y, harfSize)
        let rightBottom = compress(x + harfSize, y + harfSize, harfSize)
        
        return [leftTop[0] + rightTop[0] + leftBottom[0] + rightBottom[0],
                leftTop[1] + rightTop[1] + leftBottom[1] + rightBottom[1]]
    }
    return compress(0,0,arr.length)
}