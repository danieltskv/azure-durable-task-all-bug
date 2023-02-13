
import { AzureFunction, Context } from "@azure/functions";

const activityFunction: AzureFunction = async function (context: Context): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hello ${context.bindings.name}!`);
        }, 100);
    })
};

export default activityFunction;
