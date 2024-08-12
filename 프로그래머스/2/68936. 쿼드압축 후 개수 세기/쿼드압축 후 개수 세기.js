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
            return arr[x][y] === 0 ? [1, 0] : [0, 1]
        }
        const halfSize = size / 2
        const topLeft = compress(x, y, halfSize)
        const topRight = compress(x, y + halfSize, halfSize)
        const bottomLeft = compress(x + halfSize, y, halfSize)
        const bottomRight = compress(x + halfSize, y + halfSize, halfSize)
        
        return [topLeft[0] + topRight[0] + bottomLeft[0] + bottomRight[0],
                topLeft[1] + topRight[1] + bottomLeft[1] + bottomRight[1]]
    }
    
    
    
    return compress(0,0,arr.length)
}