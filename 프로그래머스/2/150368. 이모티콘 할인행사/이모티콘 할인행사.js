/*
우선순위
1. 이모티콘 플러스 가입자 수 증가
2. 이모티콘 판매액 증가

할인율 10%, 20%, 30%, 40%

할인을 너무 많이 진행하면, 가입 안하고 이모티콘 구입.
이모티콘 가입자 수가 최대로 되면서 가장 낮은 할인율 설정.

데이터 구조
[이모티콘 가격 : 할인율] 형태의 table로 구성.

유저의 수가 최대 100명, 이모티콘의 개수가 최대 7개이므로 완전탐색으로 해결.
case 하나당 연산 횟수는 유저 수 X 이모티콘 개수
이모티콘이 7가지, 할인율의 종류가 4가지 이므로 
모든 경우의 수마다 비교

중복 가능, 순서 상관 O인 경우이므로 중복조합으로 이모티콘 할인율 설정.
*/

function solution(users, emoticons) {
    
    return saleCombination(users, emoticons)
}

function salePrice(price, percent) {
    return price * ((100 - percent) / 100)
}

function saleCombination(users, emoticons) {
    let result = [0, 0]
    const arr = [10, 20, 30, 40]
    function dfs(cur, len) {
        if (cur.length === len) {
        const money = new Array(users.length).fill(0)
            const temp = [0, 0]
            for (let i = 0; i < users.length; i ++) {
                let limit = users[i][0]
                for (let j = 0; j < len; j ++) {
                    if (limit <= cur[j]) {
                        money[i] += salePrice(emoticons[j], cur[j])
                    }
                }
                if (money[i] >= users[i][1]) {
                    money[i] = Infinity
                }
            }
            for (let price of money) {
                if (price === Infinity) {
                    temp[0] ++
                }
                else {
                    temp[1] += price
                }
            }
            
            if (temp[0] > result[0]) {
                result = temp
            }
            else if (temp[0] === result[0] && temp[1] > result[1]) {
                result = temp
            }
            // console.log(money)
            return
        }
        
        for (let i = 0; i < arr.length; i ++) {
            cur.push(arr[i])
            dfs(cur, len)
            cur.pop()
        }
    }
    dfs([], emoticons.length)
    
    return result
}
