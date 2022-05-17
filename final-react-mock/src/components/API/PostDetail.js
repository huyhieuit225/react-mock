import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiEndPoint = `https://jsonplaceholder.typicode.com/posts`;
  const { id } = useParams();
  const postPage = useNavigate();

  useEffect(() => {
    let didCancel = false;
    axios({
      method: "get",
      url: `${apiEndPoint}/${parseInt(id)}`,
    })
      .then(({ data }) => {
        if (!didCancel) {
          setPosts(data);
        }
      })
      .catch((err) => {
        if (!didCancel) {
          console.error(err);
          setLoading(false);
          setError("Something went wrong!");
        }
      });
    return () => {
      didCancel = true;
    };
  }, [apiEndPoint, id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p> {error}</p>;
  return (
    <div>
      <button
        className="btn btn-success mb-4"
        onClick={() => postPage("/postsAPI")}
      >
        Back to Post
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          <tr key={posts.id}>
            <td>{JSON.stringify(posts.id)}</td>
            <td>{JSON.stringify(posts.title)}</td>
            <td>{JSON.stringify(posts.body)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PostDetail;
