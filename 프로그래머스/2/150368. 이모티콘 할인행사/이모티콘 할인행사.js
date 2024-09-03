/*
우선순위
1. 이모티콘 플러스 가입자 수 증가
2. 이모티콘 판매액 증가

할인율 10%, 20%, 30%, 40%

유저의 수가 최대 100명, 이모티콘의 개수가 최대 7개이므로 완전탐색으로 해결.
이모티콘이 7가지, 할인율의 종류 4가지의 모든 조합을 생성하고, 조합마다 비교

중복조합으로 이모티콘 할인율 설정하여 가입자 수, 판매 금액 비교하여 최대값 리턴
*/

function solution(users, emoticons) {
    
    return saleCombination(users, emoticons)
}

function salePrice(price, percentage) {
    return price * ((100 - percentage) / 100)
}

function saleCombination(users, emoticons) {
    let result = [0, 0]
    const arr = [10, 20, 30, 40]
    function dfs(sales, len) {
        if (sales.length === len) {
        const buyingPrice = new Array(users.length).fill(0)
            const tempResult = [0, 0]
            for (let i = 0; i < users.length; i ++) {
                let limit = users[i][0]
                for (let j = 0; j < len; j ++) {
                    if (limit <= sales[j]) {
                        buyingPrice[i] += salePrice(emoticons[j], sales[j])
                        if (buyingPrice[i] >= users[i][1]) {
                            break
                        }
                    }
                }
                if (buyingPrice[i] >= users[i][1]) {
                    buyingPrice[i] = Infinity
                }
            }
            for (let price of buyingPrice) {
                if (price === Infinity) {
                    tempResult[0] ++
                }
                else {
                    tempResult[1] += price
                }
            }
            
            if (tempResult[0] > result[0]) {
                result = tempResult
            }
            else if (tempResult[0] === result[0] && tempResult[1] > result[1]) {
                result = tempResult
            }
            return
        }
        
        for (let i = 0; i < arr.length; i ++) {
            sales.push(arr[i])
            dfs(sales, len)
            sales.pop()
        }
    }
    dfs([], emoticons.length)
    
    return result
}
