import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Get all projects action
export const GetAllProjects = createAsyncThunk("getProjects", async (args, {rejectWithValue }) => {
  try{
  const response = await fetch('https://jsonplaceholder.typicode.com/users ');
  const result= await response.json();
  return result;
  }catch(err){
    return rejectWithValue("Found an error!",err.response.data)
  }
})

//Add new Project
export const AddNewProject =createAsyncThunk("addProject",async(data,{rejectWithValue})=>{
  try{
  const response=await fetch('post api',{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}catch(err){
  return rejectWithValue("Found an error!",err.response.data)
}
}); 

export const Projects = createSlice({ 
  name:'Projects',
  initialState: {      
    data: [], 
    loading: false,
    error: null, 
  }, 
  reducers: {},  
  extraReducers: {
    [GetAllProjects.pending]: (state) => {
      state.loading = true;
    },
    [GetAllProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [GetAllProjects.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [AddNewProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
  },

});
export default Projects.reducer;