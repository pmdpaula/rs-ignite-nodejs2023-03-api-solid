export class LateCheckInValidationError extends Error {
  constructor() {
    super("Check-in can only be validate until 20 minutes after its creation");
  }
}
