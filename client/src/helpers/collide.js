import checkExceedsPerimter from './checkExceedsPerimeter';


Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function checkCollision(nodeArray) {
  let collidingNodes = [];
  
  nodeArray.forEach((node) => {
    const nodeBox = node.attrs;
    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBox.width;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBox.height;
    
    nodeArray.forEach((otherNode) => {
       const otherBox = otherNode. attrs;
       
        if (nodeBox !== otherBox) {
          const otherLeft = otherBox.x;
          const otherRight = otherBox.x + otherBox.width;
          const otherTop = otherBox.y;
          const otherBottom = otherBox.y + otherBox.height;
         
          const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
          const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

          if (collideHoriz && collideVert) {
          
            collidingNodes.push(otherNode);
          
           // prevents duplicates in collidingNodes array but is commented out at the moment to favor performance 
         /* const existsInCollidingNodes = collidingNodes.findIndex((node) => node === otherNode );
           if(existsInCollidingNodes === -1)
           collidingNodes.push(otherNode);*/
         } 
       }
     });
  });
  
  return collidingNodes;
}

export default function enforceRules(nodeArray, perimeterNode, ruleBreakingAction, ruleFollowingAction) {
  const collidingNodes = checkCollision(nodeArray);
  const outOfBoundsNodes = checkExceedsPerimter(nodeArray, perimeterNode);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes]
  const ruleFollowingNodes = nodeArray.diff(ruleBreakingNodes);
  
  ruleFollowingAction(perimeterNode)
  ruleBreakingNodes.forEach((node) => ruleBreakingAction(node));
  ruleFollowingNodes.forEach((node) => ruleFollowingAction(node));

}  