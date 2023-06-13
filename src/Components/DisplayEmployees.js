import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {FetchEmployees} from '../Features/employee';

function DisplayEmployees() {
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useSelector((state) => state.employee);
    
    useEffect(() => {
        dispatch(FetchEmployees())
    }, [])
    
    //console.log("state: ", state.employee);
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <h2>Oops Something wrong..</h2>
    }
    return (
        <div>
            {/* <button onClick={(e) => dispatch(fetchEmployees())}>Fetch Employees</button> */}
            {
                data && data.map((val, ind) => <li key={ind}>{val.title}</li>)
            }
        </div>
    )
}

export default DisplayEmployees