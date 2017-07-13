export const CHANGE_ACTIVE_EDIT_MENU = "CHANGE_ACTIVE_EDIT_MENU";
export function changeActiveEditMenu(parentId) {
  return {
    type: "CHANGE_ACTIVE_EDIT_MENU",
    parentId,
  }
}