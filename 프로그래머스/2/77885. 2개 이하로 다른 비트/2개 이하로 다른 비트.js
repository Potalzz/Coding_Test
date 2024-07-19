/*
주어진 수보다 크면서 비트 수가 2개 이하로 다른 수 중 가장 작은 수

로직
주어진 수의 2진수 가장 뒤에 있는 0이 1이 되는 값.
0이 없는 경우 맨 앞의 1이 0이 되고 앞에 1이 추가되는 2진수 값.

각 값을 2진변환하여 배열로 만들어준 뒤 pop해가며 비교.
pop할 때마다 1씩 더하면서 자릿수 기록.
*/
function solution(numbers) {
    let result = [];
    for (let number of numbers) {
        if (number <= 2) {
            result.push(number + 1)
            continue
        }
        // console.log(number.toString(2))
        let numArray = number.toString(2).split("")
        let index = 0
        while(numArray.length > 0) {
            if (numArray.pop() === "0") {
                if (index === 0) {
                    result.push(number + (2 ** index))
                } else {
                    result.push(number + (2 ** index) - (2 ** (index - 1)))
                }
                break
            }
            index ++
        }
        // 값을 모두 비교해도 0이 나오지 않는 경우
        if(numArray.length === 0) {
            result.push(number + (2 ** index) - (2 ** (index -1)))    
        }
        
    }
    
    // 숫자 테스트
//     for (let i = 0; i < numbers.length; i ++) {
//         console.log("10진수    ",numbers[i])
//         console.log("다음 10진수", result[i])
        
//         console.log("2진수    ",numbers[i].toString(2))
//         console.log("다음 2진수",result[i].toString(2))
//         console.log("---------------")
//     }
    
    
    // let num = 1
    // for (let i = 0; i < 15; i ++) {
    //     num = num * 10            
    // }
    // console.log(num)
    return result;
}