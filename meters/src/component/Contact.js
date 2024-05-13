import React from 'react'

function Contact() {
  return (
   <>
   <div className="contactform">
    <img src="https://cdn-icons-png.flaticon.com/128/8367/8367861.png" height={60} width={60} className='contactimage' alt="" />
   <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
  
    <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">FeedBack</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
  <button type="submit" class="btn btn-primary" style={{backgroundColor:'rgb(27, 87, 136)'}}>Submit</button>
</form>
   </div>
   </>
  )
}

export default Contact
