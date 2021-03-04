import { APIGatewayEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { getAllPeople, getAllTeams, getPerson } from "../../common/platform";
import { Team, Person, MinPerson, TeamsResponse, responses } from "../../common/interfaces";

export const handler: Handler = async ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {

  console.log("Incoming event:");
  console.log(JSON.stringify(event));

  try {

    // Switch to batch get.
    const teams: Team[] = await getAllTeams();
    const allPeople: Person[] = await getAllPeople();

    for await (const team of teams) {

      const people: string[] = team.people as string[];
      const minPeople: MinPerson[] = [];

      for await (const id of people) {
        // Get person
        let fullPerson: Person | undefined;

        allPeople.forEach((item) => {
          if (item.ID === id) fullPerson = item;
        });

        if (fullPerson) {

          const minPerson: MinPerson = {
            ID: fullPerson.ID,
            name: fullPerson.name,
            role: fullPerson.role,
            imageUrl: fullPerson.profilePicture,
            slackID: fullPerson.slackID.replace(" ", "-"),
            primaryTeam: fullPerson.primaryTeam
          };

          minPeople.push(minPerson);
        }
      }

      team.people = minPeople;
    }

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify({ data: teams } as TeamsResponse);

    return res;

  } catch (error) {

    console.log(error);
    const res: APIGatewayProxyResult = responses.serverError;
    res.body = error;

    return res;

  }
};
