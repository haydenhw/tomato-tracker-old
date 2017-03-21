export default function collide(targetNode, otherNodes) {
  let result = null;
  
  const nodeBox = targetNode.attrs;
  const nodeLeft = nodeBox.x;
  const nodeRight = nodeBox.x + nodeBox.width;
  const nodeTop = nodeBox.y;
  const nodeBottom = nodeBox.y + nodeBox.height;
  
  nodeBox.stroke = null;
  
  otherNodes.forEach(otherNode => {
    const otherBox = otherNode.attrs;
    
     if (nodeBox !== otherBox) {
      otherBox.stroke = null;
      const otherLeft = otherBox.x;
      const otherRight = otherBox.x + otherBox.width;
      const otherTop = otherBox.y;
      const otherBottom = otherBox.y + otherBox.height;
    
      const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
      const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

      if (collideHoriz && collideVert) {
      nodeBox.stroke = "red";
      otherBox.stroke = "red";
    
      result = targetNode; 
      } 
   }  
  });  
          
  return result;
}