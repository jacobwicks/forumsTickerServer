import { NextFunction, Request, Response } from "express";
import { makeEvent, makeNewClient, addClient, removeClient } from "../Events";

export const routePath = "/cspam/";

// Middleware for GET /events endpoint
const eventsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Mandatory headers and http status to keep connection open
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  //OK!
  res.writeHead(200, headers);

  const startEvent = makeEvent({ text: `Subscribed to cspam` });
  const stringData = JSON.stringify(startEvent);

  // After client opens connection send log event
  const data = `data: ${stringData}\n\n`;

  res.write(data);
  res.header("Access-Control-Allow-Origin", "*");
  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const newClient = makeNewClient(res);

  //add the new client to the array of clients
  addClient(newClient);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on("close", () => {
    console.log(`${newClient.id} Connection closed`);
    removeClient(newClient.id);
  });
};

export const eventRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    eventsHandler(req, res, next);
  } catch (error) {
    res.status(500);
    next(error);
  }
};
