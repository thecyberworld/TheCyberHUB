// import React, {useState} from 'react';
// import {addComment} from "../../../features/blogs/blogSlice";
// import {encodeURL} from "../../Blogs/util";
// import {useDispatch, useSelector} from "react-redux";
// import {useParams} from "react-router-dom";
//
// const AddComments = () => {
//     const dispatch = useDispatch();
//     const {blogs} = useSelector((state) => state.blogs);
//
//     const {title} = useParams();
//     const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase());
//
//     const [addCommentData, setAddCommentData] = useState({
//         comment: "",
//     });
//     const {comment} = addCommentData;
//
//     const onChange = (e) => {
//         setAddCommentData(e.target.value);
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         if (addCommentData) {
//             dispatch(addComment(addCommentData));
//             setAddCommentData({
//                 comment: ""
//             });
//         }
//     };
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="goal">Add Comment</label>
//
//                 <input type="text" name="comment" id={"comment"} value={comment} onChange={onChange}
//                        placeholder="Add a comment"/>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };
//
// export default AddComments;
