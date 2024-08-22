/*
enemy배열에서 k개만큼의 최대값을 저장하고, 최대값에 속한 범위의 숫자가 나오면 k 소모.

로직
1. enemy를 복사 후 정렬한 뒤, 0부터 k까지 객체에 추가한다.
2. enemy를 순회하면서 해당 수가 객체에 속하고 0보다 클 경우 무적권 사용.
-> 실패. 순서를 고려 안하고 최대값만 막다가는, 무적권을 다 못쓰고 죽는 경우 발생.

직접 게임을 플레이하면 안되고, 최대 라운드를 판별하는 입장으로 가야한다.

로직의 변화
쎈적 나오면 무적권 사용 -> 죽으면 이전에 가장 강한적에서 무적권 썼다 치고 체력회복.

개선 로직
1. 최대 힙을 만들어서 배열을 순회하면서 적의 수들을 최대 힙에 넣는다.
2. enemy배열을 순회하고, 체력이 0이하가 되면 최대 힙에서 하나씩 꺼내 체력 회복하고 무적권 소모.
*/

function solution(n, k, enemy) {
    const maxHeap = new MaxHeap()
  
    for (let i = 0; i < enemy.length; i ++) {
        let monsters = enemy[i]
        n -= monsters
        maxHeap.insert(monsters)
        
        if (n <= 0) {
            while (n < 0 && maxHeap.size() > 0 && k > 0) {
                n += maxHeap.remove()
                k --
            }
        }
        
        if (n === 0 && k === 0) return i + 1
        if (n < 0) return i
    }
    
    if (n < 0) return enemy.length - 1
    
    return enemy.length
}

class MaxHeap {
    constructor () {
        this.heap = []
    }
    
    getParentIndex (index) {
        return Math.floor((index - 1) / 2)
    }
    
    getLeftChildIndex (index) {
        return index * 2 + 1
    }
    
    getRightChildIndex (index) {
        return index * 2 + 2
    }
    
    swap (index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
    }
    
    insert (value) {
        this.heap.push(value)
        this.bubbleUp()
    }
    
    size () {
        return this.heap.length
    }
    
    bubbleUp () {
        let index = this.size() - 1
        while (index > 0) {
            let parentIndex = this.getParentIndex(index)
            if (this.heap[index] > this.heap[parentIndex]) {
                this.swap(index, parentIndex)
                index = parentIndex
            } else {
                break
            }
        }
    }
    
    remove () {
        if (this.size() === 0) return null
        if (this.size() === 1) return this.heap.pop()
        
        let root = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.bubbleDown()
        return root
    }
    
    bubbleDown () {
        let index = 0
        const length = this.size()
        while (this.getLeftChildIndex(index) < length) {
            let largest = this.getLeftChildIndex(index)
            let rightIndex = this.getRightChildIndex(index)
            if (this.heap[rightIndex] > this.heap[largest]) largest = rightIndex
            
            if (this.heap[index] < this.heap[largest]) {
                this.swap(index, largest)
                index = largest
            } else break
        }
    }
    
    peak () {
        return this.heap[0]
    }
}
