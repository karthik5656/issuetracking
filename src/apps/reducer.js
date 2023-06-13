import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from '../Features/employee'
import issueReducer from '../Features/issueSlice'
import projectReducer from '../Features/projectSlice'

export default combineReducers({
    employee : employeeReducer,
    issue: issueReducer,
    project: projectReducer
})