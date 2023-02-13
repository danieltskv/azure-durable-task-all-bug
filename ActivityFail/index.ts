import { AzureFunction, Context } from "@azure/functions";

const activityFunction: AzureFunction = async function (context: Context): Promise<string> {
    throw new Error("ActivityFail");
};

export default activityFunction;
