
import { AzureFunction, Context } from "@azure/functions";

const activityFunction: AzureFunction = async function (context: Context, input: string): Promise<string> {
    context.log(`----- Running ActivitySuccess. Input: ${input}`)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hello ${input}!`);
        }, 100);
    })
};

export default activityFunction;
