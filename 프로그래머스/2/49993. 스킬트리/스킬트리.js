/*
유저들이 만든 스킬트리를 보고, 가능한 스킬트리 개수를 반환

주어진 자료의 크기가 크지 않은 걸로 보아 완전탐색 ?

스택을 활용한 풀이
스킬 트리에서 skill에 포함된 문자 말고는 필요 X
skill의 문자를 dict에 넣고, filter를 통해 skill_trees의 문자를 걸러냄.
걸러낸 스킬트리를 돌면서 dict와 비교해 순서가 역전되면 false.
*/
function solution(skill, skill_trees) {
    let result = 0;
    const skillDict = new Map()
    for(let i = 0; i < skill.length; i ++) {
        skillDict.set(skill[i], i)
    }
    
    for (let i = 0; i < skill_trees.length; i++ ) {
        let index = 0
        for(let j = 0; j < skill_trees[i].length; j ++) {
            let skill = skill_trees[i][j]
            
            if(skillDict.has(skill)) {
                if (skillDict.get(skill) === index) {
                    index += 1
                } else {
                    index = false
                    break
                }
                 
            }
        }
        if (index !== false) result += 1
    }
    
    return result;
}