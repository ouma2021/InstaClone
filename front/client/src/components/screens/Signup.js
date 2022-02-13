import React ,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from "materialize-css"

const Signup  =()=>{
  const history = useHistory()
  const [name ,setName] = useState("")
  const [password ,setPassword] = useState("")
  const [email ,setEmail] = useState("")
  const PostData =()=>{
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email", classes:"#b71c1c red darken-4" })
      return
    }
    fetch("http://localhost:3001/signup",{
      method:"post" ,
      headers : { 
        "Content-Type": "application/json"
      
       },
      body:JSON.stringify({
        name ,
        email,
        password
      })
    }) .then(res=>res.json())
    .then(data=>
      {if(data.error){
       M.toast({html:data.error, classes:"#b71c1c red darken-4" })
      }else{
        M.toast({html:data.message ,classes:"#80cbc4 teal lighten-3"})
        history.push('/signin')
      }
    }).catch(err =>{console.log(err)})
  
  }
  return(
      <div className="mycard">
        <div className="card auth-card input-field ">
        <h1>instagram</h1>
        <input type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
  <button className="btn waves-effect waves-light #e91e63 pink" onClick={()=>PostData()}>
    Sign up
  </button>
   <h5>
     <Link to="/signin"> Already have an account </Link>
   </h5>
      </div>
      </div>
  )
}
export default Signup 