import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { getAllPeople, getBatchPersons, getBatchTeams, getPerson } from "../../common/platform";
import { Person, PersonResponse, PersonsResponse, responses, Team } from "../../common/interfaces";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  console.log("Incoming event:");
  console.log(JSON.stringify(event));

  try {

    if (!event.pathParameters || !event.pathParameters.ID) return responses.badRequest;

    const res: APIGatewayProxyResult = responses.ok;

    let persons: Person[] = [];
    const person: Person = await getPerson(event.pathParameters.ID);

    if (!person.teams || person.teams.length < 1) {
      res.body = JSON.stringify({ data: persons } as PersonsResponse);

      return res;
    }

    const teams: Team[] = await getBatchTeams(person.teams as string[]);

    for (const t of teams) {
      if (t.people.length > 0) {
        const p: Person[] = await getBatchPersons(t.people as string[]);
        if (p) persons = persons.concat(p);
      }
    }

    persons.forEach((item) => {
      item.slackID = item.slackID.replace(" ", "-");
    });

    res.body = JSON.stringify({ data: persons } as PersonsResponse);

    return res;

  } catch (error) {

    console.log(error);

    const res: APIGatewayProxyResult = responses.serverError;
    res.body = error;

    return res;

  }
};
