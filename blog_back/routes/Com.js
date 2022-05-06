import CommentsModel from "../models/CommentModel.js";

const commentsRoute = ({ app, db }) => {
  app.post("/comments", async (req, res) => {
    const {
      body: { content, userId, postId },
    } = req;
    try {
      const comment = await CommentsModel.query().insertAndFetch({
        content,
        userId,
        postId,
      });
      res.send(comment);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "oops." });
    }
  });
  app.get("/comments", async (req, res) => {
    res.send(await CommentsModel.query().withGraphFetched("author"));
  });
  app.get("/comments/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req;
    const query = CommentsModel.query().withGraphFetched("author");
    if (commentId) {
      query.findById(commentId);
    }
    res.send(await query);
  });
  app.delete("/comments/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req;
    const comment = await CommentsModel.query().findById(commentId);
    if (!comment) {
      res.status(404).send({ error: "not found" });
    }
    await comment.$query().delete();
    res.send(comment);
  });
};
export default commentsRoute;
