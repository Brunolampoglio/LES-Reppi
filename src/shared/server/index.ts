import 'dotenv/config';

import '@shared/database';

import { server } from './socketio';

const port = process.env.PORT || 3333;

server.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`🚀 Server started on http://localhost:${port}`);
});
