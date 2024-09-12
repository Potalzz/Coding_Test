/*
최대힙으로 구현
최대값 삭제 - 힙의 꼭대기 부분 삭제
최소값 삭제
- 해당 큐의 사이즈를 s라고 가정하고, 아래에서 log2^s만큼의 수를 비교하여 삭제 후 heapifyDown해준다.
- log2^s만큼 비교하는 이유 : heap의 root는 지수로 증가하므로 가장 아래 루트의 원소의 개수만 비교.

최대힙에 최소값을 삭제해주는 메서드를 추가
*/

function solution(operations) {
    let heap = new MaxHeap()
    
    for (let order of operations) {
        if (order[0] === 'I') {
            if (order[2] === '-') {
                let value = parseInt(order.slice(2))
                value * - 1
                heap.add(value)
            }
            else {
                heap.add(parseInt(order.slice(2)))
            }
        }
        else if (order[2] === '-') {
            heap.deleteMin()
        }
        else {
            heap.deleteMax()
        }
    }
    // console.log(heap.size())
    if (heap.size() === 0) {
        return [0, 0]
    }
    let heapArray = heap.toArray()
    
    return [Math.max(...heapArray), Math.min(...heapArray)]
}

// class heap --------------------------------------------------------

class MaxHeap {
    constructor () {
        this.heap = []
    }
    
    getParent (index) {
        return Math.floor((index - 1) / 2)
    }
    
    getLeftChild (index) {
        return index * 2 + 1
    }
    
    getRightChild (index) {
        return (index + 1) * 2
    }
    
    swap (index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
    }
    
    size () {
        return this.heap.length
    }
    
    add (value) {
        this.heap.push(value)
        this.heapifyUp()
    }
    
    heapifyUp () {
        let index = this.size() - 1
        
        while (index > 0) {
            let parentIndex = this.getParent(index)
            if (this.heap[index] > this.heap[parentIndex]) {
                this.swap(index, parentIndex)
                index = parentIndex
            }
            else {
                break
            }
        }
        // 최소값을 가장 오른쪽 끝에 배치.
        if (this.heap[index] < this.heap[this.size() - 1]) {
            this.swap(index, this.size() - 1)
        }
    }
    
    deleteMax () {
        if (this.size() === 0) {
            return
        }
        if (this.size() === 1) {
            this.heap.pop()
            return
        }
        let maxValue = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
    }
    
    heapifyDown () {
        let index = 0
        
        while (this.getLeftChild(index) < this.size()) {
            let largest = this.getLeftChild(index)
            let rightIndex = this.getRightChild(index)
            if (rightIndex < this.size() && this.heap[rightIndex] > this.heap[largest]) {
                largest = rightIndex
            }
            
            if (this.heap[index] < this.heap[largest]) {
                this.swap(index, largest)
                index = largest
            }
            else {
                break
            }
        }
        
        if (this.heap[index] < this.heap[this.size() - 1]) {
            this.swap(index, this.size() - 1)
        }
    }
    
    peak () {
        return this.heap[0]
    }
    
    deleteMin () {
        if (this.size() === 0) {
            return
        }
        
        if (this.size() < 3) {
            this.heap.pop()
            return
        }
      
        let len = this.size()
        
        let smallest = len - 1
        let start = Math.floor(Math.sqrt(len))
        for (let i = start; i < len; i ++) {
            if (this.heap[i] < this.heap[smallest]) {
                smallest = i
            }
        }
        this.swap(smallest, len - 1)
        
        this.heap.pop()
    }
    
    toArray () {
        return [...this.heap]
    }
    
    
    
    
    
    
}
                                          
                                          
                                          
                                          