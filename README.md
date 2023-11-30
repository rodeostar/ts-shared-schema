# Shared Schema/SDK FileWatcher

1. Configure targets and input schema in sdk.config.json
2. Run `node sdk.watch`
3. As the input schema is updated, targets will receive updates
4. For vanilla JS set `js: true` in the sdk.config.json
5. For typescript apps, it is expected that the sdk/types imported will be built by that given app

## Run example targets:

Filewatcher runs separate from targets, so targets should be run in separate terminals.

1. run `node sdk.watch` in terminal 1
2. update a file in the schema, or just save a file with no changes
3. run `cd targets/express-ts && yarn && yarn start` in terminal 2
4. run `cd targets/react-ts && yarn && yarn start` in terminal 3, open `http://localhost:5174`
5. open `targets/vanilla-js/index.html` in the browser, no server necessary

When the schema is updated, all targets will receive an updated copy. The express endpoints are now strictly typed and the react UI conforms to the same schema, avoiding duplicate code and other side effects. Routes are defined in the shared schema, so changes to route urls require no updates to targets.
