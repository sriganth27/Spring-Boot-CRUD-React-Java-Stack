import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AddUser() {
    const divStyle = {
        background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
        height: '100vh', // Example to cover the full viewport height
        
        color: 'white' // Example text color for visibility
    };
    let navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })
    const { name, username, email } = user
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8082/user", user)
        Swal.fire({
            title: 'Success!',
            text: 'User registered successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate("/")
        })
    }

    const onCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/")
            }
        })
    }

    return (
        <div style={divStyle}>
        <div className='container p-5'>
            <div className="row">
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow border border-warning'>
                    <h2 className='text-center m-4'>Register user</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                User Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter your user name'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Email
                            </label>
                            <input
                                type={"email"}
                                className="form-control"
                                placeholder='Enter your email'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                            <button type='button' className='btn btn-outline-danger mx-2' onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div></div>
    )
}
