import { AiOutlineSend } from "react-icons/ai";
import { translateDatePtBr } from "../../utils/helper";

const CommentsComponents = ({ comments }) => {
  return (
    <div className="p-4">
      <form className="relative m-2">
        <textarea
          placeholder="Comente sua opnião sobre o produto"
          className="w-full h-[40px] p-2 text-dark-primary font-bold border border-dark-primary"
        ></textarea>
        <button className="p-2 bg-light-primary border rounded-sm absolute w-[30px] h-[40px] right-0 top-0">
          <AiOutlineSend></AiOutlineSend>
        </button>
      </form>
      <div className="m-2">
        <h3>Todos os comentarios ({comments ? comments.length : 0})</h3>
      </div>
      <div className="m-2 p-2rounded-sm">
        {comments
          ? comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col my-2 p-2 bg-light-background dark:bg-dark-background "
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-base text-dark-primary">
                      {comment.user.name}
                    </span>
                    <span className="text-[11px]">
                      {translateDatePtBr(comment.created_at)}
                    </span>
                  </div>
                  <span>{comment.content}</span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default CommentsComponents;
