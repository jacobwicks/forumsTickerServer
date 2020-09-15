import { ForumIds } from "../types";

export const baseUrl = "https://forums.somethingawful.com";

export const forumIds: ForumIds = {
  cspam: 269,
  gbs: 273,
};

export const getUserProfileUrl = (profile: number) =>
  `${baseUrl}/member.php?action=getinfo&userid=${profile}`;

export const getForumUrl = (forumId: number) =>
  `${baseUrl}/forumdisplay.php?forumid=${forumId}`;

export const getThreadLastPostUrl = (threadId: number) =>
  `${baseUrl}/showthread.php?threadid=${threadId}&goto=lastpost`;
