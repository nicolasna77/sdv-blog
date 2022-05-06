import { Model } from "objection";
import CommentModel from "./CommentModel.js";
import UserModel from "./UserModel.js";

class PostModel extends Model {
  static tableName = "posts";

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    };
  }
}

export default PostModel;
