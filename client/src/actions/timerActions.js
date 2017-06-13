export const DECREMENT_TIMER = "DECREMENT_TIMER";
export function decrementTimer() {
  return {
    type: "DECREMENT_TIMER"
  }
}

export const RESET_TIMER = "RESET_TIMER";
export function resetTimer() {
  return {
    type: "RESET_TIMER"
  }
}