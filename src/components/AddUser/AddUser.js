import React from 'react';
import { useRef } from 'react/cjs/react.development';


const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = {name: name, email: email}
        fetch('http://localhost:5000/users', {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId) {
                alert("Successfully added the user.")
                e.target.reset();
            }
        })
    }
    return (
        <div>
            <h2>Please add an User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" placeholder='Name' ref={nameRef} />
                <br />
                <input type="email" name="email" placeholder='Email' id="" ref={emailRef} />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddUser;