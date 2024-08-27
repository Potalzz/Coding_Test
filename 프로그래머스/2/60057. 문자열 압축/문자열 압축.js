/*
압축한 문자열 길이 반환.

확인 로직
문자를 stack에 추가해가면서 문자열의 길이가 짝수일 때마다 반씩 나눠서 두개가 일치하는지 확인 => 끊는 타이밍 못찾음
문자열 길이의 1/2크기 시작해 길이 1까지 줄여가면서 창문으로 확인후 압축. -> 문서에서 단어를 찾는 해쉬 searching알고리즘 활용

ababab

s의 최대 길이는 1000이므로, 
[1 3 5 7 ... n-1] 이므로 평균값 n/2만큼 (log n) - 1)번 비교 = O(n log n)

내가 한 방법이 더 효율적인 방법인데, 문제에서 원하는 조건과는 다르다.

문제에서 원하는 조건
길이를 몇으로 압축했을 때 가장 짧은지 비교하기. (압축할 수 있는 길이의 종류는 1가지.)
문자는 맨 앞에서부터 잘라야 한다.
*/

function solution(s) {
    if (s.length === 1) return 1
    let wLength = Math.floor(s.length / 2)
    let lengths = []
    while (wLength > 0) {
        let word = s
        let count = 1
        let deleteLength = 0
        let result = []
        for (let i = 0; i + wLength <= word.length; i += wLength) {
            let w = word.slice(i, i + wLength)
            let nextW = word.slice(i + wLength, i + wLength + wLength)
            if (w === nextW) {
                let startIdx = i + wLength
                while (w === nextW) {
                    count ++
                    startIdx += wLength
                    nextW = word.slice(startIdx, startIdx + wLength)
                }
                deleteLength += word.slice(i,startIdx).length
                result.push(count.toString() + w)
                i = startIdx - wLength
            }
            count = 1
        }
        lengths.push(word.length + result.join("").length - deleteLength)
        // console.log('result :', result, 'wLength :', wLength, 'word :', word, '길이 :', lengths[lengths.length-1])
        wLength --
        result = []
    }
    
    return Math.min(...lengths)
}