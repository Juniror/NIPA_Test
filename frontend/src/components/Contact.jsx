import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/Contact.css"
import { IoMap } from "react-icons/io5";
import { FaSquarePhone } from "react-icons/fa6";
import CustomInput from "./util/CustomInput"
import CustomTextArea from "./util/CustomTextArea"
import { MdOutlineEmail } from "react-icons/md";
import IconText from "./util/IconText"
import { FaYoutube, FaLinkedinIn } from "react-icons/fa";

function Contact() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    question: ""
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!form.name) newErrors.name = true
    if (!form.email) newErrors.email = true
    if (!form.subject) newErrors.subject = true
    if (!form.question) newErrors.question = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        // success case
        setForm({
          name: "",
          phone: "",
          email: "",
          company: "",
          subject: "",
          question: ""
        });
        setErrors({});

        navigate('/thankyou')
        window.scrollTo(0, 0)

      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit ticket. Is the backend running?");
    }
  }

  return (
    <div className="contact-container">
      {/* left */}
      <form className="contact-form" onSubmit={handleSubmit}>

        <h2>Contact Us / ติดต่อเรา</h2>

        <CustomInput label="Name *" name="name" value={form.name} onChange={handleChange} error={errors.name} />
        <CustomInput label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
        <CustomInput label="Email *" name="email" value={form.email} onChange={handleChange} error={errors.email} />
        <CustomInput label="Company" name="company" value={form.company} onChange={handleChange} />
        <CustomInput label="Subject *" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
        <CustomTextArea label="Question *" name="question" value={form.question} onChange={handleChange} rows={1} error={errors.question} />


        <div className="button-wrapper">
          <button className="submit-btn">Submit</button>
          {Object.keys(errors).length > 0 && <span className="error-msg">✖ Please fill in the form correctly.</span>}
        </div>

      </form>

      {/* right */}
      <div className="contact-info">

        <h2>Address / ที่อยู่</h2>

        <IconText icon={<IoMap color="#e9355c" />} text="72 อาคารโทรคมนาคม บางรัก ชั้น 4 ห้อง 401-402 ถนนเจริญกรุง แขวงบางรัก เขตบางรัก กรุงเทพฯ 10500" />
        <IconText icon={<FaSquarePhone color="#e9355c" />} text="02 639 7878 ต่อ 403-404" />
        <IconText icon={<MdOutlineEmail color="#e9355c" />} text="recruitment@nipa.co.th" />
        <IconText icon={<FaYoutube color="#e9355c" />} text="Nipa Technology" link="https://www.youtube.com/channel/UCyj2q0nI5uc5wSrqq8k7JbQ" />
        <IconText icon={<FaLinkedinIn color="#e9355c" />} text="Nipa Agency" link="https://www.linkedin.com/company/nipa-agency/" />

        <h2>How to Get Here / วิธีเดินทาง</h2>

        <IconText icon={null} text="BUS: 1, 93, 45, 16, 35, 75, 187" />
        <IconText icon={null} text="BTS: สะพานตากสิน (ทางออกที่ 3)" />
        <IconText icon={null} text="MRT: หัวลำโพง (ทางออกที่ 1)" />

      </div>

    </div>
  )
}

export default Contact
