import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostsAPI() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortName, setSortName] = useState("");
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

  const redirectViewDetail = useNavigate();

  useEffect(() => {
    let didCancel = false;
    axios({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts/`,
    })
      .then(({ data }) => {
        if (!didCancel) {
          setPosts(data);
          setLoading(false);
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
  }, []);

  const postFilter = posts.filter((post) =>
    JSON.stringify(post.title).includes(searchText)
  );

  const handleDelete = (post) => {
    axios.delete(apiEndPoint + "/" + post.id + post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const getPostsSorted = () => {
    if (sortName === null) return postFilter;
    if (sortName === "ASC")
      return postFilter.sort((postsA, postsB) => {
        if (postsA.title.toLowerCase() < postsB.title.toLowerCase()) return -1;
        if (postsA.title.toLowerCase() > postsB.title.toLowerCase()) return 1;
        return 0;
      });
    if (sortName === "DES")
      return postFilter.sort((posts, postsB) => {
        if (posts.title.toLowerCase() < postsB.title.toLowerCase()) return 1;
        if (posts.title.toLowerCase() > postsB.title.toLowerCase()) return -1;
        return 0;
      });
  };
  // eslint-disable-next-line no-unused-vars
  let postsSorted = getPostsSorted();

  const handleSortName = () => {
    setSortName((current) => {
      return current === "ASC" ? "DES" : "ASC";
    });
  };

  // const handlePopup = () =>{
    
  // }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p> {error}</p>;

  return (
    <div>
      <div className="input-group rounded mt-2">
        <input
          type="text"
          className="form-control rounded"
          value={searchText}
          placeholder="Search"
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col" onClick={handleSortName}>
              Title {sortName === "DES" ? <span>ASC</span> : <span>DES</span>}
            </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {postFilter.map((post) => {
            return (
              <tr key={post.id}>
                <td>{JSON.stringify(post.id)}</td>
                <td>{JSON.stringify(post.title)}</td>
                <td>
                {/* <button
                    className="btn btn-success"
                    onClick={() => {
                      handleDelete(post);
                    }}
                  >
                    Update
                  </button> */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      redirectViewDetail(`/postsAPI/detail/${post.id}`);
                    }}
                  >
                    Detail
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handlePopup();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
