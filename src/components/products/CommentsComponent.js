import { AiOutlineSend } from "react-icons/ai";
import { translateDatePtBr } from "../../utils/helper";
import axios from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import useAppData from "../../hooks/useAppData";


const CommentsComponents = ({ comments, product_id }) => {
  const { data, handleData } = useAppData();
  const [comentaries, setComment] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comentaries.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
      setComment(new_comments)
      form.reset();
    })
  }
  useEffect(() => {
    if (comments) {
      // Reset the state with the new comments instead of adding to existing state
      setComment(comments)
    }
  }, [comments])
  return (
    <div className="p-6 bg-white dark:bg-dark-sidebar rounded-lg shadow-sm">
      <form className="mb-8" method="POST" onSubmit={sendComment}>
        <textarea
          placeholder="Comente sua opinião sobre o produto"
          className="w-full min-h-[100px] p-4 text-sm text-dark-primary bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent resize-none transition-all duration-300 mb-3 shadow-sm"
          name="content"
        ></textarea>
        <div className="flex justify-end">
          <button className="p-2 px-4 bg-light-primary text-white rounded-lg hover:bg-light-secondary transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <span>Enviar</span>
            <AiOutlineSend />
          </button>
        </div>
      </form>
      <div className="mb-6 flex items-center justify-between border-b dark:border-gray-700 pb-3">
        <h3 className="text-xl md:text-2xl font-semibold text-light-primary">Comentários ({comentaries ? comentaries.length : 0})</h3>
      </div>
      <div className="space-y-4">
        {currentItems
          ? currentItems.map((comment, index) => {
            return (
              <div
                key={index}
                className="p-4 bg-light-background dark:bg-dark-background rounded-lg transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-800 hover:border-light-primary/30 mb-3"
              >
                <div className="flex items-start gap-3">
                  <img className="w-10 h-10 rounded-full object-cover" src={comment.user.avatar} alt={comment.user.name} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-dark-primary hover:text-light-primary transition-colors duration-300">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {translateDatePtBr(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            );
          })
          : null}
        <div className="flex justify-end mt-8">
          <ul className="inline-flex gap-2">
            {Array.from({ length: Math.ceil(comentaries.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${currentPage === index + 1 ? 'bg-light-primary text-white shadow-md' : 'border border-gray-300 dark:border-gray-600 hover:bg-light-primary/10 hover:border-light-primary'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default CommentsComponents;
