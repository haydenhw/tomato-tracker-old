export default function checkExceedsPerimeter (nodeArray, perimeterNode) {
  const perimeterBox = perimeterNode.attrs || perimeterNode;
  const outOfBoundsNodes = [];
  
  nodeArray.forEach((moduleNode, index) => {
    const moduleBox = moduleNode.attrs ? moduleNode.attrs : moduleNode;
    
    const exceedsLeft = moduleBox.x < perimeterBox.x;
    const exceedsRight = moduleBox.x + moduleBox.width > perimeterBox.x + perimeterBox.width; 
    const exceedsTop = moduleBox.y < perimeterBox.y;
    const exceedsBottom = moduleBox.y + moduleBox.height > perimeterBox.y + perimeterBox.height; 
    
    if (exceedsLeft || exceedsRight || exceedsTop || exceedsBottom) {
      outOfBoundsNodes.push(moduleNode);
    }
  });
  
  if (outOfBoundsNodes.length > 0) {
    outOfBoundsNodes.push(perimeterNode)
  }
  
  return outOfBoundsNodes;
}