import React, { useState } from "react";
import Pagination from "react-js-pagination";
const List = () => {
  const [state, setState] = useState({
    friends: [
      { name: "Rahul Gupta", isFav: true },
      { name: "Shivangi Sharma", isFav: true },
      { name: "Akash Singh", isFav: false },
      { name: "Ravi", isFav: false }
    ],
    payload:[{
      name: "",
    isFav: true
    }]
  });
  const [friend, setFriend] = useState([...state.friends]);
  //const [payload, setPayload] = useState({
    //name: "",
   //isFav: true
  //});
 const [name, setName] = useState("");
  const fav = (name) => {
    setState({
      ...state,
      friends: state.friends.map((item, ind) => {
        if (item.name === name) {
          item.isFav = !item.isFav;
        }
        return item;
      })
    });
  };
  const handleInput = (e) => {
    const { value, id } = e.target;
        setState({ ...state, payload: { ...state.payload, [id]: value } })
    setName(e.target.value);
  };
  const addFriend = (e) => {
    const { friends,payload } = state
    e.preventDefault();
   friend.push(payload);
    console.log(payload);
    setFriend(friend);
    setState({ ...state, friends: [...friends,payload] });
    setName("");
  };
  const deleteFriend = (name) => {
    let x = window.confirm("Are you sure to delete?");
    if (x) {
     setFriend(friend.filter((item, ind) => item.name !== name));
      setState({
        friends: state.friends.filter((item, ind) => item.name !== name)
      });
    }
  };
  const search = () => {
    setState({
      ...state,
      friends: friend.filter((item) =>
        item["name"].toLowerCase().includes(name.toLowerCase())
      )
    });
  };
  const handleSort = () => {
    const {friends}=state;
    setState({
      friends: friends.sort((a, b) =>
        a.isFav > b.isFav ? -1 : b.isFav > a.isFav ? 1 : 0
      )
    });
  };
  const friendsPerPage = 4;
  const [activePage, setCurrentPage] = useState(1);
  const indexOfLastFriend = activePage * friendsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
  const currentFriends = state.friends.slice(
    indexOfFirstFriend,
    indexOfLastFriend
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <div>
        <h6 className="title">
          <b>Friends List</b>
        </h6>
        <form onSubmit={(e) => addFriend(e)}>
          <div className="row">
            <div className="col-sm-9 ml-2">
              <input
                type="text"
                onChange={(e) => handleInput(e)}
                className="form-control"
                id="name"
                value={name}
                placeholder="Enter your friend's name"
              />
            </div>
            <div className="col-sm-1">
              <i className="fa fa-search" onClick={() => search()}></i>
            </div>
          </div>
        </form>
        <br />
      </div>
      <hr style={{ margin: 0 }} />
      <div>
        {currentFriends.map(({ name, isFav }, index) => (
          <div className="row">
            <div className="col-sm h-25 mt-1 ml-2">
              <b>{name}</b>

              <pre>is your friend</pre>
            </div>
            <div className="col-sm mt-3 icons">
              {isFav ? (
                <i className="fa fa-star" onClick={() => fav(name)}></i>
              ) : (
                <i className="far fa-star" onClick={() => fav(name)}></i>
              )}

              <i className="fa fa-trash" onClick={() => deleteFriend(name)}></i>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <button onClick={() => handleSort()}>Sort By Fav</button>
        </div>
        <div className="col">
          <div className="pagination">
            <Pagination
              className="paginationbuttons"
              activePage={activePage}
              itemsCountPerPage={4}
              totalItemsCount={state.friends.length}
              pageRangeDisplayed={7}
              FirstLastPages
              hideNavigation
              onChange={(pageNumber) => handlePageChange(pageNumber)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default List;
