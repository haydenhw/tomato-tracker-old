Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


function checkCollision(otherNodes) {
  let collidingNodes = [];
  
  for (let i = 0; i < otherNodes.length; i++){
    const node = otherNodes[i];
    const nodeBox = otherNodes[i].attrs;
    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBox.width;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBox.height;
    
    for (let j = 0; j < otherNodes.length; j++) {
      
      const otherNode = otherNodes[j];
      const otherBox = otherNodes[j].attrs;
       if (nodeBox !== otherBox) {
        //otherBox.stroke = null;
        const otherLeft = otherBox.x;
        const otherRight = otherBox.x + otherBox.width;
        const otherTop = otherBox.y;
        const otherBottom = otherBox.y + otherBox.height;
      
        const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
        const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

        if (collideHoriz && collideVert) {
          
          otherBox.stroke = "red";
          const existsInCollidingNodes = collidingNodes.findIndex((node) => node === otherNode );
          
          if(existsInCollidingNodes === -1)
          collidingNodes.push(otherNode);
        } 
      }
    }  
  }
  return collidingNodes;
}


export default function collide(targetNode, otherNodes, callback) {
  
  const collidingNodes = checkCollision(otherNodes);
  const notColliding = otherNodes.diff(collidingNodes);
  
  /*notColliding.forEach((node) => {
    node.attrs.stroke = null;
  })*/
  
  console.log('colliding', collidingNodes);
  console.log('not colliding', notColliding);
  
  
}  
          
  
