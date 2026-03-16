function trap(height) {

    let n = height.length;
    let totalWater = 0;
    let waterArray = [];
    
    for (let i = 0; i < n; i++) {
    
    let leftMax = 0;
    for (let j = 0; j <= i; j++) {
    if (height[j] > leftMax) {
    leftMax = height[j];
    }
    }
    
    let rightMax = 0;
    for (let j = i; j < n; j++) {
    if (height[j] > rightMax) {
    rightMax = height[j];
    }
    }
    
    let water = Math.min(leftMax, rightMax) - height[i];
    
    if (water > 0) {
    totalWater += water;
    waterArray[i] = water;
    } else {
    waterArray[i] = 0;
    }
    
    }
    
    return {totalWater, waterArray};
    
    }
    
    
    
    function solve(){
    
    let input = document.getElementById("arrayInput").value;
    
    let height = input.split(",").map(Number);
    
    let result = trap(height);
    
    document.getElementById("result").innerText =
    "Water Stored : " + result.totalWater + " Units";
    
    draw(height, result.waterArray);
    
    }
    
    
    
    function draw(height, water){
    
    let container = document.getElementById("container");
    
    container.innerHTML="";
    
    let maxHeight = Math.max(...height.map((h,i)=>h+water[i]));
    
    for(let i=0;i<height.length;i++){
    
    let column = document.createElement("div");
    column.className="column";
    
    for(let j=0;j<maxHeight;j++){
    
    let cell = document.createElement("div");
    cell.className="cell";
    
    if(j < height[i]){
    cell.classList.add("block");
    }
    else if(j < height[i] + water[i]){
    cell.classList.add("water");
    }
    
    column.appendChild(cell);
    
    }
    
    container.appendChild(column);
    
    }
    
    }