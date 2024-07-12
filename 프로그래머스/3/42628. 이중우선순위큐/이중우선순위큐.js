/*
주어진 연산(특정 숫자 삽입, 최댓값 삭제, 최솟값 삭제)을 모두 시행하고
최댓값, 최솟값 반환. 비어있으면 0,0반환

최소힙에 최대 값 제거 메서드를 추가해서 구현해준다.
마지막에 최종 값 반환. 숫자는 둘다 넣어줌.
length는 따로 측정해준다.
*/

function solution(operations) {
    let answer = []
    let minHeap = new MinHeap()
    let length = 0
    for(let i = 0; i < operations.length; i ++) {
        if (operations[i][0] === "I") {
            let num = parseInt(operations[i].slice(2))
            minHeap.add(num)
            length ++
        } else if(operations[i][2] === "-") {
            minHeap.remove()
            if (length > 0) length --
        } else {
            minHeap.removeMax()
            if (length > 0) length --
        }
    }
    
    if(length === 0) {
        answer = [0,0]
    } else if (length >= 2) {
        answer.push(minHeap.removeMax())
        answer.push(minHeap.peak())
    } else {
        answer.push(minHeap.peak())
        answer.push(minHeap.peak())
    }

    
    return answer
}

// 최소힙 구현
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }
    
    getLeftChildIndex(index) {
        return index * 2 + 1
    }
    
    getRightChildIndex(index) {
        return index * 2 + 2
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }
    
    add(value) {
        this.heap.push(value)
        this.heapifyUp()
    }
    
    heapifyUp(idx = this.heap.length - 1) {
        let index = idx
        while (index > 0) {
            let parentIndex = this.getParentIndex(index)
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex)
                index = parentIndex
            } else {
                break
            }
        }
    }
    
    remove() {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()
        
        const root = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
        
        return root
    }
    
    heapifyDown(idx = 0) {
        const length = this.heap.length
        let index = idx
        while(this.getLeftChildIndex(index) < length) {
            let smallest = this.getLeftChildIndex(index)
            let rightIndex = this.getRightChildIndex(index)
            if (rightIndex < length && this.heap[rightIndex] < this.heap[smallest]) {
                smallest = rightIndex
            }
            if (this.heap[index] > this.heap[smallest]) {
                this.swap(index, smallest)
                index = smallest
            } else {
                break
            }
        }
    }
    
    size() {
        return this.heap.length
    }
    
    peak() {
        return this.heap[0]
    }
    
    removeMax() {
        if (this.size() === 0) return null
        if (this.size() <= 2) return this.heap.pop()
        
        let maxIndex = this.size() - 1
        for (let i = Math.floor(this.size() / 2); i < this.size(); i ++) {
            if (this.heap[i] > this.heap[maxIndex]) {
                maxIndex = i
            }
        }
        const max = this.heap[maxIndex]
        if(maxIndex < this.size()) {
            this.heapifyUp(maxIndex)
            this.heapifyDown(maxIndex)
        }
        return max
    }
}
