const createClient = require('graphql-http');

const client = createClient({
    url: 'http://localhost:3005/graphql',
  });
  
  (async () => {
    let cancel = () => {
      /* abort the request if it is in-flight */
    };
  
    const result = await new Promise((resolve, reject) => {
      let result;
      cancel = client.subscribe(
        {
          query: '{ hello }',
        },
        {
          next: (data) => (result = data),
          error: reject,
          complete: () => resolve(result),
        },
      );
    });
  
    expect(result).toEqual({ hello: 'world' });
  })();