rm -rf demo
mkdir demo
cd demo
tsc ../../cli.ts
node ../../cli.js ../../examples/json/example1.json
cd ../