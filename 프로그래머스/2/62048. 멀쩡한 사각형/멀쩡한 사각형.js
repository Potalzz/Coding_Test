/*
w,h의 최대값이 1억이므로, 해당 사각형 크기를 통해서 계산하는 것이 아니라,
해당 사각형과 같은 비율의 가장 작은 사각형을 통해서 배수로 구한다.

가장 작은 비율에서 가로 w 세로 h인 사각형의 사용할 수 없는 사각형의 개수는, (w + h - 1)
이 공식을 커지는 비율에도 똑같이 적용하기 위해 -1대신 w와h의 최대 공약수를 대입한다.
= (w + h - gcd(w,h))
총 넓이(w*h)에서 해당 개수만큼 빼주면 답이 나온다.
*/

function solution(w, h) {
    let a = Math.max(w, h)
    let b = Math.min(w, h)

    return w * h - (w + h - gcd(a, b))
}
  
function gcd(a, b) {
    while (b !== 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}