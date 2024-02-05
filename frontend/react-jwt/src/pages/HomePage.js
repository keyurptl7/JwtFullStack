function HomePage() {
  const loggedIn = true;
  const onLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    //redirect
    window.location.href = "/";
  };
  const username = localStorage.getItem("username");
  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onLogoutClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
        {loggedIn ? <div>Your email address is {username}</div> : <div />}
      </div>
    </div>
  );
}

export default HomePage;
