const Post = (props) => {
  const { post } = props;

  return (
    <div>
      <div key={post.id} className="block mt-20 px-40 ">
        <div className="pb-8 border-b border-gray-light">
          <div className="text-4m font-bold">{post.title}</div>
          <div className="text-sm italic"> by {post.author.displayName}</div>
          <div>{post.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
