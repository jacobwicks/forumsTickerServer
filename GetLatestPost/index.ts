import getFirstNotStickiedThread from "../GetFirstNotStickiedThread";
import getLatestPostFromThread from "../GetLatestPostFromThread";
import { getForumUrl, forumIds } from "../Urls";
import { ForumIds } from "../types";

const getLatestPost = async (forum: keyof ForumIds) => {
  const forumUrl = getForumUrl(forumIds[forum]);
  const thread = await getFirstNotStickiedThread(forumUrl);
  console.log(thread);
  const post = await getLatestPostFromThread(thread);
  console.log(post);

  return post;
};

export default getLatestPost;
