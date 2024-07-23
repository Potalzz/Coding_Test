function solution(n) {
    let result = '';

    while (n > 0) {
        let remainder = n % 3;
        n = Math.floor(n / 3);

        if (remainder === 0) {
            remainder = 4;
            n -= 1;
        }

        result = remainder + result;
    }

    return result;
}