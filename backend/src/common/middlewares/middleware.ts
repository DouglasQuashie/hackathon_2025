import { ZodError, ZodSchema } from "zod";
import { Socket } from "socket.io";
import { NextFunction } from '@/common/interfaces/NextFunction';
import prisma from '@/common/db';


type MiddlewareFunction = {
	(body: unknown, schema: ZodSchema): void
}

export const DefaultMiddleware: MiddlewareFunction = (body, schema) => {
	return schema.parse(body);
}

export const WsMiddleware = (socket: Socket, data: unknown, schema: ZodSchema, middleware = DefaultMiddleware) => {
	try {
		middleware(data, schema)
		console.log("WsMiddleware try", data, schema);

		return true
	} catch (error) {
		// @ts-ignore
		console.log("WsMiddleware error", error.errors);


		socket.emit("error:message", error);
		return false;
	}
}

export const CheckBodyMiddleware = async (body: unknown, next: NextFunction, schema: ZodSchema, middleware = DefaultMiddleware) => {
	try {
		console.log(body);
		middleware(body, schema)
		await next();
	} catch (error) {
		if (error instanceof ZodError) {

			const formattedErrors: { [key: string]: string } = {};

			error.errors.forEach((err) => {
				const path = err.path.join(".") || "error";
				formattedErrors[path] = err.message;
			});
			throw new Error("Not well formated body", { cause: { status: 400, data: formattedErrors } })
		}
		throw new Error("Internal Server Error", { cause: 500 })
	}
}
