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
    // 시간을 분으로 변환하는 함수
    const toMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    // 퇴실 시간에 10분 추가하는 함수
    const addCleaningTime = (endTime) => endTime + 10;

    // 시간을 분 단위로 변환
    const bookings = book_time.map(([start, end]) => [toMinutes(start), addCleaningTime(toMinutes(end))]);

    // 입실 시간 순으로 정렬
    bookings.sort((a, b) => a[0] - b[0]);

    // 종료 시간을 저장하는 최소 힙
    const minHeap = [];

    // 최소 힙을 사용하여 객실 배정
    for (const [start, end] of bookings) {
        if (minHeap.length && minHeap[0] <= start) {
            // 가장 빨리 끝나는 예약을 제거
            minHeap.shift();
        }
        // 새로운 예약의 종료 시간을 추가
        minHeap.push(end);
        // 종료 시간을 정렬하여 가장 빨리 끝나는 시간을 항상 앞에 두도록 유지
        minHeap.sort((a, b) => a - b);
    }

    return minHeap.length;
}