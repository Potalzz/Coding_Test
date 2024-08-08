/*


*/

function solution(number, k) {
    let arr = []
    for(let i = 0; i < number.length; i ++) {
        while (k > 0 && arr.length > 0 && number[i] > arr[arr.length-1]) {
            k --
            arr.pop()
        }
        arr.push(number[i])
    }
    arr.splice(arr.length - k, k)
    
    return arr.join("")
}