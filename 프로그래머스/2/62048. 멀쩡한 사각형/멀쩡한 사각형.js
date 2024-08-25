/*
비율을 통해서 가장 작은 크기로부터 상수를 곱해서 구하기.

8:12 = 2:3
2:3인 크기의 사각형은 4개를 사용하지 못하므로 여기서 4배 해주면 16.

그럼 작은 크기의 사각형에서 사용하지 못하는 사각형의 개수를 어떻게 구하는가 ?

w * h - (w+h-최대공약수)

*/

function solution(w, h) {
    function gcd(w, h) {
        let a = Math.max(w,h)
        let b = Math.min(w,h)
        while (b !== 0) {
            let temp = b
            b = a % b   
            a = temp
        }
        return a
    }
    
    return (w * h - (w + h - gcd(w,h)))
}