import { Link } from 'react-router-dom';
import './Header.css';

export default function Header () {
    return(
        <header className='header'>
          <div className='header__container'>
            <h1 className='header__logo'><a className='header__link'>Blog</a></h1>
            <Link to={'/contact'} className='header__link'>お問い合わせ</Link>
          </div>
        </header>
    );
};