/*
멜로디와 방송된 곡의 정보를 토대로 가장 근접한 노래를 반환해라.
곡의 길이는 #을 제외한 알파벳의 길이이다.
멜로디는 시작과 끝이 명확하게 주어지지 않은 큐의 형태로 이루어져 있다.
기억한 멜로디와 곡 정보에 들어있는 멜로디를 모두 큐의 형태로 변환해야 한다.

코드 정리
재생시간 >= 곡 길이 2배 일 경우 코드진행은 (코드 x 2)
곡 길이 <= 재생시간 < 곡 길이 2배일 경우 코드 진행은 곡 길이 + 코드.slice(0, (재생시간 - 곡 길이))
곡 길이보다 짧으면 코드.slice(0, 재생시간)

정리한 코드에서 멜로디가 존재하는 곡들의 index 저장하고, 길이가 가장 긴 곡 반환.

*/

function solution(m, musicinfos) {
    let result = []
    // 메인 로직
    for(let i = 0; i < musicinfos.length; i ++) {
        // 곡 별로 데이터 구분
        let song = musicinfos[i].split(",")
        // 코드를 재생 길이만큼 변환
        let code = codeToArray(song[3])
        let playTime = timeCheck(song)
        let songTime = code.length
        if (playTime >= songTime) {
            // 재생 시간 >= 곡 시간 * 2
            if (playTime >= songTime * 2) {
                let count = Math.floor(playTime / songTime)
                let baseCode = [...code]
                let r = playTime % songTime
                for (let i = 1; i < count; i ++) {
                    code = code.concat(baseCode)
                }
                code = code.concat(baseCode.slice(0,r))
            }
            // 곡 시간 <= 재생 시간 < 곡 시간 * 2
            else {
                code = code.concat(code.slice(0, playTime - songTime))
            }
        }
        // 재생 시간 < 곡 시간
        else {
            code = code.slice(0, playTime)
        }
        // 코드 포함 여부 확인
        let melody = codeToArray(m)
        let firstCode = melody[0]
        let isIncludes = false
        for (let i = 0; i < code.length; i ++) {
            if (code[i] === firstCode) {
                let idx = 1
                if (melody.length === 1) result.push([playTime,song[2]])  
                while (melody[idx] === code[i + idx]) {
                    idx ++
                    if (idx >= melody.length) {
                        isIncludes = true
                        break
                    }
                }
                if (isIncludes) {
                    result.push([playTime,song[2]])  
                    break
                }
            }
        }
    }
    // 결과 반환
    if (result.length === 0) return "(None)"
    
    let max = 0
    for(let i = 0; i < result.length; i ++) {
        if (result[i][0] > result[max][0]) {
            max = i
        }
    }

    return result[max][1]
}

// 재생시간 계산하는 함수
function timeCheck(arr) {
    let start = arr[0].split(":").map(el => parseInt(el))
    let end = arr[1].split(":").map(el => parseInt(el))
    let h = 0
    let m = 0
    // 시 단위 계산
    // 분 단위 계산
    if (start[1] > end[1]) {
        m = end[1] + (60 - start[1])
        h = (end[0] - start[0]) - 1
        
    } else {
        h = end[0] - start[0]
        m = end[1] - start[1]
        
    }
    
    return h * 60 + m
}

// 문자열 코드 배열로 변환하는 함수
function codeToArray(code) {
    let codeArr = []
    for(let i = 0; i < code.length; i ++) {
        if (code[i] === "#") codeArr[codeArr.length-1] += "#"
        else codeArr.push(code[i])
    }
    return codeArr
}
    