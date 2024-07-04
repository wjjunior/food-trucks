/* eslint-disable no-console */
import { exec } from 'child_process';

exec(
  `yarn typeorm migration:generate -d ./src/ormconfig.ts ./src/migrations/${process.argv[2]}`,
  (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);

    if (error) {
      console.log(`error: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
  },
);
