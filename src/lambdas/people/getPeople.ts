import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { getAllPeople, getPerson } from "../../common/platform";
import { Person, PersonResponse, PersonsResponse, responses } from "../../common/interfaces";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  console.log("Incoming event:");
  console.log(JSON.stringify(event));

  try {

    const persons: Person[] = await getAllPeople();

    persons.forEach((item) => {
      item.slackID = item.slackID.replace(" ", "-");
    });

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify({ data: persons } as PersonsResponse);

    return res;

  } catch (error) {

    console.log(error);
    const res: APIGatewayProxyResult = responses.serverError;
    res.body = error;

    return res;

  }
};
