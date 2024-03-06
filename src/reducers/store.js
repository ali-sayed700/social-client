import { configureStore } from "@reduxjs/toolkit";
import PostLoginSlice from "./auth/AuthApp";
import UploadPostSlice from "./post/Upload.Posts";
import GetTimeLineSlice from "./post/Get.TimeLine";
import GetLikesPostsSlice from "./post/Get.Likes";
import GetTimeLineUserSlice from "./post/Get.UserPosts";
import UpdateUsersSlice from "./user/UpdateUserInfo";
import GetOneUsersSlice from "./user/Get.SpecificUser";
import GetFollowingsUsersSlice from "./user/GetAllFollowing";
import GetAllUsersSlice from "./user/GetAllUser";
import UpdateFollowersSlice from "./user/UpdateFollowers";
import UpdateUnFollowersSlice from "./user/UpdateUnFollowers";
import UserChatsSlice from "./chat/GetUserChat.Chat";
import UserMessageSlice from "./message/GetUserMessage.Chat";
import CreateMessageMessageSlice from "./message/CreateUserMessage.Chat";
import GetCommentSlice from "./comment/GetComments";
import CreateCommentSlice from "./comment/CreateComment";
import GetOnePostsApiSlice from "./post/Get.SpecificPost.Reducer";
import GetPostsShareSlice from "./post/Create.Post";
import  GetTrendingSlice  from "./trending/Get.Trending";
import  GetUserSearchSlice  from "./search/Search.User";
import  CreateUserChatsSlice  from "./chat/CreateUserChat";
import GetSpecificChatApiSlice  from "./chat/getSpecificChat";
import  DeleteChatsSlice  from "./chat/DeleteChat";

let store = configureStore({
  reducer: {
    loginUser: PostLoginSlice,
    newPosts: UploadPostSlice,
    GetTimeLines: GetTimeLineSlice,
    likesClick: GetLikesPostsSlice,
    timelineUser: GetTimeLineUserSlice,
    updateUserVal: UpdateUsersSlice,
    getSpecificUser: GetOneUsersSlice,
    getAllFollowings: GetFollowingsUsersSlice,
    getAllUsers: GetAllUsersSlice,
    followUser: UpdateFollowersSlice,
    UnfollowUser: UpdateUnFollowersSlice,
    userschats: UserChatsSlice,
    createChatUser: CreateUserChatsSlice,
    GetSpecificChat: GetSpecificChatApiSlice,
    deleteChat: DeleteChatsSlice,
    usersMessage: UserMessageSlice,
    creatingMsg: CreateMessageMessageSlice,
    CreateComm: CreateCommentSlice,
    GetComment: GetCommentSlice,
    GetOnePost: GetOnePostsApiSlice,
    CreateShare: GetPostsShareSlice,
    GetTrending: GetTrendingSlice,
    GetUserSearch: GetUserSearchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
