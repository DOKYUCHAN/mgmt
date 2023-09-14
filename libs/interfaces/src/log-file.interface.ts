interface ICreateErrorLog {
  request: {
    uri: string;
    method: string;
    body: any;
    params: any;
    query: any;
  };
  error: {
    response: any;
    value: any;
  };
}

export { ICreateErrorLog };
