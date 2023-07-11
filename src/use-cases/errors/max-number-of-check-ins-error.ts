export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("Max number of dayly check-ins reached.");
  }
}
