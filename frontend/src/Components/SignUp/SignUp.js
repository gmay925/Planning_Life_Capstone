import './SignUp.css';

const SignUp = () => (
<div className="container">
  <h1>Sign Up</h1>
  <form>
  <div className="form-control">
      <input type="text" required />
      <label>Enter your name</label>
    </div>
    <div className="form-control">
      <input type="text" required />
      <label>Enter your e-mail</label>
    </div>
    <div className="form-control">
      <input type="password" required />
      <label>Create a password</label>
    </div>
    <button class="btn">Submit</button>
    <p className="text">Don't have an account?
    <a href="#">Create Account</a></p>
    </form>
</div>

);
export default SignUp;