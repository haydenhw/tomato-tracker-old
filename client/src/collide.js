export default function collide(targetNode, nodeData) {
  let collision = false;
  
  const nodeBox = targetNode;
  console.log(nodeBox)
  const nodeLeft = nodeBox.x;
  const nodeRight = nodeBox.x + nodeBox.width;
  const nodeTop = nodeBox.y;
  const nodeBottom = nodeBox.y + nodeBox.height;
  
  nodeData.forEach(otherBox => {
    
    if (targetNode.id !== otherBox.id) {
     //otherBox = this.getBBox();
      const otherLeft = otherBox.x;
      const otherRight = otherBox.x + otherBox.width;
      const otherTop = otherBox.y;
      const otherBottom = otherBox.y + otherBox.height;

      const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
      const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

      if (collideHoriz && collideVert) {
        collision = true; 
        console.log('intersection!')
      } 
   }  
  });  
          
  return collision;
}