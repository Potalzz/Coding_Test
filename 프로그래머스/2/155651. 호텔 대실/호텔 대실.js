/*
최소 객실의 수를 반환.
객실당 퇴실 10분 후 사용 가능.

필요한 자료
Map 입실시간 순으로 예약 순번 : 입실시간 형태의 inMap
Map 입실과 같은 형태로(퇴실시간은 10분 추가해서 담아주기) outMap
Array 방에 예약 순번으로 예약정보를 담는 rooms

방의 정보를 담은 배열 생성.
첫번째 예약을 방에 넣고, 다음 예약이 퇴실시간 이전이라면 새로 추가. 아니라면 교체.
방이 새로 추가될 경우 다음 예약부터 모든 방을 확인하면서 들어갈 수 있는지 판단. 아니면 추가.

방 배열의 길이반환. 
*/

function solution(book_time) {
    let inMap = new Map()
    let outMap = new Map()
    let rooms = new Array()
    // 시간을 문자열에서 숫자로 변환, 퇴실시간에 10분 더해줌.
    book_time.forEach((el) => {
        el[0] = parseInt(el[0].split(":").join(""))
        
        if (el[1][3] >= 5) {
            el[1] = parseInt(el[1].split(":").join("")) + 100 - 50
        }
        else {
            el[1] = parseInt(el[1].split(":").join("")) + 10
        }
    })
    rooms.push(0)
    // 입실 시간 순서대로 원본 배열 정렬
    book_time.sort((a,b) => a[0] - b[0])
    let test = new Array()
    // 입실,퇴실 시간별로 map생성.
    for (let i = 0; i < book_time.length; i ++) {
        inMap.set(i, book_time[i][0])
        outMap.set(i, book_time[i][1])
    }
    
    for(let i = 1; i < book_time.length; i ++) {
        let entrance = false
        for (let j = 0; j < rooms.length; j ++) {
            if (outMap.get(rooms[j]) <= inMap.get(i)) {
                rooms[j] = i
                entrance = true
                break
            }
        }
        if (!entrance) rooms.push(i)
    }
    // console.log("rooms : ", rooms)
    // console.log("원본 배열", book_time)
    // console.log("Map 데이터", inMap, outMap)
    return rooms.length
}