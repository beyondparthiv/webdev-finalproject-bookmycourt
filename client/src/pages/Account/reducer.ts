import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/api";

interface AccountState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  currentUser: null,
  loading: true, // Start as true to check session
  error: null,
};

// Check if user is logged in (restore from session)
export const checkSession = createAsyncThunk(
  "account/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getProfile();
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Sign in
export const signin = createAsyncThunk(
  "account/signin",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await authService.signin(
        credentials.username,
        credentials.password
      );
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Sign out
export const signout = createAsyncThunk("account/signout", async () => {
  await authService.signout();
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Check session
    builder.addCase(checkSession.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(checkSession.rejected, (state) => {
      state.currentUser = null;
      state.loading = false;
    });

    // Sign in
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    // Sign out
    builder.addCase(signout.fulfilled, (state) => {
      state.currentUser = null;
    });
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;