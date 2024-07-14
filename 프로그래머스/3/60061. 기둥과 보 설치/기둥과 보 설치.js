function solution(n, build_frame) {
    let structures = new Set();

    // 구조물이 유효한지 검증하는 함수
    function isValid(structures) {
        for (let item of structures) {
            let [x, y, a] = item.split(',').map(Number);
            if (a === 0) { // 기둥
                if (y === 0 || // 바닥 위에 있거나
                    structures.has(`${x},${y-1},0`) || // 다른 기둥 위에 있거나
                    structures.has(`${x-1},${y},1`) || // 보의 오른쪽 끝에 있거나
                    structures.has(`${x},${y},1`) // 보의 왼쪽 끝에 있어야 함
                ) continue;
                return false;
            } else if (a === 1) { // 보
                if (structures.has(`${x},${y-1},0`) || // 한쪽 끝이 기둥 위에 있거나
                    structures.has(`${x+1},${y-1},0`) || // 한쪽 끝이 기둥 위에 있거나
                    (structures.has(`${x-1},${y},1`) && structures.has(`${x+1},${y},1`)) // 양쪽 끝이 다른 보와 동시에 연결되어 있어야 함
                ) continue;
                return false;
            }
        }
        return true;
    }

    // 명령어 처리
    for (let [x, y, a, b] of build_frame) {
        let key = `${x},${y},${a}`;
        if (b === 1) { // 설치
            structures.add(key);
            if (!isValid(structures)) structures.delete(key);
        } else { // 삭제
            structures.delete(key);
            if (!isValid(structures)) structures.add(key);
        }
    }

    // 결과를 배열로 변환하고 정렬
    let answer = Array.from(structures).map(e => e.split(',').map(Number));
    answer.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    return answer;
}
