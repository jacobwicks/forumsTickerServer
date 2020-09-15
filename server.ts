import * as http from "http";
import createExpressApp from "./CreateExpressApp";
import { eventRoute, routePath } from "./EventRoute";
import sendLatestPostToTicker from "./SendPostsToSubscribers";
import cors from "cors";

//questions
//how to deal with image posts
//how to deal with twitter embeds

//how to deal with the same post again
//keep a reference to the current postId
//if the postId is the same, then don't send the event
//the front end should just re-scroll the current event until it receives a new event

const port = process.env.PORT || 3001;

const app = createExpressApp();
app.use(cors());
app.get(routePath, eventRoute);
app.get(
  "/.well-known/acme-challenge/19YfKaHuPcqm5Wzb_9-YjpqhRtnDe8noD1b9lmGpyb8",
  function (req, res) {
    res.send(
      "19YfKaHuPcqm5Wzb_9-YjpqhRtnDe8noD1b9lmGpyb8.2_5YCRNZcJANiLHZm3EY7fx_kYiLlGS6MNPlVoxYCrc"
    );
  }
);

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
