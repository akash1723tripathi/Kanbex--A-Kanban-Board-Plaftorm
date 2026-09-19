import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 100 },
  ],
};

const BASE_URL = 'http://localhost:4000/api/v1'; // Assuming backend runs on 4000

export default function () {
  // We need to assume some auth or test endpoints. 
  // If the endpoints require auth, this script needs to login first.
  const res = http.get(`${BASE_URL}/health`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
