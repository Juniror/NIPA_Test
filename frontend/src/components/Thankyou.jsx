import '../css/Thankyou.css'
import IconText from './util/IconText'
import { FaThumbsUp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa'

function Thankyou() {
    return (
        <div className="thankyou-container">
            <div className="thankyou-left">
                <div className="check-circle">
                    <FaThumbsUp />
                </div>
                <h2 className="thankyou-title">Thank You!</h2>
                <div className="thankyou-message">
                    <p>
                        <FaCheckCircle color="#5b73b5" /> Your message has been sent <strong>successfully</strong>
                    </p>
                    <p>We will get back to you shortly.</p>
                </div>
            </div>
            <div className="thankyou-right">
                <p className="company-title">Nipa Technology (Head Quarter)</p>
                <IconText
                    icon={<FaMapMarkerAlt />}
                    text="72 NT Building Bangrak Ste. 401-402 Charoenkrung Rd., Bangrak District, Bangkok, Thailand 10500"
                    color="#555"
                />
                <IconText
                    icon={<FaPhoneAlt />}
                    text="02 639 7878 ต่อ 403-404"
                    link="tel:026397878"
                    color="#5b73b5"
                />
                <IconText
                    icon={<FaEnvelope />}
                    text="recruitment@nipa.co.th"
                    link="mailto:recruitment@nipa.co.th"
                    color="#5b73b5"
                />
            </div>
        </div>
    )
}
export default Thankyou