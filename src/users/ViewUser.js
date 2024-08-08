import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ViewUser() {

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })

    const { id } = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8082/user/${id}`)
            setUser(result.data)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch user details. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
    const divStyle = {
        background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',

        height: '100vh', // Example to cover the full viewport height
        
        color: 'white' // Example text color for visibility
    };
    return (
        <div style={divStyle}>
        <div className='container p-5'>
            <div className="row">
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-center'>
                    <h2 className='text-center m-4'>User Details</h2>

                    <div className="card" >
                        <div className="card-header">
                            Details of user id: {id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name:</b> {user.name}
                                </li>
                                <li className="list-group-item">
                                    <b>User Name:</b> {user.username}
                                </li>
                                <li className="list-group-item">
                                    <b>E-mail:</b> {user.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-warning my-2" to={"/"}>Back to Home</Link>
                </div>
            </div>
        </div></div>
    )
}
