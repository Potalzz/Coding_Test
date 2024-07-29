/*
손님들의 주문에서 단품 메뉴의 조합을 통해 course에 있는 메뉴 개수로 조합 가능한 코스 요리들을 반환하라.
오름차순 반환. 내부 알파벳도 오름차순으로.

각 문자열마다 모든 조합을 기록한다.
course에 있는 숫자들을 순회하면서 해당하는 조합들을 모두 answer에 넣는다.

메뉴 조합 기록 로직
알파벳 사전 순으로 정렬시키면 "CA"처럼 뒤집어진 경우 고려할 필요 X 
완전탐색으로 모든 조합 사전에 기록.

*/

function solution(orders, course) {
    // 각 주문을 알파벳 순서로 정렬
    orders = orders.map((order) => order.split("").sort().join(""));

    const getCombinations = (array, length) => {
        const results = [];
        if (length === 1) return array.map((value) => [value]);

        array.forEach((currentValue, index, original) => {
            const remaining = original.slice(index + 1);
            const combinations = getCombinations(remaining, length - 1);
            const attached = combinations.map((combination) => [currentValue, ...combination]);
            results.push(...attached);
        });

        return results;
    };

    const menuDict = new Map();

    orders.forEach((order) => {
        course.forEach((length) => {
            const combinations = getCombinations(order.split(""), length);
            combinations.forEach((combination) => {
                const key = combination.join("");
                if (menuDict.has(key)) {
                    menuDict.set(key, menuDict.get(key) + 1);
                } else {
                    menuDict.set(key, 1);
                }
            });
        });
    });

    const result = [];

    course.forEach((length) => {
        const candidates = [];
        let maxCount = 0;

        menuDict.forEach((count, key) => {
            if (key.length === length && count >= 2) {
                if (count > maxCount) {
                    candidates.length = 0;
                    candidates.push(key);
                    maxCount = count;
                } else if (count === maxCount) {
                    candidates.push(key);
                }
            }
        });

        result.push(...candidates);
    });

    return result.sort();
}