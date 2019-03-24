const fetch = () => (
  jest.fn(() => Promise.resolve({ status: 'success!'}))
);

export default fetch;
