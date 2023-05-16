
function Login(props) {
  return (
    <div>
      <h1>Hi {props.name}</h1>
      <div>
        <div>
          <label htmlFor="email">Email or username:</label>
          <input type="text" id="text" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div className="link">
          Don't have an account? Go to <a href="/registration">Registration</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

  