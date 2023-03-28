class ErrorWithStatus extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class AccountNotFoundError extends ErrorWithStatus {
  constructor() {
    super(404, "Account not found");
  }
}

export class AccountAlreadyConfirmedError extends ErrorWithStatus {
  constructor() {
    super(409, "Account already confirmed");
  }
}

export class AccountNotConfirmedError extends ErrorWithStatus {
  constructor() {
    super(409, "Account not confirmed");
  }
}

export class AccountAlreadyExistsError extends ErrorWithStatus {
  constructor() {
    super(409, "Account already exists");
  }
}

