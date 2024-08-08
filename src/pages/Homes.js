import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Homes() {
    const [users, setUsers] = useState([])
    const { id } = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8082/users")
        setUsers(result.data)
    }

    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:8082/user/${id}`)
                loadUser()
                Swal.fire(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                )
            }
        })
    }
    const divStyle = {
       background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
        height: '100vh', // Example to cover the full viewport height
        
        color: 'white' // Example text color for visibility
    };
    return (
        <div style={divStyle}>
        <div className='container p-5'>
            <div className='py-4'>
                <h2 className='text-center py-1'>List of Users</h2>
                <table className="table table-bordered table-striped">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">User</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'
                                        to={`/viewuser/${user.id}`}>
                                        View
                                    </Link>
                                    <Link className='btn btn-outline-primary mx-2'
                                        to={`/edituser/${user.id}`}>
                                        Edit
                                    </Link>
                                    <button className='btn btn-danger mx-2'
                                        onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div> </div>
    )
}
