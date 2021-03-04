import { APIGatewayEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { getAllTeams, getPerson, getTeam } from "../../common/platform";
import { Team, Person, PersonsResponse, TeamResponse, responses } from "../../common/interfaces";

export const handler: Handler = async ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {

  console.log("Incoming event:");
  console.log(JSON.stringify(event));

  try {

    if (!event.pathParameters || !event.pathParameters.ID) return responses.badRequest;

    const team: Team = await getTeam(event.pathParameters.ID);
    console.log(team);

    const people: string[] = team.people as string[];
    console.log(people);

    const fullPeople: Person[] = [];
    for await (const id of people) {
      // Get person
      const fullPerson = await getPerson(id);
      console.log(fullPerson);

      fullPeople.push(fullPerson);
    }

    fullPeople.forEach((item) => {
      item.slackID = item.slackID.replace(" ", "-");
    });

    team.people = fullPeople;
    console.log(team);

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify({ data: team } as TeamResponse);

    return res;

  } catch (error) {

    console.log(error);
    const res: APIGatewayProxyResult = responses.serverError;
    res.body = error;

    return res;

  }
};
