function solution(m, n, board) {
    // Convert board to a 2D array
    let boardArray = board.map(row => row.split(''));

    // Helper function to check and mark blocks for removal
    function markRemovals() {
        const toRemove = Array.from({ length: m }, () => Array(n).fill(false));
        let found = false;

        for (let y = 0; y < m - 1; y++) {
            for (let x = 0; x < n - 1; x++) {
                const block = boardArray[y][x];
                if (block &&
                    block === boardArray[y][x + 1] &&
                    block === boardArray[y + 1][x] &&
                    block === boardArray[y + 1][x + 1]) {
                    toRemove[y][x] = toRemove[y][x + 1] = toRemove[y + 1][x] = toRemove[y + 1][x + 1] = true;
                    found = true;
                }
            }
        }

        return found ? toRemove : null;
    }

    // Helper function to remove marked blocks and return the count of removed blocks
    function removeBlocks(toRemove) {
        let count = 0;
        for (let y = 0; y < m; y++) {
            for (let x = 0; x < n; x++) {
                if (toRemove[y][x]) {
                    boardArray[y][x] = '';
                    count++;
                }
            }
        }
        return count;
    }

    // Helper function to drop blocks after removals
    function dropBlocks() {
        for (let x = 0; x < n; x++) {
            let emptyRow = m - 1;
            for (let y = m - 1; y >= 0; y--) {
                if (boardArray[y][x] !== '') {
                    if (y !== emptyRow) {
                        boardArray[emptyRow][x] = boardArray[y][x];
                        boardArray[y][x] = '';
                    }
                    emptyRow--;
                }
            }
        }
    }

    let totalRemoved = 0;

    while (true) {
        const toRemove = markRemovals();
        if (!toRemove) break;

        totalRemoved += removeBlocks(toRemove);
        dropBlocks();
    }

    return totalRemoved;
}

// 테스트 예제 실행
const m1 = 4;
const n1 = 5;
const board1 = ["CCBDE", "AAADE", "AAABF", "CCBBF"];
console.log(solution(m1, n1, board1)); // 14

const m2 = 6;
const n2 = 6;
const board2 = ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"];
console.log(solution(m2, n2, board2)); // 15
