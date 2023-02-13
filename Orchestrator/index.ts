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

    if (!context.df.isReplaying) {
        context.log.info(tasks.map((task) => ({
            iCompleted: task.isCompleted,
            isFaulted: task.isFaulted,
        })));
    }
});

export default orchestrator;
