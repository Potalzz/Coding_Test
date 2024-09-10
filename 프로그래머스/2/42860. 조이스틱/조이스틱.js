/*
알파벳 -> 아스키 코드
test.charCodeAt(0)

아스키 코드 -> 알파벳
String.fromCharCode(test2)

A는 65 Z는 90

각 단계에서 다음 알파벳으로 이동할 수 있는 최소 횟수 반환 (앞이동, 뒤이동 둘 중 하나)

A를 제외한 알파벳중 현재 index에서 거리가 가까운 곳으로 이동.
*/

function solution(name) {
  let answer = 0;
  let min_move = name.length - 1;

  [...name].map((n, i) => {
    answer += Math.min(n.charCodeAt() - 65, 91 - n.charCodeAt());
    let idx = i + 1;

    // 연속되는 A의 개수 count
    while (idx < name.length && name[idx] === 'A') {
      idx++;
    }

    min_move = Math.min(
      min_move,
      i * 2 + name.length - idx,
      i + 2 * (name.length - idx),
    );
  });

  return answer + min_move;
}