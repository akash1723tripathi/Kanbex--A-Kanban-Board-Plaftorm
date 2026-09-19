const autocannon = require('autocannon');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ti8DmK2BFTSlx06jg/NrGXSWeQC2uo8sf56Kny5nn/UR/H8c/Vcy8oyCTOhXFYST';
// Create a dummy token for user0
const token = jwt.sign({ id: 'user0_dummy_id', email: 'user0@example.com' }, JWT_SECRET, { expiresIn: '1h' });

const url = 'http://localhost:4000';

async function runTest(name, path, method = 'GET', body = null, connections = 10, duration = 30) {
  return new Promise((resolve, reject) => {
    const instance = autocannon({
      url,
      connections,
      duration,
      title: name,
      requests: [
        {
          method,
          path,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: body ? JSON.stringify(body) : undefined,
        }
      ]
    });

    autocannon.track(instance);

    instance.on('done', (result) => {
      resolve(result);
    });
    
    instance.on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting benchmarks...');
  // We'll run a shorter version since we are testing
  const res = await runTest('List Boards', '/api/v1/projects', 'GET', null, 50, 10);
  console.log('RPS:', res.requests.average);
  console.log('Latency p99:', res.latency.p99);
}

main().catch(console.error);
