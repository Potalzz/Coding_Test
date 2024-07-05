/*
문제
좌측 상단 칸에서 우측 하단 칸까지의 최단 경로를 구해라.(0은 장애물)
도달할 수 없으면 -1 return

아이디어
최단경로 ? BFS를 통한 풀어보자.
현재 위치를 지정한다.
동 -> 남 -> 서 -> 북 우선 순으로 이동한다.
목표지점에 도착하면 현재까지 이동한 칸과 그동안의 값 중 낮은 값으로 저장.
*/
function solution(maps) {
 const dx =[-1,0,1,0];
 const dy =[0,1,0,-1];
 

 const visited = Array.from({length:maps.length},()=> new Array(maps[0].length).fill(false),);
  //게임맵과 똑같은 5x5지만 값은 0로 채워진 배열 을 생성합니다. 
 const dist = Array.from({length:maps.length},()=> new Array(maps[0].length).fill(0),);
  const q =[]; 
  q.push([0,0]);
  visited[0][0]=true;
  //도착지의 최단거리는 1입니다.
  dist[0][0]=1;
  
  while(q.length){ 
  const[curX,curY]=q.shift(); 
  

  for(let i =0; i<4; i++){ 
  const x= curX+dx[i];   
  const y= curY+dy[i];
  

  if(x>-1&&x<maps.length&&y>-1&&y<maps[0].length){
  //처음 방문했을때 -> visited[x][y]이 false 일 때 
    if(maps[x][y]===1&&!visited[x][y]){  
     q.push([x,y]);
        visited[x][y]=true;
        
        //먼저 탐색하지 않았다면 
        if(dist[x][y]===0 ){
           dist[x][y]=dist[curX][curY]+1;
        }
       
    };
   };
   
   
  };
  
  }
  //아예 탐색 성공 못했을 때는 -1 아닐때는 좌표최단거리 주기 
   return dist[maps.length - 1][maps[0].length - 1]
    ? dist[maps.length - 1][maps[0].length - 1]
    : -1;
}