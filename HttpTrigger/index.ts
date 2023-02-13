import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as df from 'durable-functions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const client = df.getClient(context);
    const instanceId = await client.startNew('Orchestrator');

    context.res = {
        status: 202,
        body: instanceId
    };

};

export default httpTrigger;