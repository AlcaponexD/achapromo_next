import posts from "../../posts.json";

const Post = (props) => {
  return (
    <div>
      <h1>{props.post.title}</h1>
      <p>{props.post.content}</p>
    </div>
  );
};

//Gera um props default que passa a query
Post.getInitialProps = ({ query }) => {
  return {
    post: posts[query.id],
  };
};

export default Post;
