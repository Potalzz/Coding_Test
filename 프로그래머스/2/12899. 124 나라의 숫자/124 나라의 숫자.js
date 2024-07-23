/*
11  4
12  5
14  6
21  7
22  8
24  9
41  10
42  11
44  12
111 13
112 14
114 15
121 16
122 17
124 18
141 19
142 20
144 21
211 22
212 23
214 24
221 25
222 26
224 27
241 28
242 29
244 30
.
.
.
1111 40
3^n을 더해줄 때마다 앞자리가 1씩 추가된다.
3^0 = 1자리
3^0 + 3^1 = 2자리
3^0 + 3^1 + 3^2 = 3자리

주어진 값에서 3의 n제곱만큼 n을 1씩 늘려주며 빼준다.
값을 0미만으로 만들기 이전의 n이 해당 수의 자리수이다.
3^n에서 n+1이 뒤에서 n번째 자리수의 숫자에 해당한다.
남은 값을 다시 가까운 3^n값으로 나누고 몫이 1이면 1칸 올려주고, 2이면 2칸 올려준다.
해당 나머지로 계속해서 앞의 자리부터 숫자를 변경해준다.
*/

function solution(n) {
    let number = n
    let index = 0
    let array = []
    // 자릿수 계산
    while (true) {
        number -= (3 ** index)
        if (number < 0) {
            number += 3 ** index
            break
        }
        index ++
    }
    
    // 자리수에 맞춰 초기값 채워주기
    for(let i = 0; i < index; i++) {
        array.push(1)
    }
    let length = array.length
    
    // 메인 로직. 앞에서부터 자릿수마다 숫자 업데이트 해주기
    while (number >= 3) {
        let tempNum = number
        index = 0
        
        while (tempNum >= 3) {
            tempNum = tempNum / 3
            index ++
        }
        // 자릿수에서 올려줘야 할 수 게산
        let value = Math.floor(number / (3 ** index))
        
        // 해당 자릿수 수 계산해주기
        array[length - (index + 1)] = value * 2
        
        number -= (3 ** index) * value
    }
    if (number > 0) {
        array[length-1] = number * 2
    }
    // console.log(array, number)
    
    return array.join("")
}