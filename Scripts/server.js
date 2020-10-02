"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const CreateExpressApp_1 = tslib_1.__importDefault(require("./CreateExpressApp"));
const EventRoute_1 = require("./EventRoute");
const SendPostsToSubscribers_1 = tslib_1.__importDefault(require("./SendPostsToSubscribers"));
const cors_1 = tslib_1.__importDefault(require("cors"));
//questions
//how to deal with image posts
//how to deal with twitter embeds
//how to deal with the same post again
//keep a reference to the current postId
//if the postId is the same, then don't send the event
//the front end should just re-scroll the current event until it receives a new event
const port = process.env.PORT || 3001;
const app = CreateExpressApp_1.default();
app.use(cors_1.default());
app.get(EventRoute_1.routePath, EventRoute_1.eventRoute);
const server = http.createServer();
server
    .on("request", app)
    .on("listening", function () {
    //@ts-ignore
    const addr = this.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
})
    .listen(port);
const runAtInterval = () => {
    SendPostsToSubscribers_1.default();
    setTimeout(() => runAtInterval(), 15000);
};
runAtInterval();
//# sourceMappingURL=server.js.map