// eslint-disable-next-line @typescript-eslint/no-var-requires
const spawn = require('child_process').spawn;

const migrationName = process.argv[2];

if (!migrationName) {
  console.log('you need to specify migration name');
  process.exit(1);
}

const generate = spawn('node', [
  '-r',
  'ts-node/register',
  '-r',
  'tsconfig-paths/register',
  './node_modules/typeorm/cli.js',
  '--dataSource',
  './src/database/dataSource.ts',
  'migration:generate',
  '--pretty',
  'true',
  `./src/database/migrations/${process.argv[2]}`,
]);

generate.stdout.on('data', function (data) {
  console.log(data.toString());
});

generate.stderr.on('data', function (data) {
  console.log(data.toString());
});

generate.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});
