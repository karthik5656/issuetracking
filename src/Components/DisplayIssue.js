import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {GetAllIssues, GetIssueById} from '../Features/issueSlice'
import { GetEmployeeById } from '../Features/employee';


function DisplayIssue({issueId, issueName}) {
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state) => state.issue);
    useEffect(() => {
        dispatch(GetAllIssues());
        //dispatch(GetIssueById(issueId))
    }, [])
    if(loading){
        return <h2>Loading.........</h2>
    }
    if(error !== null){
        return <h2>Oops something went wrong...</h2>
    }
    const {
        issueId, 
        projectId, 
        issueName, 
        issueType,
        moduleName,
        description,
        assignTo,
        stepsToReproduce,
        testingType,
        iterationNumber,
        status,
        linkToPast,
    } = data[0];
    

    const employeeData = useSelector((state) => state);
    useEffect(() => {
        dispatch(GetEmployeeById());
    }, [])
    return (
        <div className='issue-container'>
            <div className='each-field'>
                <label>Issue : </label>
                <div className='each-field-value'>
                    {issueName}
                </div>
            </div>
            <div className='each-field'>
                <label>Issue Type : </label>
                <div className='each-field-value'>
                    {issueType}
                </div>
            </div>
            <div className='each-field'>
                <label>Project Id : </label>
                <div className='each-field-value'>
                    {projectId}
                </div>
            </div>
            <div className='each-field'>
                <label>Module Name : </label>
                <div className='each-field-value'>
                    {moduleName}
                </div>
            </div>
            <div className='each-field'>
                <label>Description : </label>
                <div className='each-field-value'>
                    {description}
                </div>
            </div>
            <div className='each-field'>
                <label>Assigned Employee : </label>
                <div className='each-field-value'>
                    {assignTo}
                    {/* Need to pass assignTo to GetEmployeeById() api and render the employee name
                        assignTo contains the employee id
                    */}
                    {/* 
                        {employeeData.employee.empName}
                    */}

                </div>
            </div>
            <div className='each-field'>
                <label>Steps to Reproduce : </label>
                <div className='each-field-value'>
                    {stepsToReproduce}
                </div>
            </div>
            <div className='each-field'>
                <label>Testing Type  : </label>
                <div className='each-field-value'>
                    {testingType}
                </div>
            </div>
            <div className='each-field'>
                <label>Iteration Number : </label>
                <div className='each-field-value'>
                    {iterationNumber}
                </div>
            </div>
            <div className='each-field'>
                <label>Issue Current Status : </label>
                <div className='each-field-value'>
                    {status}
                </div>
            </div>
            <div className='each-field'>
                <label>Previous Issue : </label>
                <div className='each-field-value'>
                    {linkToPast}
                </div>
            </div>

        </div>
    )
}

export default DisplayIssue