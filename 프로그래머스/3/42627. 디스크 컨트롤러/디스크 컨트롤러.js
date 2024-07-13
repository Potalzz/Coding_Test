/*
요청부터 작업 완료까지의 시간중에 가장 낮은 평균값을 반환해라.

처리 로직
현재 작업 시작이 가능한 작업 중 소요시간이 짧은 작업 실행.

작업이 실행될 때 마다 현재 시간을 업데이트하고, 현재 시간보다 작업 요청시점이 작은 값들을 heap에 넣는다.
heap에서 값을 빼서, 현재 시간 업데이트하고 총 작업시간 업데이트.

풀이를 마치고
처음에는 heap에서 한번에 정렬하고 순차적으로 빼면서 처리해야 하는줄 알고 헷갈렸다.
먼저 작업이 들어온 순으로 정렬하고 조건을 만족(현재 실행 가능)하는 작업들만 heap에 넣어서 새로운 조건에 따라 정렬한 뒤,
가장 우선순위에 있는 작업을 실행하면 되는 것이였다. 문제를 풀어보며 heap을 상황에 맞춰 바꿔 구현해보면서 즐겁게 풀 수 있었다.
*/
class MinHeap {
    constructor() {
        this.heap = []
    }
    
    getParent(index) {
        return Math.floor((index - 1) / 2)
    }
    
    getLeftChild(index) {
        return index * 2 + 1
    }
    
    getRightChild(index) {
        return index * 2 + 2
    }
    
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
    }
    
    add(value) {
        this.heap.push(value)
        this.heapifyUp()
    }
    
    heapifyUp() {
        let index = this.size() - 1
        while(index > 0) {
            let parentIndex = this.getParent(index)
            if (this.heap[index][1] < this.heap[parentIndex][1]) {
                this.swap(index, parentIndex)
                index = parentIndex
            } else {
                break
            }
        }
    }
    
    runTask() {
        if (this.size() === 0) return null
        if (this.size() === 1) return this.heap.pop()
        
        const root = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
        return root
    }
    
    heapifyDown() {
        const length = this.size()
        let index = 0
        while (this.getLeftChild(index) < length) {
            let smallest = this.getLeftChild(index)
            let rightIndex = this.getRightChild(index)
            if(rightIndex < length && this.heap[rightIndex][1] < this.heap[smallest][1]) {
                smallest = rightIndex
            }
            if (this.heap[index][1] > this.heap[smallest][1]) {
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
        
    size() {
        return this.heap.length
    }
}

function solution(jobs) {
    let totalSpendTime = 0 // 총 소요시간
    let currTime = 0 // 현재 시간
    let totalTask = jobs.length // 작업의 개수
    let taskCount = totalTask // 남아있는 작업 개수 확인 용도
    let taskHeap = new MinHeap() // 실행가능 작업 리스트
    
    // pop으로 비교하기 위해 요청순서대로 역정렬
    jobs.sort((a,b) => b[0] - a[0])
    
    // 작업 처리 로직
    while (taskCount > 0) {
        // 현재 실행 가능한 작업들을 heap에 담아줌
        while (jobs.length > 0 && jobs[jobs.length-1][0] <= currTime) {
            taskHeap.add(jobs.pop())
        }
        // 실행 가능한 작업이 있는 경우 작업 실행하고 시간 업데이트
        if(taskHeap.size() > 0) {
            let [startPoint, spendTime] = taskHeap.runTask()
            currTime += spendTime
            totalSpendTime += currTime - startPoint
            taskCount --
        // 현재 실행 가능한 작업이 없는 경우 가장 가까운 작업을 heap에 담아줌
        } else {
            taskHeap.add(jobs.pop())
            currTime = taskHeap.peek()[0]
        }
    }
    
    return Math.floor(totalSpendTime / totalTask)
}

