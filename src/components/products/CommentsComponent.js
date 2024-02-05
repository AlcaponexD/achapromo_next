import { AiOutlineSend } from "react-icons/ai";
import { translateDatePtBr } from "../../utils/helper";
import axios from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import useAppData from "../../hooks/useAppData";


const CommentsComponents = ({ comments, product_id }) => {
  const { data, handleData } = useAppData();
  const [comentaries, setComment] = useState([]);


  const sortComments = (comments) => {
    console.log(comments)
    comments = comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setComment(comments)
  }

  const sendComment = (e) => {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    formJson.product_id = product_id;
    axios.post("/comments", formJson).then((response) => {
      let new_comment = response.data;
      new_comment.user = data.user

      const new_comments = [...comentaries, new_comment]
      sortComments(new_comments)
      form.reset();
    })
  }


  useEffect(() => {
    if (comments) {
      sortComments(comments)
    }
  }, [comments])

  return (
    <div className="p-4">
      <form className="relative m-2" method="POST" onSubmit={sendComment}>
        <textarea
          placeholder="Comente sua opnião sobre o produto"
          className="w-full h-[40px] p-2 text-dark-primary font-bold border border-dark-primary"
          name="content"
        ></textarea>
        <button className="p-2 bg-light-primary border rounded-sm absolute w-[30px] h-[40px] right-0 top-0">
          <AiOutlineSend></AiOutlineSend>
        </button>
      </form>
      <div className="m-2">
        <h3>Todos os comentarios ({comentaries ? comentaries.length : 0})</h3>
      </div>
      <div className="m-2 p-2rounded-sm">
        {comentaries
          ? comentaries.map((comment, index) => {
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
