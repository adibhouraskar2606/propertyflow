export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  validationErrors: Record<string, string>;

  constructor(response: ApiErrorResponse) {
    super(response.message);

    this.name = "ApiError";
    this.status = response.status;
    this.validationErrors =
      response.validationErrors;
  }
}