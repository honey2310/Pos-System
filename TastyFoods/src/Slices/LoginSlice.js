import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch all user data from JSON Server
export const fetchUserData = createAsyncThunk(
  "login/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const [managerRes, employeeRes] = await Promise.all([
        fetch("http://localhost:3000/manager"),
        fetch("http://localhost:3000/employees"),
      ]);

      const managerData = await managerRes.json();
      const employeeData = await employeeRes.json();

      return { managerData, employeeData };
    } catch (err) {
      return rejectWithValue("Failed to load user data");
    }
  }
);

// ✅ Login thunk using fetched data
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const { managerData, employeeData } = getState().login;

      if (!managerData || !employeeData) {
        return rejectWithValue("User data not loaded yet");
      }

      const manager = managerData.find(
        (m) => m.email === email && m.password === password
      );
      const employee = employeeData.find(
        (e) => e.email === email && e.password === password
      );

      if (manager) {
        return { user: manager, role: "Manager" };
      } else if (employee) {
        return { user: employee, role: "Employee" };
      } else {
        return rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    managerData: [],
    employeeData: [],
    currentUser: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch user data
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.managerData = action.payload.managerData;
        state.employeeData = action.payload.employeeData;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
