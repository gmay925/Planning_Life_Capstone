import './Login.css';
import NavBar from '../NavBar/NavBar';
const Login = () => (
<div className="container">
  <NavBar />
  <h1>Log In</h1>
  <form>
    <div className="form-control">
      <input type="text" required />
      <label>Your E-mail</label>
    </div>
    <div className="form-control">
      <input type="password" required />
      <label>Your Password</label>
    </div>
    <button class="btn">Submit</button>
    <p className="text">Don't have an account?
    <a href="#">Create Account</a></p>
    </form>
</div>

);
export default Login;