export default function collide(targetNode, otherNodes, callback) {
  let result = null;
  
  //for (let i = 0; i < otherNodes.length-1; i++)
  
  const nodeBox = targetNode.attrs;
  const nodeLeft = nodeBox.x;
  const nodeRight = nodeBox.x + nodeBox.width;
  const nodeTop = nodeBox.y;
  const nodeBottom = nodeBox.y + nodeBox.height;
  
  nodeBox.stroke = null;
  
  for (let j = 0; j < otherNodes.length-1; j++) {
    const otherBox = otherNodes[j].attrs;
    
     if (nodeBox !== otherBox) {
      otherBox.stroke = null;
      const otherLeft = otherBox.x;
      const otherRight = otherBox.x + otherBox.width;
      const otherTop = otherBox.y;
      const otherBottom = otherBox.y + otherBox.height;
    
      const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
      const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

      if (collideHoriz && collideVert) {
        
        //callback(nodeBox, otherBox) 
        nodeBox.stroke = "red";
        otherBox.stroke = "red";
        
      }
    }
  }  
}  
          
  
