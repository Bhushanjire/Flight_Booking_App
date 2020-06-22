import React, { Component } from "react";
import './user.css';


//function component
// function Users(){
//     return <h1>
//         Hello World
//     </h1>
// }

//Class component

// class Users extends Component{
//     render(){
//         return <h1>
//             Hello World
//         </h1>
//     }
// }

// function component with props

const Users = (props) => {
  const onClickDemo = () => {
    console.log("Button Clicked");
  };

  return <div>
    <h1>
      Hello {props.name} your roll no. is {props.roll} <br></br>
      <button className="btn" type="button" onClick={onClickDemo}>Click Here</button>
      {/* Event Handling */}

    </h1>
  </div>;
};

export default Users;
