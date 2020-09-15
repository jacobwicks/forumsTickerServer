import { NextFunction, Request, Response } from "express";
import { makeEvent, makeNewClient, addClient, removeClient } from "../Events";
import { LogPost } from "../types";

export const routePath = "/cspam/";

// Middleware for GET /events endpoint
const eventsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Mandatory headers and http status to keep connection open
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.flushHeaders();

  //OK!
  //res.writeHead(200, headers);

  const startEvent = {
    body: "Subscribed to CSPAM",
  };

  const stringData = JSON.stringify(startEvent);

  // After client opens connection send log event
  const data = `data: ${stringData}\n\n`;

  res.write(data);
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
    //eventsHandler(req, res, next);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send;
  } catch (error) {
    res.status(500);
    next(error);
  }
};
