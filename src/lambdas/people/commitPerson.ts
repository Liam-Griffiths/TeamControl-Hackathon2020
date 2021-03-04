import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { commitPerson } from "../../common/platform";
import { Person, responses } from "../../common/interfaces";

export const handler: Handler = async ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {

	console.log("Incoming event:");
	console.log(JSON.stringify(event));

	try {

		if (!event.body) return responses.badRequest;

		const person: Person = JSON.parse(event.body);
		await commitPerson(person);

		const res: APIGatewayProxyResult = responses.ok;

		return res;

	} catch (error) {

		console.log(error);
		const res: APIGatewayProxyResult = responses.serverError;
		res.body = error;

		return res;

	}
};
