import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nipalogo from "../assets/image/nipa.png"
import "../css/Navbar.css"

function Navbar({ onHomeClick, isSubmitted }) {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHomeClick = (e) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
      window.scrollTo(0, 0);
    }
  }


  return (
    <>
      <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <ul className="menu">
          <li>
            <a href="#" onClick={handleHomeClick}>
              <img src={nipalogo} alt="nipa" />
            </a>
          </li>
          <li><a href="#" onClick={handleHomeClick}>Home</a></li>
          <li>Jobs</li>
          <li style={{ color: isSubmitted ? 'gray' : 'black', cursor: isSubmitted ? 'default' : 'pointer' }}>Contact Us</li>
        </ul>
        <div className='navbutton'>
          <a href="https://www.facebook.com/nipatalent/"><button>Join Our Talent Community</button></a>
        </div>
      </div>
    </>
  )
}
export default Navbar
