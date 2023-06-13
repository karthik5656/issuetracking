import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Get all Issues action
export const GetAllIssues = createAsyncThunk(
  "getIssues",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "Get all Issues Api"
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Found an error", err.response.data);
    }
  }
);

export const GetIssueById = createAsyncThunk(
    "getIssueById",
    async (issueId, {rejectWithValue}) => {
        try{
            const response = await fetch(
                `Get issue by id api?issueId=${issueId}`
            );
            const result = await response.json();
            return result;
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)

//Add Issuue
export const AddNewIssue = createAsyncThunk(
  "addIssue",
  async (data, { rejectWithValue }) => {
    try{
    const response = await fetch(
      "Add issue Api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
    }catch (err) {
        return rejectWithValue("Found an error", err.response.data);
      }
  }
);

//Delete Issue
export const DeleteIssue = createAsyncThunk(
  "deleteIssue",
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `delete issue api/${issueId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//update Issue Status
export const UpdateIssueStatus = createAsyncThunk(
  "updateStatus",
  async ({ issueId,status}, { rejectWithValue }) => {  

    try {
      const response = await fetch(
        `Issue Put API/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const result = await response.json();     
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const Issues = createSlice({
  name: "Issues",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [GetAllIssues.pending]: (state) => {
      state.loading = true;
    },
    [GetAllIssues.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [GetAllIssues.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [AddNewIssue.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [DeleteIssue.pending]: (state) => {
      state.loading = true;
    },
    [DeleteIssue.fulfilled]: (state, action) => {
      state.loading = false;
      const { issueId } = action.payload;
      if (issueId) {
        state.data = state.data.filter((post) => post.issueId !== issueId);
      }
    },
    [DeleteIssue.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [UpdateIssueStatus.pending]: (state) => {
      state.loading = true;
    },
    [UpdateIssueStatus.fulfilled]: (state, action) => {
      console.log("updated status fulfilled", action.payload);
      state.loading = false;
      state.data = state.data.map((ele) =>
        ele.issueId === action.payload.issueId ? action.payload : ele
      );
    },
    [UpdateIssueStatus.rejected]: (state, action) => {
      state.loading = false;    
      state.error = action.payload.message;
    },
    [GetIssueById.pending]: (state) => {
      state.loading = true;
    },
    [GetIssueById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [GetIssueById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default Issues.reducer;