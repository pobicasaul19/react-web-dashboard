interface ErrorMessage {
  [key: string]: Record<string, unknown>;
}

interface ErrorResponseData {
  data: ErrorMessage;
}

export interface ErrorType {
  response: {
    data: ErrorResponseData;
  };
}