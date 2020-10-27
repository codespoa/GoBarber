class AppError {
  public readonly errorMessage: string;
  public readonly errorCode: number;

  constructor(errorMessage: string, errorCode = 400) {
    this.errorMessage = errorMessage
    this.errorCode = errorCode
  }
}

export default AppError
