import { createUserProfile, getProfile } from "./profileAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: false,
  profile: {},
  error: "",
};

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (data) => {
    const profile = await createUserProfile(data);
    return profile;
  }
);
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async () => {
    const profile = await getProfile();
    return profile;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleSavedStatus: (state, action) => {
      const { blogId } = action.payload;
      const blogToUpdate = state.blogs.find((blog) => blog.id === blogId);
      if (blogToUpdate) {
        blogToUpdate.isSaved = !blogToUpdate.isSaved;
      }
    },
    filters: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.isSaved === true);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default profileSlice.reducer;
export const { toggleSavedStatus, filters } = profileSlice.actions;
