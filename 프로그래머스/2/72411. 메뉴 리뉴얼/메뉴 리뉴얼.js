/*
손님들의 주문에서 단품 메뉴의 조합을 통해 course에 있는 메뉴 개수로 조합 가능한 코스 요리들을 반환하라.
오름차순 반환. 내부 알파벳도 오름차순으로.

각 문자열마다 모든 조합을 기록한다.
course에 있는 숫자들을 순회하면서 해당하는 조합들을 모두 answer에 넣는다.

메뉴 조합 기록 로직
알파벳 사전 순으로 정렬되어 있으므로, "CA"처럼 뒤집어진 경우 고려할 필요 X 
완전탐색으로 모든 조합 사전에 기록.

*/

function solution(orders, course) {
  const ordered = {};
  const candidates = {};
  const maxNum = Array(10 + 1).fill(0);
  const createSet = (arr, start, len, foods) => {
    if (len === 0) {
      ordered[foods] = (ordered[foods] || 0) + 1;
      if (ordered[foods] > 1) candidates[foods] = ordered[foods];
      maxNum[foods.length] = Math.max(maxNum[foods.length], ordered[foods]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      createSet(arr, i + 1, len - 1, foods + arr[i]);
    }
  };

  orders.forEach((od) => {
    // arr.sort는 기본적으로 사전식 배열
    const sorted = od.split('').sort();
    // 주문한 음식을 사전순으로 배열해서 문자열을 만든다.
    // course에 있는 길이만 만들면 된다.
    course.forEach((len) => {
      createSet(sorted, 0, len, '');
    });
  });

  const launched = Object.keys(candidates).filter(
    (food) => maxNum[food.length] === candidates[food]
  );

  return launched.sort();
}