Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function checkCollision(nodeArray) {
  let collidingNodes = [];
  console.log(nodeArray)
  for (let i = 0; i < nodeArray.length; i++){
    const node = nodeArray[i];
    const nodeBox = nodeArray[i].attrs;
    
    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBox.width;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBox.height;
    
    for (let j = 0; j < nodeArray.length; j++) {
      const otherNode = nodeArray[j];
      const otherBox = nodeArray[j].attrs;
      
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
          collidingNodes.push(otherNode);
          
        /* const existsInCollidingNodes = collidingNodes.findIndex((node) => node === otherNode );
          if(existsInCollidingNodes === -1)
          collidingNodes.push(otherNode);*/
        } 
      }
    }  
  }
  return collidingNodes;
}

export default function collide(nodeArray) {
  console.log(nodeArray)
  //const collidingNodes = checkCollision(nodeArray);
  const notColliding = nodeArray.diff(collidingNodes);
  
  notColliding.forEach((node) => {
    node.attrs.stroke = null;
  })
  
  console.log('colliding', collidingNodes);
  console.log('not colliding', notColliding);
}  