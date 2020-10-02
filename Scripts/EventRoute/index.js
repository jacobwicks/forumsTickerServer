"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoute = exports.routePath = void 0;
const Events_1 = require("../Events");
exports.routePath = "/cspam/";
// Middleware for GET /events endpoint
const eventsHandler = async (req, res, next) => {
    // Mandatory headers and http status to keep connection open
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.flushHeaders();
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
    const newClient = Events_1.makeNewClient(res);
    //add the new client to the array of clients
    Events_1.addClient(newClient);
    // When client closes connection we update the clients list
    // avoiding the disconnected one
    req.on("close", () => {
        console.log(`${newClient.id} Connection closed`);
        Events_1.removeClient(newClient.id);
    });
};
exports.eventRoute = async (req, res, next) => {
    try {
        eventsHandler(req, res, next);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send;
    }
    catch (error) {
        res.status(500);
        next(error);
    }
};
//# sourceMappingURL=index.js.map