function solution(rows, columns, queries) {
    const a = [...Array(rows)].map((_, r)=>[...Array(columns)].map((_, c)=>r*columns+c+1));
    const mins = [];

    queries.map(query => {
        const [x1, y1, x2, y2] = query.map(_=>_-1);
        let min = a[x1][y1], tmp = a[x1][y1];

        for(let i=x1;i<x2;i++) {
            a[i][y1] = a[i+1][y1];
            min = Math.min(min, a[i][y1]);
        }
        for(let i=y1;i<y2;i++) {
            a[x2][i] = a[x2][i+1];
            min = Math.min(min, a[x2][i]);
        }
        for(let i=x2;i>x1;i--) {
            a[i][y2] = a[i-1][y2];
            min = Math.min(min, a[i][y2]);
        }
        for(let i=y2;i>y1;i--) {
            a[x1][i] = a[x1][i-1];
            min = Math.min(min, a[x1][i]);
        }
        a[x1][y1+1] = tmp;

        mins.push(min);
    })

    return mins;
}