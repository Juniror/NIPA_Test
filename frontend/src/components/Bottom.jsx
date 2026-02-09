import { FaFacebookF, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../css/Bottom.css";

function Bottom() {
    return (
        <div className="footer-container">

            {/* Social Media Icons */}
            <div className="social-media">
                <a href="#" className="social-icon">
                    <FaFacebookF />
                </a>
                <a href="#" className="social-icon">
                    <FaYoutube />
                </a>
                <a href="#" className="social-icon">
                    <FaLinkedinIn />
                </a>
            </div>

            {/* Address Info */}
            <div className="address-info">
                <h3>Nipa Technology (Head Quarter)</h3>
                <p>72 NT Building Bangrak Ste. 401-402 Charoenkrung Rd., Bangrak District, Bangkok, Thailand 10500</p>

                <div className="contact-details">
                    <div className="contact-item">
                        <FaPhoneAlt className="contact-icon-small" />
                        <span>02 639 7878 ต่อ 403-404</span>
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="contact-icon-small" />
                        <span>recruitment@nipa.co.th</span>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="copyright">
                <p>© Nipa Technology 2024 All Rights Reserved.</p>
            </div>

        </div>
    );
}

export default Bottom;
