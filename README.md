# Azure Durable Function issues

This is a minimal sample repo to highlight [2 issues](#issues).

## Running the project

To run the project:

```sh
npm i
```

If you use Azurite, create this file `local.settings.json` with:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  }
}
```

Start Azurite if needed: VSCode Command Palette -> "Azurite: Start".

Then in VSCode, go to the "Run and Debug" tab and click on "Attach to Node Functions".
Once the function is running, go to http://localhost:7071/api/HttpTrigger to start the orchestration.

## Project Structure

- The [HttpTrigger](HttpTrigger/index.ts) will be used to start the orchestration.
- The [Orchestrator](Orchestrator/index.ts) creates 4 activities using the fan out fan in pattern
- [ActivityFail](ActivityFail/index.ts) is an activity which will always fail
- [ActivitySuccess](ActivitySuccess/index.ts) is an activity which will always succeed after a small delay

## Issues

1. `context.df.Task.all(tasks)` throws as soon as one of the task fails and therefore, there is no guarantee that all the tasks are completed. Or at least no way to get the result of successful tasks.
2. Even though we use `if (!context.df.isReplaying)`, the result of the Orchestrator function is logged twice

## Solution

See the [solution](https://github.com/GP4cK/azure-durable-task-all-bug/tree/solution) branch.
