import { Model } from "objection";
import PostModel from "./PostModel.js";
import UserModel from "./UserModel.js";

class CommentModel extends Model {
  static tableName = "comments";
  static get relationMappings() {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
      posts: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    };
  }
}

export default CommentModel;
