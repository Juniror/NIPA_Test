
import image from "../assets/image/horizonimg.jpg"
import "../css/Mainpic.css"
function Mainpic() {
    return (
        <div className="image-box">
            <div className="overlay">
                <h1><span>WE</span><span> WANT TO <br></br>HEAR</span> <span>FROM YOU</span></h1>
            </div>
            <img src={image} alt="image" />
        </div>

    )
}

export default Mainpic