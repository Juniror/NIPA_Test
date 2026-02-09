function InfoItem({icon, title, subtitle, note}) {
    return (
        <div className="info-item">
          <div className="icon-circle">
            <img src={icon} alt="bus" />
          </div>
          <div>
            <h4>{title}</h4>
            <p>{subtitle}</p>
            <span>{note}</span>
          </div>
        </div>
    );
}

export default InfoItem;