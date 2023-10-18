const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <div>
            <span>{comment.user.name}</span>
            <span>{comment.content}</span>
          </div>
        );
      })}
    </div>
  );
};
export default Comments;
