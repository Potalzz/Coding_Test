/*
최대 힙(Max heap)으로 구현.

힙 알고리즘이란 ?
이진 트리의 구조로써, 루트 노드에는 최대값(Max heap 기준)이 위치하고,
리프 노드를 제외한 모든 노드는 자신보다 낮은 값을 가진 2개의 자식노드를 가지고 있는 형태이다.

Min Heap으로 구현

필요한 메서드 목록
사이즈 확인
삽입 (heapifyup)
삭제 (heapifydown)
index 교체
index 구하기
*/

class MinHeap {
    constructor(values = []) {
        this.heap = []
        
        for(let value of values) {
            this.add(value)
        }
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
    
    size() {
        return this.heap.length
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }
    
    add(value) {
        this.heap.push(value)
        this.heapifyUp()
    }
    
    heapifyUp() {
        let index = this.size() - 1
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
        if (this.size() === 0) {
            return null
        }
        if (this.size() === 1) {
            return this.heap.pop()
        }
        
        const root = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
        return root
    }
    
    heapifyDown() {
        let index = 0
        const length = this.heap.length
        while (this.getLeftChildIndex(index) < length) {
            let smallest = this.getLeftChildIndex(index)
            let rightIndex = this.getRightChildIndex(index)
            if(rightIndex < length && this.heap[rightIndex] < this.heap[smallest]) {
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
    
    peek() {
        return this.heap[0]
    }
    
}

function solution(scoville, K) {    
    let scovHeap = new MinHeap(scoville)
    let count = 0
    
    while (scovHeap.peek() < K && scovHeap.size() >= 2) {
        let first = scovHeap.remove()
        let second = scovHeap.remove()
        scovHeap.add(first + (second * 2))
        count ++
    }
    if(scovHeap.peek() < K) {
        return -1
    }
    
    return count
}