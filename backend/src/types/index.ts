export type TokenResponse = {
  token: string;
};

export type LoggedEvent = {
  context: string;
  payload?: object;
  datetime: Date;
};
