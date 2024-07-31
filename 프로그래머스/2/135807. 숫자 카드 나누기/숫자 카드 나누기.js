/*
둘 중 하나의 array의 모든 수를 나눌 수 있고,
다른 하나의 array의 모든 숫자를 나눌 수 없는 제일 큰 숫자 구하기.
한 쪽의 공약수이면서, 다른 쪽의 모든 약수에 포함되지 않는 값.

array의 최대 길이 50만 => n^2 미만으로 풀어야 함.

먼저 set로 중복된 숫자 제거.
한쪽의 최대 공약수로 반대쪽 나누고 가능하면 추가.

최대 공약수 구하기 (유클리드 호제법)
값이 하나가 남을 때 까지 연속된 2개의 값끼리 유클리드 호제법을 진행한다.

*/

function solution(arrayA, arrayB) {
    // 최대 공약수 구하는 함수
    const gcd = (num1,num2) => {
        let a = num1
        let b = num2
        if (num1 < num2) {
            a = num1
            b = num2
        }
    
        let r = 1
        while (r > 0) {
            r = a % b
            a = b
            b = r
        }
        return a
    }
    
    // 배열의 모든 값 중에서 최대 공약수 구하는 함수
    const gcdArray = (arr) => {
        let tempA = [...arr]
        let tempB = []
        while (true) {
            if (tempA.length % 2 !== 0) tempA.push(tempA[0])
            for (let i = 0; i < tempA.length - 1; i += 2) {
                tempB.push(gcd(tempA[i], tempA[i+1]))
            }
            if (tempB.length === 1) return tempB[0]
            if (tempB.length % 2 !== 0) tempB.push(tempB[0])
            tempA = []
            for (let i = 0; i < tempB.length - 1; i += 2) {
                tempA.push(gcd(tempB[i], tempB[i+1]))
            }
            if (tempA.length === 1) return tempA[0]
            tempB = []
        }
    }
    
    // 최대 공약수의 모든 약수 구하는 함수
    const divisors = (a) => {
        let result = []
        for (let i = 2 ; i <= Math.sqrt(a); i++) {
            if (a % i === 0) result.push(i)
        }
        result.push(a)
        return result
    }
    
    // 한 쪽의 최대 공약수의 약수들로 다른 배열의 모든 값들과 나눠지지 않는 값 찾는 함수
    const correctValue = (divisors,otherArr) => {
        // 최대공약수의 약수들의 모음인 divisors의 최대값부터 비교.
        for (let i = divisors.length - 1; i >= 0; i --) {
        let value = divisors[i]
            for (let i = 0; i < otherArr.length; i ++) {
                if (otherArr[i] % value === 0) break
                if (i === otherArr.length-1) return value
            }
        }
        return 0
    }
    
    // 메인 로직
    let gcdA = gcdArray(arrayA)
    let gcdB = gcdArray(arrayB)
    let divisorsA = divisors(gcdA)
    let divisorsB = divisors(gcdB)
    
    // 함수 test
    // console.log("GCD :", gcdArray(arrayA), gcdArray(arrayB))
    // console.log("divisors :", divisorsA,divisorsB)
    // console.log("correctValue :", correctValue(divisorsA,arrayB), correctValue(divisorsB,arrayA))
    
    return Math.max(correctValue(divisorsA,arrayB), correctValue(divisorsB,arrayA))
}