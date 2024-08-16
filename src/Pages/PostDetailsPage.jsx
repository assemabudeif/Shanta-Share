import {useParams} from "react-router-dom";

function PostDetailsPage() {
  const { id } = useParams();

    return (
        <div>
            <h1>Post Details Page</h1>
            <p>Post ID: {id}</p>
        </div>
        );
}

export default PostDetailsPage;