/*
곡괭이당 광물 5개 캘 수 있고, 한 번 사용하면 연속해서 사용해야 함.
최소한의 피로도 반환.

곡괭이 개수 총 합 * 5 까지 광물 캘 수 있음.
해당 길이만큼 5씩 끊어가면서, 광물 포인트의 총 합이 높은 순으로 좋은 곡괭이 배치.
광물 포인트 : 다이아 : 25, 철 : 5, 돌 : 1

ex) 다이아 2개, 철 5개가 있을 떄 곡괭이 별 채광 피로도
다이아 : 2 , 5
철 : 10, 5
돌 : 50, 25

다이아 1 : 철5
다이아 : 1, 5
철 :    5, 5

로직
1. 곡괭이 개수를 토대로 최대로 캘 수 있는 개수를 정한다.
2. 5개씩 끊어가면서, 순서별 광물 포인트를 합산하여 index : 점수 형태의 객체로 저장한다.
3. 점수 순으로 오름차순 정렬하고, index : 곡괭이 종류 형태로 값을 변경한다.
4. minerals배열을 순회하면서 index에 맞는 곡괭이를 배정하고, 광물을 캐 피로도를 저장한다.

*/

function solution(picks, minerals) {
    // 1. 최대로 캘 수 있는 광물의 개수 구하기
    let maximum = picks.reduce((total, el) => total += el) * 5
    minerals = minerals.splice(0, maximum)
    
    const pointMap = new Map()
    let count = 0
    let point = 0 
    let index = 0
    let diaCount = 0
    // 2. 광물 포인트 index : point 형태로 저장하기
    for (let i = 0; i < minerals.length; i ++)
    {
        if (minerals[i] === "diamond")
        {
            point += 25
        }
        else if (minerals[i] === 'iron')
        {
            point += 5
        }
        else
        {
            point += 1    
        }
        count ++
        
        if (count === 5 || i === minerals.length - 1)
        {
            pointMap.set(index, point)
            count = 0
            point = 0
            index ++
        }
    }
    
    const sortedMap = new Map([...pointMap.entries()].sort((a,b) => b[1] - a[1]))
    // console.log(sortedMap)
    
    let pick = ''
    for (let key of sortedMap.keys())
    {
        if (picks[0])
        {
            pick = 'diamond'
            picks[0] --
        }
        else if(picks[1])
        {
            pick = 'iron'
            picks[1] --
        }
        else
        {
            pick = 'stone'
            picks[2] --
        }
        sortedMap.set(key, pick)
    }
    // console.log(sortedMap)
    
    let order = 0
    let energy = 0
    for (let i = 0; i < minerals.length; i += 5)
    {
        for (let j = i; j < i + 5; j ++)
        {
            if (j === minerals.length)
            {
                break
            }
            energy += mining(sortedMap.get(order), minerals[j])
        }
        order ++
    }
    
    return energy
}

function mining(pick, mineral)
{
    if (pick === 'diamond')
    {
        return 1
    }
    else if (pick === 'iron')
    {
        if (mineral === 'diamond')
        {
            return 5
        }
        else
        {
            return 1
        }
    }
    else {
        if (mineral === 'diamond')
        {
            return 25
        }
        else if (mineral === 'iron')
        {
            return 5
        }
        else
        {
            return 1
        }
    }
}