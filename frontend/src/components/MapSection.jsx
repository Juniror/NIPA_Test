import mapImg from "../assets/image/map.png"

import bus from "../assets/icons/bus.png"
import car from "../assets/icons/car.png"
import boat from "../assets/icons/boat.png"
import bts from "../assets/icons/bts.png"
import mrt from "../assets/icons/mrt.png"
import InfoItem from "./util/InfoItem"
import "../css/MapSection.css"

function MapSection() {
  return (
    <div className="map-wrapper">

      {/* left */}
      <div className="map-box">
        <img src={mapImg} alt="map" />
      </div>

      {/* right */}
      <div className="map-info">
        <InfoItem 
          icon={bus}
          title="รถเมล์ : ลงป้ายไปรษณีย์กลาง"
          subtitle="สาย 1, 93, 45, 16, 35, 75, 187"
          note="เดินต่อไปที่อาคาร NT"
        />
        <InfoItem 
          icon={car}
          title="รถยนต์ส่วนตัว : จอดที่ตึก NT"
          subtitle="อาคารจอดรถอยู่หลังไปรษณีย์กลาง"
        />
        <InfoItem 
          icon={boat}
          title="เรือด่วนเจ้าพระยา"
          subtitle="ลงท่าสี่พระยา"
          note="เดินต่อไปที่อาคาร NT"
        />
        <InfoItem 
          icon={bts}
          title="BTS"
          subtitle="สะพานตากสิน (ทางออกที่ 3)"
        />
        <InfoItem 
          icon={mrt}
          title="MRT"
          subtitle="หัวลำโพง (ทางออกที่ 1)"
        />
      </div>
    </div>
  )
}

export default MapSection
