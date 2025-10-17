// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // ✅ Fetch all user data from JSON Server
// export const fetchUserData = createAsyncThunk(
//   "login/fetchUserData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const [managerRes, employeeRes] = await Promise.all([
//         fetch("http://localhost:3000/manager"),
//         fetch("http://localhost:3000/employees"),
//       ]);

//       const managerData = await managerRes.json();
//       const employeeData = await employeeRes.json();

//       return { managerData, employeeData };
//     } catch (err) {
//       return rejectWithValue("Failed to load user data");
//     }
//   }
// );

// // ✅ Login thunk using fetched data
// export const loginUser = createAsyncThunk(
//   "login/loginUser",
//   async ({ email, password }, { getState, rejectWithValue }) => {
//     try {
//       const { managerData, employeeData } = getState().login;

//       if (!managerData || !employeeData) {
//         return rejectWithValue("User data not loaded yet");
//       }

//       const manager = managerData.find(
//         (m) => m.email === email && m.password === password
//       );
//       const employee = employeeData.find(
//         (e) => e.email === email && e.password === password
//       );

//       if (manager) {
//         return { user: manager, role: "Manager" };
//       } else if (employee) {
//         return { user: employee, role: "Employee" };
//       } else {
//         return rejectWithValue("Invalid email or password");
//       }
//     } catch (error) {
//       return rejectWithValue("Login failed");
//     }
//   }
// );

// // ✅ Load persisted user from localStorage
// const persistedUser = JSON.parse(localStorage.getItem("currentUser"));
// const persistedRole = localStorage.getItem("role");

// const loginSlice = createSlice({
//   name: "login",
//   initialState: {
//     managerData: [],
//     employeeData: [],
//     currentUser: persistedUser || null,
//     role: persistedRole || null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logoutUser: (state) => {
//       state.currentUser = null;
//       state.role = null;
//       localStorage.removeItem("currentUser");
//       localStorage.removeItem("role");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch user data
//       .addCase(fetchUserData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.managerData = action.payload.managerData;
//         state.employeeData = action.payload.employeeData;
//       })
//       .addCase(fetchUserData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Login user
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentUser = action.payload.user;
//         state.role = action.payload.role;

//         // ✅ Persist user info in localStorage
//         localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
//         localStorage.setItem("role", action.payload.role);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutUser } = loginSlice.actions;
// export default loginSlice.reducer;

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

// ✅ Login thunk (auto-fetches data if empty)
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { getState, dispatch, rejectWithValue }) => {
    try {
      let { managerData, employeeData } = getState().login;

      // Fetch if empty
      if (!managerData.length || !employeeData.length) {
        const res = await dispatch(fetchUserData()).unwrap();
        managerData = res.managerData;
        employeeData = res.employeeData;
      }

      const manager = managerData.find(
        (m) => m.email === email && m.password === password
      );
      const employee = employeeData.find(
        (e) => e.email === email && e.password === password
      );

      if (manager) return { user: manager, role: "Manager" };
      if (employee) return { user: employee, role: "Employee" };

      return rejectWithValue("Invalid email or password");
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

// ✅ Load persisted user
const persistedUser = JSON.parse(localStorage.getItem("currentUser"));
const persistedRole = localStorage.getItem("role");

const loginSlice = createSlice({
  // name: "login",
  // initialState: {
    // managerData: [],
    // employeeData: [],
  //   currentUser: persistedUser || null,
  //   role: persistedRole || null,
  //   loading: false,
  //   error: null,
  // },
  // reducers: {
  //   logoutUser: (state) => {
  //     state.currentUser = null;
  //     state.role = null;
  //     state.loading = false;
  //     state.error = null;
  //     localStorage.removeItem("currentUser");
  //     localStorage.removeItem("role");
  //   },
  // },
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
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user data
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

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.role = action.payload.role;

        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.user)
        );
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
