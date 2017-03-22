export default function checkBounds (draggingModuleNode, boardGroup, topCollidingNode) {
  const boardNode = boardGroup.get('.board')[0];
  const module = draggingModuleNode.attrs;
  const board = boardNode.attrs;
  
  console.log(topCollidingNode)
  
  if(!topCollidingNode) {
    module.stroke = null;
  }
  
  board.stroke = null;
  
  const exceedsLeft = module.x < board.x
  const exceedsRight = module.x + module.width > board.x + board. width; 
  const exceedsTop = module.y < board.y
  const exceedsBottom = module.y + module.height > board.y + board. height; 
  
  if (exceedsLeft || exceedsRight || exceedsTop || exceedsBottom) {
    module.stroke = 'red';
    board.stroke = 'red';
  }
}