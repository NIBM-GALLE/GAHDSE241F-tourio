import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as WarrantyIcon } from '../../assets/icons/icon_warranty.svg';
import { auth } from '../../firebaseConfig';
import './loginpage.css';


const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginemail: '',
    loginpassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGoogleSignup = () => {
    console.log('Google Signup initiated');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //const auth = getAuth();
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.loginemail,
        formData.loginpassword
      );
  
      const idToken = await userCredential.user.getIdToken();
  
      // send token to backend
      const response = await axios.post('http://localhost:5000/api/login', {
        token: idToken,
      });
  
      localStorage.setItem('uid', response.data.uid);

      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-content">
          <div className="signup-form">
            <div className="signup-header">
              <h2>Welcome back</h2>
              <p>Join our platform and start your journey</p>
            </div>

            <div className="social-signup">
              <button 
                className="google-signup-btn" 
                onClick={handleGoogleSignup}
              >
                <img 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google logo" 
                />
                Continue with Google
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="login-form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email"
                  id="loginemail"
                  name="loginemail"
                  value={formData.loginemail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="loginpassword"
                  id="loginpassword"
                  name="loginpassword"
                  value={formData.loginpassword}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  minLength="8"
                  required 
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>

              <div className="form-footer">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
              </div>
            </form>
          </div>

          <div className="signup-illustration">
            <div className="illustration-image">
              <div className="illustration-content">
                <h3>Tourio Ensures Your Enjoy.</h3>
                <p>Discover a world of opportunities and connections</p>

                <div className="button-container">
                  <button className="spbutton">
                    <WarrantyIcon className="icon" />
                    Ensure Value
                  </button>
                  <button className="spbutton">
                    <WarrantyIcon className="icon" />
                    Ensure Safety
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;