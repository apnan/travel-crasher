import { Link } from 'react-router-dom';
import '../topbar/topbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { toLoggeOut } from '../../store/userSlices';
import Gif3 from '../images/logo.gif';

export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.isLoggedIn);
  return (
    <div className="top">
      <div className="topLeft">
      <img className='logo' src={Gif3} alt=""/>
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/game">
              GAME
            </Link>
          </li>

          {user && (
            <li className="topListItem" onClick={() => dispatch(toLoggeOut())}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/profile">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>      
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
