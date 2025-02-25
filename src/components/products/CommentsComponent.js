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
    <div className="p-4 bg-white dark:bg-dark-sidebar rounded-lg shadow-sm">
      <form className="mb-6" method="POST" onSubmit={sendComment}>
        <textarea
          placeholder="Comente sua opinião sobre o produto"
          className="w-full min-h-[80px] p-4 text-sm text-dark-primary bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent resize-none transition-all duration-200 mb-2"
          name="content"
        ></textarea>
        <div className="flex justify-end">
          <button className="p-2 bg-light-primary text-white rounded-lg hover:bg-light-secondary transition-colors duration-200 flex items-center gap-2">
            <span>Enviar</span>
            <AiOutlineSend />
          </button>
        </div>
      </form>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Comentários ({comentaries ? comentaries.length : 0})</h3>
      </div>
      <div className="space-y-4">
        {currentItems
          ? currentItems.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="p-4 bg-light-background dark:bg-dark-background rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src={comment.user.avatar} alt={comment.user.name} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-dark-primary">
                          {comment.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {translateDatePtBr(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        <div className="flex justify-end mt-6">
          <ul className="inline-flex gap-1">
            {Array.from({ length: Math.ceil(comentaries.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${currentPage === index + 1 ? 'bg-light-primary text-white' : 'border border-gray-300 dark:border-gray-600 hover:bg-light-primary/10'}`}
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
