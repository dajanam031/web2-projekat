import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="input-group">
          <label htmlFor="email">Email or username:</label>
          <input type="text" id="text" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <div className="input-group">
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

  