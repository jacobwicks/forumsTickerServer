import { sendLogEvent } from "../Events";
import getLatestPost from "../GetLatestPost";

const forum = "cspam";

let currentPostId: number;

const sendLatestPostToTicker = async () => {
  const post = await getLatestPost(forum);
  if (post) {
    if (currentPostId === post.id) {
      console.log("no new post");
    } else {
      currentPostId = post.id;
      sendLogEvent(post);
    }
  }
};

export default sendLatestPostToTicker;
