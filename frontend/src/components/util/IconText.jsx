function IconText({ icon, text, link, isunderline, color }) {
    return (
        <div className="icon-text" style={{ color: color }}>
            <p>{icon} <a href={link} style={{ color: color, textDecoration: isunderline ? 'underline' : 'none' }}>{text}</a></p>
        </div>
    )
}
export default IconText