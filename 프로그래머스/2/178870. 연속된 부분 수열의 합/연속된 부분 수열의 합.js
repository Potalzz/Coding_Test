/*
비내림차순으로 정렬된 수열에서 다음 조건을 만족하는 부분 수열 찾기
1. 기존 수열에서 임의의 구간 AB를 포함해야 한다.
2. 부분 수열에 합은 K

만족하는 수열이 여러개인 경우 우선순위
1. 길이가 짧은 수열 
2. 앞쪽에서 시작하는 수열

자료구조 - 스택
필요한 자료
숫자를 담아줄 배열 stck
숫자의 합을 계산할 변수 sum
index를 저장할 배열 indexList

k를 만족할 때 까지, 맨 뒤에서부터 pop하며 비교 배열에 추가.
k를 만족할 경우 합이 k보다 작아질 때 까지 값을 sum에 더해준 뒤, stck을 pop해서 sum에서 뺴준다. 그리고, indexList[0]과 [1]을 1씩빼준다.
1. 합이 k보다 작아질 경우, indexList 빼준 값을 1씩 더해준다.
*/

function solution(sequence, k) {
    let stck = [];
    let indexList = [0,sequence.length-1]
    let sum = 0
    let front = 0
    for (let i = sequence.length - 1; i >= 0; i --) {
        let value = sequence.pop()
        stck.push(value)
        sum += value
        indexList[0] = i
        if (sum > k) {
            indexList[1] --
            sum -= stck[front]
            front++
        }
        
        if(sum === k) break
    }
    while (sequence.length > 0) {
        let value = sequence.pop()
        stck.push(value)
        
        sum -= (stck[front] - value)
        front ++
        if (sum < k) break
        indexList[1] --
        indexList[0] --
    }
    
    return indexList;
}