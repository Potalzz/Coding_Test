function solution(n, k, enemy) {
    let lt = 0
    let rt = enemy.length
    const check = (n, k, mid, enemy) => {
        if (k >= enemy.length) return true
        
        let copiedEnemy = enemy.slice(0, mid).sort((a,b) => b-a)
        let sum = 0
        for (let i = k; i < copiedEnemy.length; i ++) {
            sum += copiedEnemy[i]
            if (sum > n) return false
        }
        
        return true
    }
    
    while (lt <= rt) {
        let mid = Math.floor((lt + rt) / 2)
        if (check(n, k, mid, enemy)) lt = mid + 1
        else rt = mid - 1
    }
    
    return lt - 1
}