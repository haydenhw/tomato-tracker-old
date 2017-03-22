export default function collideFromSideBar(targetNode, otherNodes, boardGroup) {
  let collision = false;
  //console.log('hello')
  // console.log(targetNode.getParent().getParent().get(".boardGroup"))
  const nodeBox = targetNode.attrs;
  const board = boardGroup.attrs;
  
  const nodeLeft = nodeBox.x - board.x //+ nodeBox.width/2;
  const nodeRight = nodeBox.x - board.x + nodeBox.width;
  const nodeTop = nodeBox.y - board.y //+ nodeBox.hieght/2;
  const nodeBottom = nodeBox.y - board.y + nodeBox.height;
   console.log(nodeBox.x , board.x)
   console.log("nodeLeft", nodeLeft)
  nodeBox.stroke = null;
  
  otherNodes.forEach(otherNode => {
    const otherBox = otherNode.attrs;
    //console.log("other", otherBox.x)
    
     if (nodeBox !== otherBox) {
      otherBox.stroke = null;
      const otherLeft = otherBox.x;
      const otherRight = otherBox.x + otherBox.width;
      const otherTop = otherBox.y;
      const otherBottom = otherBox.y + otherBox.height;
      const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
      const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

      if (collideHoriz && collideVert) {
        collision = true; 
      
        nodeBox.stroke="red";
        otherBox.stroke="red";
      } 
   }  
  });  
          
  return collision;
}