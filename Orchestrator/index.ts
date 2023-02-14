import * as df from "durable-functions";

const orchestrator = df.orchestrator(function* (context) {
    const tasks = [
        context.df.callActivity("ActivityFail"),
        context.df.callActivity("ActivitySuccess", "World"),
    ];

    try {
        yield context.df.Task.all(tasks);
    } catch (err) {
        // We don't care
    }

    // Yield all tasks to make sure they have all completed.
    for (let task of tasks) {
        try {
            yield task;
        } catch (err) {
            // We don't care
        }
    }

    if (!context.df.isReplaying) {
        // For some reason, this will be printed twice and ActivitySuccess will
        // neither be completed or false and its result will be undefined. 
        context.log.info(tasks.map((task) => ({
            iCompleted: task.isCompleted,
            isFaulted: task.isFaulted,
        })));
    }
});

export default orchestrator;
