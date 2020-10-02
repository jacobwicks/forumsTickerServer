"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GetFirstNotStickiedThread_1 = tslib_1.__importDefault(require("../GetFirstNotStickiedThread"));
const GetLatestPostFromThread_1 = tslib_1.__importDefault(require("../GetLatestPostFromThread"));
const Urls_1 = require("../Urls");
const getLatestPost = async (forum) => {
    const forumUrl = Urls_1.getForumUrl(Urls_1.forumIds[forum]);
    const thread = await GetFirstNotStickiedThread_1.default(forumUrl);
    console.log(thread);
    const post = await GetLatestPostFromThread_1.default(thread);
    console.log(post);
    return post;
};
exports.default = getLatestPost;
//# sourceMappingURL=index.js.map