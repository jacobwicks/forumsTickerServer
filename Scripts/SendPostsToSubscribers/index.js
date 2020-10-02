"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Events_1 = require("../Events");
const GetLatestPost_1 = tslib_1.__importDefault(require("../GetLatestPost"));
const forum = "cspam";
let currentPostId;
const sendLatestPostToTicker = async () => {
    const post = await GetLatestPost_1.default(forum);
    if (post) {
        if (currentPostId === post.id) {
            console.log("no new post");
        }
        else {
            currentPostId = post.id;
            Events_1.sendLogEvent(post);
        }
    }
};
exports.default = sendLatestPostToTicker;
//# sourceMappingURL=index.js.map