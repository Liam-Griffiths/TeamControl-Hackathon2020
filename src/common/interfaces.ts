import { APIGatewayProxyResult } from "aws-lambda";

export interface TeamsResponse {
    data: Team[];
}

export interface TeamResponse {
    data: Team;
}

export interface PersonsResponse {
    data: Person[];
}

export interface PersonResponse {
    data: Person;
}

export interface Team {
    ID: string;
    name: string;
    description: string;
    teamLeader: string;
    parent: string;
    children: string[];
    people: any[];
}

export interface ContactDetails {
    email: string;
    phoneNumber: string;
    mobileNumber: string;
    linkedin: string;
}

export interface Skill {
    name: string;
    rating: number;
}

export interface Key {
    ID: string;
}

export interface Person {
    ID: string;
    cognitoID: string;
    slackID: string;
    name: string;
    primaryTeam: string;
    preferredName: string;
    teams: any[];
    role: string;
    profilePicture: string;
    primaryOffice: string;
    employeeNumber: string;
    awards: any[];
    startDate: number;
    contactDetails: ContactDetails;
    bio: string;
    qualifications: string[];
    additionalRoles: any[];
    skills: Skill[];
    interests: any[];
}

export interface MinPerson {
    ID: string;
    name: string;
    role: string;
    imageUrl: string;
    slackID: string;
    primaryTeam: string;
}

export interface PeopleResponse {
    data: Person[];
}

interface Responses {
    [key: string]: APIGatewayProxyResult;
}

export const responses: Responses = {
    unauthorized: {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    badRequest: {
        statusCode: 400,
        body: JSON.stringify({ error: "Bad Request" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    notFound: {
        statusCode: 404,
        body: JSON.stringify({ error: "Not found" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    serverError: {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    ok: {
        statusCode: 200,
        body: JSON.stringify({ status: "OK" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }
};