/*
fees에 담긴 데이터
기본시간, 기본 요금, t, m (t분당 m원 부여)

records에서 데이터 추출
enterMap에 입차 데이터 번호(string): 시간(int)으로 map객체 구성
carOut에 출차 데이터 [번호(string),시간(int)]으로 2중 배열로 구성
carOut 돌면서 객체에 대조해서 요금 계산.
계산이 완료된 차량은 Map객체에서 삭제.
대조가 끝나고 객체에 남은 값은 23:59 출차이므로, 해당 시간에 맞춰 요금 계산

요금 계산을 누적주차시간으로 계산하므로, 누적 시간을 담아 둘 공간이 필요.
*/
function solution(fees, records) {
    let result = [];
    let enterMap = new Map(), timeMap = new Map(), carData = [], currTime = 0, charge = 0
    
    // 시간 저장
    const accuTime = (carNum, outTime) => {
        let hour = 0, minute = 0, totalMinute = 0, charge = fees[1]
        hour = parseInt(outTime[0]) - parseInt(enterMap.get(carNum)[0])
        minute = parseInt(outTime[1]) - parseInt(enterMap.get(carNum)[1])
        if (minute < 0) {
            hour -= 1
            minute += 60
        }
        totalMinute = (hour * 60 + minute)
        return totalMinute
    }
    
    // 출차, 입차 데이터 저장
    records.forEach((car) => {
        carData = car.split(" ")
        currTime = carData[0].split(":")
        // 입차하는 차량 데이터 저장
        if (carData[2] === "IN") {
            enterMap.set(carData[1], currTime)
            // 출차하는 차량 시간 누적
        } else {
            // 누적시간
            charge = accuTime(carData[1], currTime)
            // 차 별로 시간 누적
            timeMap.set(carData[1], (timeMap.get(carData[1]) + charge) || charge)
            // 출차 처리
            enterMap.delete(carData[1])
        }
    })
    
    // 출차하지 않은 차 시간 누적
    if (enterMap.size > 0) {
        for (let number of enterMap.keys()) {
            charge = accuTime(number, ["23", "59"])    
            timeMap.set (number, (timeMap.get(number) + charge) || charge)
        }
    }
    
    let timeOfCar = []
    for (let [key, value] of timeMap.entries()) {
        timeOfCar.push([key, value])        
    }
    let fee = 0
    timeOfCar.sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach((totalMinute) => {
        fee = fees[1]
        totalMinute = totalMinute[1] - fees[0]
        if (totalMinute > 0) {
            fee += totalMinute % fees[2] === 0 ? (totalMinute / fees[2]) * fees[3] :
            (Math.floor(totalMinute / fees[2]) + 1) * fees[3]
        }
        result.push(fee)
    })

    return result;
    
}