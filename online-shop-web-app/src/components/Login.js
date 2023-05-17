
function Login() {
  return (
    <div>
      <div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="text" />
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

  