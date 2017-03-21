export default function collideFromSideBar(targetNode, otherNodes, boardGroup, isModuleDropping) {
  let collision = false;
  console.log('hello from side collide')
  const nodeBox = targetNode.attrs;
  const board = boardGroup.attrs;
  
  const nodeLeft = nodeBox.x - board.x;
  const nodeRight = nodeBox.x - board.x + nodeBox.width;
  const nodeTop = nodeBox.y - board.y;
  const nodeBottom = nodeBox.y - board.y + nodeBox.height;
  nodeBox.stroke = null;
  
  otherNodes.forEach((otherNode, index) => {
    const otherBox = otherNode.attrs;
    
     if (nodeBox !== otherBox) {
      otherBox.stroke = null;
      const otherLeft = otherBox.x;
      const otherRight = otherBox.x + otherBox.width;
      const otherTop = otherBox.y;
      const otherBottom = otherBox.y + otherBox.height;
      
      const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
      const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;
      const notIdenticalCoordinates = !(nodeLeft === otherLeft && nodeTop === otherTop);
      console.log('from collision', isModuleDropping);
      if (collideHoriz && collideVert && notIdenticalCoordinates) {
        collision = true; 
        nodeBox.stroke="red";
        otherBox.stroke="red";
      } 
    }
  });
          
  return collision;
}