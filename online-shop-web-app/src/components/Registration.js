
function Registration() {

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("pozdrav.")
  }
  return (
    <div>
      <div>
        <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="firstname">First name:</label>
          <input type="text" id="firstname" />
        </div>
        <div>
          <label htmlFor="lastname">Last name:</label>
          <input type="text" id="lastname" />
        </div>
        <div>
          <label htmlFor="birthdate">Birth date:</label>
          <input type="date" id="birthdate" />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" />
        </div>
        <div>
          <label htmlFor="type">Choose a type:</label>
          <select id="type" name="type">
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm password:</label>
          <input type="password" id="confirm-password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div className="link">
          <a href="/microsoft-signup">Or sign up with Facebook account</a>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;