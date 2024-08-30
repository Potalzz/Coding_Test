/*
row column 방향으로 d거리 이하까지 k 칸마다 점을 찍음
점의 총 개수 반환

계산
최대 대각선의 길이를 a라고 가정한다. a = Math.floor(d / (k * 루트2))
해당 대각선 내에 있는 사각형의 점을 모두 포함시켜준다.
result += Math.floor((a+1) / k) * (a + 1)

다음 대각선의 점의 테두리에서 조건을 만족하는 점들을 모두 추가해준다.

*/
function solution(k, d) {
    let result = 0
    for (let x = 0; x <= d; x += k) {
        const max_y = Math.sqrt((d** 2) - (x ** 2))
        result += Math.floor(max_y / k) + 1
    }
    
    return result
}
    