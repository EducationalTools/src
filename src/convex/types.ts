export interface JWTPayload {
	email: string;
	avatar: string;
	lastname: string;
	username: string;
	verified: boolean;
	firstname: string;
	azp: string;
	exp: number;
	fva: number[];
	iat: number;
	iss: string;
	nbf: number;
	sid: string;
	sub: string;
	v: string;
	fea: string;
}
