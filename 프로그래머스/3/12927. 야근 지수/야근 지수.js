function solution(n, works) {
    const worksHeap = new MaxHeap(works)
    while (n > 0) {
        worksHeap.reduceMaxValue()
        n -= 1
    }
    const answer = worksHeap.heap.reduce((sum, value) => sum + Math.pow(value, 2), 0)
    
    return answer
}

class MaxHeap {
    constructor (values = []) {
        this.heap = []
        for (let value of values) {
            this.insert(value)
        }
    }
    
    getParentIdx (index) {
        return Math.floor((index - 1) / 2)
    }
    
    getLeftIdx (index) {
        return index * 2 + 1
    }
    
    getRightIdx (index) {
        return index * 2 + 2
    }
    
    swap (index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
    }
    
    insert (value) {
        this.heap.push(value)
        this.heapifyUp()
    }
    
    heapifyUp () {
        let index = this.heap.length - 1
        while (index > 0){
            let parentIdx = this.getParentIdx(index)
            if (this.heap[index] > this.heap[parentIdx]) {
                this.swap(index, parentIdx)
                index = parentIdx    
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
        this.heapifyDown()
        return root
    }
    
    heapifyDown () {
        let index = 0
        const length = this.heap.length
        while (this.getLeftIdx(index) < length) {
            let largest = this.getLeftIdx(index)
            let rightIdx = this.getRightIdx(index)
            
            if (rightIdx < length && this.heap[rightIdx] > this.heap[largest]) {
                largest = rightIdx
            }
            if (this.heap[index] < this.heap[largest]) {
                this.swap(index, largest)
                index = largest
            } else {
                break
            }
        }
    }
    
    peak () {
        return this.heap[0]
    }
    
    size () {
        return this.heap.length
    }
    
    reduceMaxValue () {
        if (this.peak() <= 0) {
            return
        }
        this.heap[0] -= 1
        this.heapifyDown()
    }
}