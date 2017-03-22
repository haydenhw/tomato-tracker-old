import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';


Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

export default function enforceRules(nodeArray, perimeterNode, ruleBreakingAction, ruleFollowingAction) {
  const collidingNodes = checkCollision(nodeArray);
  const outOfBoundsNodes = checkExceedsPerimter(nodeArray, perimeterNode);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes]
  const ruleFollowingNodes = nodeArray.diff(ruleBreakingNodes);
  
  ruleFollowingAction(perimeterNode)
  ruleBreakingNodes.forEach((node) => ruleBreakingAction(node));
  ruleFollowingNodes.forEach((node) => ruleFollowingAction(node));
}  