import * as http from "http";
import createExpressApp from "./CreateExpressApp";
import path from "path";
import { eventRoute, routePath } from "./EventRoute";
import sendLatestPostToTicker from "./SendPostsToSubscribers";

//questions
//how to deal with image posts
//how to deal with twitter embeds

//how to deal with the same post again
//keep a reference to the current postId
//if the postId is the same, then don't send the event
//the front end should just re-scroll the current event until it receives a new event

const port = process.env.PORT || 3001;

const app = createExpressApp();

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get(routePath, eventRoute);

const server = http.createServer();
server
  .on("request", app)
  .on("listening", function () {
    //@ts-ignore
    const addr = this.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  })
  .listen(port);

const runAtInterval = () => {
  sendLatestPostToTicker();
  setTimeout(() => runAtInterval(), 15000);
};

runAtInterval();
