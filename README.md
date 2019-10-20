## Sequelize Postgresql DD Express Sample Application

A sample express application used to verify dd-trace-js interactions with sequelize and postgresql

## setup and testing instructions
#### (tested on macosx)

- clone (or fork and then clone) this repository locally
- `cd sample_sequelize_express_application`
- ensure postgresql is running locally (a useful setup guide [here](`https://www.robinwieruch.de/postgres-sql-macos-setup`) )
- ensure postgres is listening at 127.0.0.1:5432 (or edit `server/config/config/json` as needed)
- `createdb todos-dev`
- the package.json defaults to testing against sequelize `v5`.
- `npm install -g sequelize-cli`
- `npm install`
- to test against sequelize `v4`, first `rm -r node_modules`, then in your package.json update dependancy to `"sequelize": "4.44.3"`, then re-run `npm install`
- `sequelize db:migrate`
- `sequelize db:seed:all`
- node `index.js`
- ensure your datadog agent is running and listening for traces locally at port 8126 (see details [here](https://docs.datadoghq.com/agent/basic_agent_usage/osx/?tab=agentv6#overview) )

- To test a `.all` or `.findAll` run `curl -v localhost:3000/`
- To test finding by id using the ORM run  `curl -v localhost:3000/orm/show?todoId=1`
- To test finding by id using a raw query, run  `curl -v localhost:3000/api/show?todoId=1`
- To test throwing an error using an invalid raw query run  `curl -v localhost:3000/api/show_null`

## Example

- with datadog tracer `0.15.1` enabled: 

```
return db.sequelize.query("SELECT * FROM todos where id='null'", {type: db.sequelize.QueryTypes.SELECT}).then(result => console.log("SUCCESS", result)).catch(err => console.log("ERROR", err))
```

`curl -v localhost:3000/orm/show_null`

- Output:

```
Executing (default): SELECT * FROM todos where id='null'
ERROR { SequelizeDatabaseError: invalid input syntax for integer... name: 'SequelizeDatabaseError' }...
```

### PG_STATS_ACTIVITY Output

Tested by running `curl -v localhost:3000/api/show_null` a once per second for a minute

`for i in {1..60}; do curl -s localhost:3000/api/show_null; date ; sleep 1; done` =>

- Output can be seen at [script_output.txt](./script_output.txt) . Via pg_stats_activity, active connections do not exceed 2 connections during test

![postgresql.connections](https://cl.ly/a9902103fc0c/Image%2525202019-10-20%252520at%2525206.23.15%252520PM.png)