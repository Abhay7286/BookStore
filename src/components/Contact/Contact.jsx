import React,{useState} from 'react'
import './Contact.css';
import contact from "../../assets/contact.png"

const Contact = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const toggleForm = (e) => {
        e.preventDefault();
        setIsSubmit(!isSubmit);
      };
  return (
    <div className='container'>
        {!isSubmit &&(
        <>
            <img src={contact} alt="contact" className='contact-img' />
            <div className="contact-form">
                <h2>CONTACT FORM</h2>
                <form>
                    <div className="inputs">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" required />
                    </div>
                    <div className="inputs">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div className="inputs">
                        <label htmlFor="problem">Write the problem</label>
                        <input type="text" id="problem" required />
                    </div>
                    <button type="submit" className="contact-btn" onClick={toggleForm}>Submit</  button>
                </form>
            </div>
        </>
    )}
        {isSubmit &&(
        <>
            <h2>Thanks for contacting us we reach back to you within next 24 hours.</h2>
        </>
    )}
       
    </div>
  )
}

export default Contact
