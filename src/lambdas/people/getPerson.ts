import { APIGatewayEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { MinPerson, Person, PersonResponse, PersonsResponse, responses, Team } from "../../common/interfaces";
import { getAllTeams, getPerson, getTeam } from "../../common/platform";

export const handler: Handler = async ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {

  console.log("Incoming event:");
  console.log(JSON.stringify(event));

  try {

	if (!event.pathParameters || !event.pathParameters.ID) return responses.badRequest;

    const person: Person = await getPerson(event.pathParameters.ID);
    person.slackID = person.slackID.replace(" ", "-");

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify({ data: person } as PersonResponse);

    return res;

  } catch (error) {

    console.log(error);
    const res: APIGatewayProxyResult = responses.serverError;
    res.body = error;

    return res;

  }
};
