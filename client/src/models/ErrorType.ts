interface ErrorMetadata {
  message: string;
}

interface ErrorResponseData {
  metadata: ErrorMetadata;
}

interface ErrorResponse {
  data: ErrorResponseData;
}

export interface ErrorType {
  response: ErrorResponse;
}