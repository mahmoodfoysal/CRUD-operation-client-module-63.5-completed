import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

const UpdateUser = () => {
    const [user, setUser] = useState([])
    const {id} = useParams();
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [])

    // update user 
    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = {name: updatedName, email: user.email}
        setUser(updatedUser)
    }
    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        // const updatedUser = {...user};
        // updatedUser.email = updatedEmail;
        const updateduser = {name: user.name, email: updatedEmail}
        setUser(updateduser);

    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/users/${id}`
        fetch(url, {
            method:"PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0) {
                alert('Updated Successfully');
            }
        })

    }
    return (
        <div>
            <h2>Update {user.name}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" value={user.name || ''} onChange={handleNameChange}/>
                <input type="email" name="" id="" value={user.email || ''} onChange={handleEmailChange}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default UpdateUser;