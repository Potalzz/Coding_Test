/*
파일 정렬 방식을 문자 -> 숫자
파일은 HEAD, NUMBER, TAIL으로 이루어져 있음 (대소문자 구분 X)

정렬 기준
HEAD기준으로 사전순 정렬
HEAD부분이 같을 경우 숫자순으로 정렬(앞자리 0은 무시 )
HEAD, NUMBER 모두 동일할 경우 주어진 순서 유지

files의 최대 길이 1000
파일명은 최대 100글자

file을 head, number, tail로 나누어준다
for문을 통해 문자열마다 순회하면서 
sort에 인수로 조건문을 넣어서 정렬한다.

*/
function solution(files) {
    let newFiles = []
    
    for(let i = 0; i < files.length; i ++) {
        let file = files[i]
        let prevType = Number.isInteger(parseInt(file[0]))
        let currType = ""
        let seperateFile = []
        let strIdx = 0
        for(let j = 1; j < file.length; j++) {
            currType = Number.isInteger(parseInt(file[j]))
            if (j === file.length - 1) {
                if (seperateFile.length > 0) {
                    seperateFile.push(file.slice(strIdx, file.length))
                    newFiles.push(seperateFile)
                    break
                } else {
                    seperateFile.push(file.slice(0, j))
                    seperateFile.push(file[j])
                    newFiles.push(seperateFile)
                    break
                }
            }
            
            if(prevType === false && currType === true) {
                seperateFile.push(file.slice(0,j))
                strIdx = j
                // console.log(prevType,currType,j, seperateFile)
            } else if (prevType === true && currType === false) {
                seperateFile.push(file.slice(strIdx, j))
                seperateFile.push(file.slice(j, file.length))
                newFiles.push(seperateFile)
                break
            }
            
            prevType = currType
        }
    }
    
    newFiles.sort((a,b) => {
        if (a[0].toUpperCase() < b[0].toUpperCase()) return -1
        if (a[0].toUpperCase() > b[0].toUpperCase()) return 1
        
        if (parseInt(a[1]) < parseInt(b[1])) return -1
        if (parseInt(a[1]) > parseInt(b[1])) return 1
        return
    })
    // console.log(newFiles)
    newFiles = newFiles.map((el) => el.join(""))
    return newFiles
}