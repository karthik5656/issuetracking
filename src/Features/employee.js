import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FetchEmployees = createAsyncThunk(
    "fetchEmployees", 
    async (args, {rejectWithValue}) => {
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            //https://qcbackend.azurewebsites.net/api/issue/getallemployees
            const result = await response.json();
            return result;
        }
        catch(err){
            console.log(err.response.data);
            return rejectWithValue(err.message);
        }
});


export const AddEmployees = createAsyncThunk(
    "addEmployees", 
    async (employeeData, {rejectWithValue}) => {
    //const response = await fetch()
    const response = fetch('http://------------:8080/', {  // Enter your IP address here
      method: 'POST', 
      headers: {
        "Content-Type" : "application/json",
      },
      mode: 'cors', 
      body: JSON.stringify(employeeData) // body data type must match "Content-Type" header
    })
    const result = await response.json();
    return result;
})


export const GetEmployeeById = createAsyncThunk(
    "getEmployeeById",
    async (employeeId, {rejectWithValue}) => {
        try{
            const response = await fetch(
                `Get employe by id api?empId=${employeeId}`
            );
            const result = await response.json();
            return result;
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)


const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,

    },
    extraReducers: (builder) => {
        builder.addCase(FetchEmployees.pending, 
            (state, action) => {
                state.isLoading = true;
        });
        builder.addCase(FetchEmployees.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
        });
        builder.addCase(FetchEmployees.rejected, 
            (state, action) => {
                console.log("Error : ", action.payload);
                state.isError =  true;
        });
        // builder.addCase(addEmployees.pending,
        //     (state, action) => {
        //         state.isLoading = true;
        // });
        builder.addCase(AddEmployees.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
        });
        builder.addCase(GetEmployeeById.pending, 
            (state, action) => {
                state.isLoading = true;
        });
        builder.addCase(GetEmployeeById.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
        });
        builder.addCase(GetEmployeeById.rejected, 
            (state, action) => {
                console.log("Error : ", action.payload);
                state.isError =  true;
        });
        // builder.addCase(addEmployees.rejected, 
        //     (state, action) => {
        //         console.log("Error : ", action.payload);
        //         state.isError =  true;
        // });
    }
})

export default employeeSlice.reducer;