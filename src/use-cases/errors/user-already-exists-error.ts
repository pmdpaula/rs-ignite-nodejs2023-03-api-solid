export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Already exists an user with this e-mail.');
  }
}
