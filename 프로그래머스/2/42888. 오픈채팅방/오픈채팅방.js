/*
채팅방 입장과 닉네임 변경 기록이 담긴 배열이 주어질 때 최종 메시지를 출력해라.

입장, 퇴장 기록을 id에맞춰 기록해놓고, 마지막에 최종 id별 닉네임을 대입해서 출력한다.
명령을 배열로 나눈다.
입장 or 퇴장 시 messages에 get(id)형태로 기록하고 객체에 닉네임을 등록한다.
변경시 객체에 있는 닉네임을 변경한다.
*/

function solution(record) {
    let messages = [];
    const idMap = new Map()
    idMap.set("Enter", "님이 들어왔습니다.")
    idMap.set("Leave", "님이 나갔습니다.")
    record = record.map((el) => el.split(" "))
    for (let item of record) {
        let [act, id, name] = item
        if (act === "Enter"){
            idMap.set(id, name)
            messages.push([id,act])  
        } else if (act === "Leave") {
            messages.push([id,act])  
        } else {
            idMap.set(id, name)    
        }
        
    }
    let result = []
    for (let item of messages) {
        let finalName = idMap.get(item[0])
        let text = idMap.get(item[1])
        result.push(finalName + text)
    }
    return result;
}