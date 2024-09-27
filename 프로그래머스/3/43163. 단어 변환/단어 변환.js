/*
주어진 텍스트를 목표 텍스트로 변환할 수 있는 최소 횟수 반환.
텍스트는 words안에 있는 텍스트로만 하나의 알파벳씩만 변환 가능.

제한 사항
주어진 단어의 길이 3 이상 10 이하
words.length <= 50

풀이
words배열을 그래프라고 생각해보자.
알파벳을 하나씩만 변경할 수 있으므로, 알파벳 한 개만 다른 노드끼리 연결되어 있는 형식이다.
결과적으로 target에 도달해야 하므로, target으로 갈 수 있는 최소 거리를 찾으면 된다.
만약 목표 지점까지의 그래프가 연결되어 있지 않거나, 목표 지점이 없다면 불가능이므로 0을 반환한다.

단어들 간의 방향 그래프를 만들고, BFS를 통해 해결할 것이다.
코드를 작성하기에 앞서, 시간복잡도를 벗어나지 않는지 확인해보자.

시간 복잡도 확인
단어의 개수를 n, 길이를 l로 가정하자.
우선 주어진 배열을 통해 인접 리스트로 만들 것이다.
인접 리스트를 만들기 위해서는, words의 문자를 서로 하나하나 비교해봐야 한다.
단어를 다른 단어와 비교하는데 걸리는 시간은 단어의 길이인 l.
해당 작업을 n개의 단어와 비교하면 하나의 단어에 nl의 시간이 소요된다.
이를 모든 단어에 각각 실행해주면 인접리스트 제작에는 O(n^2 * l)의 시간이 걸린다.

주어진 인접리스트를 통해 그래프의 모든 간선을 탐색하려면 O(V + E)의 시간이 걸리므로
충분히 가능하다.

의사 코드
1. 인접 리스트 만들기
    1.1 단어의 알파벳이 하나만 다른 경우만 연결
2. 인접 리스트를 통해 그래프 탐색하며 이동 횟수 저장
3. target을 만나면 최소 이동 횟수 반환
4. 인접 리스트를 모두 방문했는데 target을 만나지 못했을 경우, 0 반환.
*/

function solution(begin, target, words) {
    // 변환 불가능한 경우 0 반환
    if (!words.includes(target)) {
        return 0
    }
    
    const allWords = [begin, ...words]
    const adjList = buildAdjacencyList(allWords)
    const visited = new Set()
    const queue = [{ word : begin, depth : 0 }]
    
    while (queue.length > 0) {
        const { word, depth } = queue.shift()
        
        if (word === target) {
            return depth
        }
        
        adjList[word].forEach((neighbor) => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push({ word: neighbor, depth: depth + 1 });
            }
        });
    }
    
    return 0
    
    function buildAdjacencyList(wordsArray) {
        return wordsArray.reduce((acc, word) => {
            acc[word] = wordsArray.filter((otherWord) => (
                word !== otherWord && isTransformed(word, otherWord)
            ));
            return acc
        }, {});
    }
    
    function isTransformed(word1, word2) {
        const diffCount = word1.split('').reduce((count, char, i) => (
            char !== word2[i] ? count + 1 : count
        ), 0) 
            
        return diffCount === 1
    }
}
