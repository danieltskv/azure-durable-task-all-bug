import { AzureFunction, Context } from "@azure/functions";

const activityFunction: AzureFunction = async function (context: Context, input: string): Promise<string> {
    context.log(`----- Running ActivityFail. Input: ${input}`)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Purposefully failed"));
        }, 100);
    })
};

export default activityFunction;
