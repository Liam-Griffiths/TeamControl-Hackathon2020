import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { commitTeam } from "../../common/platform";
import { responses, Team } from "../../common/interfaces";

export const handler: Handler = async ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {

	console.log("Incoming event:");
	console.log(JSON.stringify(event));

	try {

		if (!event.body) return responses.badRequest;

		const team: Team = JSON.parse(event.body);
		await commitTeam(team);

		const res: APIGatewayProxyResult = responses.ok;

		return res;

	} catch (error) {

		console.log(error);
		const res: APIGatewayProxyResult = responses.serverError;
		res.body = error;

		return res;

	}
};
