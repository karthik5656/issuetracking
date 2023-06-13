import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AddEmployees } from '../Features/employee';

function AddEmployee() {
    const [employeeName, setEmployeeName] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employeeName);
        dispatch(AddEmployees(employeeName));
        
    };
    
    

    return (
        <div className='employee-add-card'>
            <h3>Create New Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className='field-' >
                    <input
                        type='text'
                        name='employee-name'
                        placeholder='Enter Employee Name'
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
                    <button type='submit'>Create Employee</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee