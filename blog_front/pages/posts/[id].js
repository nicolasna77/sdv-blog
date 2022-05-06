import { Formik } from "formik";
import { useCallback, useEffect, useState, useContext } from "react";
import Button from "../../components/Button";
import FormField from "../../components/formField";
import Comment from "../../components/Comment";
import { makeClient } from "../../service/api";
import { useRouter } from "next/router";
import moment from "moment";
import AddEntryContext from "../../components/context/Context";
import Header from "../../components/Header";

const Id = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const { session, createComment } = useContext(AddEntryContext);
  const handleFormSubmit = useCallback(
    async ({ content }) => {
      await createComment(content, post.id, session.payload.user.id);
    },
    [createComment, post, session]
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    console.log(id);
    makeClient()
      .get("/posts/" + id)
      .then((res) => {
        setPost(res.data);
      });
  });

  if (!post) {
    return <div>Not found !</div>;
  }

  return (
    <div>
      <Header></Header>
      <div className=" mt-3  px-20">
        <div className="flex flex-col p-5 gap-y-2">
          <div className="border-b pb-10 border-gray-light">
            <div className="flex flex-col">
              <div className="text-4xl font-bold text-center">{post.title}</div>
              <div className="text-sm italic ">
                By {post.author.displayName}
              </div>
              <div className="text-right">
                {moment(post.createdAt).format("dddd DD MMMM yyyy - HH:mm")}
              </div>
            </div>
            <div className="text-xl px-20  text-center p-10">
              {post.content}
            </div>
          </div>
          <div>
            <div>Write a comment : </div>
            <Formik initialValues={{ content: "" }} onSubmit={handleFormSubmit}>
              {({ handleSubmit, isSubmitting, isValid }) => (
                <form className="flex gap-x-2" onSubmit={handleSubmit}>
                  <FormField name="content" />
                  <Button
                    disabled={isSubmitting && !isValid}
                    className="w-auto self-center"
                    type="submit"
                  >
                    Publish 📨
                  </Button>
                </form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col gap-y-8">
            <div className="text-3xl text-bold">Comments : </div>
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Id;
