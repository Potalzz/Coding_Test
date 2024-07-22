/*
가장 큰 수가 될 수 있는 조건
k를 남아있는 횟수라고 생각하고, number의 앞에서부터 k만큼 쭉 간다.
중간에 9가 나타나면 해당 index앞까지 글자를 지운다.
9가 나타나지 않으면 k까지 중 가장 큰 수 앞까지 글자를 지운다.
지운 글자만큼 k에서 차감한다.

새로운 글자부터 다시 같은 로직으로 진행한다.
=> 이렇게 되면 1111111인 number와 111111이 주어졌을 때 시간 복잡도는
6! = 720

number의 최대 수가100만이 아니라, 최대 자릿수가 100만자리이다.
그럼 k의 최대값은 100만 - 1이므로
해당 로직으로는 처리 불가.

한 번 확인할 때 index를 지정해두고 삭제하는 방식으로 가야한다. 
*/

function solution(number, k) {
    let arr = []
    for(let i = 0; i < number.length; i ++) {
        while (k > 0 && arr.length > 0 && number[i] > arr[arr.length - 1]) {
            k --
            arr.pop()
        }
        arr.push(number[i])
    }
    arr.splice(arr.length - k, k)
    return arr.join("")
}