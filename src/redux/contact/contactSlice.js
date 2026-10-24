import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profile } from "@/data/profile";

// Posts the contact form to the route handler in src/app/api/contact.
export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/contact", formData, { timeout: 20000 });
      return response.data;
    } catch (error) {
      const data = error.response?.data;
      return rejectWithValue({
        error: data?.error || `Network error. Please try again or email ${profile.email} directly.`,
        code: data?.code || null,
        fieldErrors: data?.errors || null,
      });
    }
  }
);

const initialState = {
  status: "idle", // idle | loading | succeeded | failed
  confirmationSent: null, // after success: whether the visitor's confirmation email went out
  error: null,
  errorCode: null,
  fieldErrors: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactStatus: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, () => ({ ...initialState, status: "loading" }))
      .addCase(submitContactForm.fulfilled, (_state, action) => ({
        ...initialState,
        status: "succeeded",
        confirmationSent: action.payload?.confirmationSent === true,
      }))
      .addCase(submitContactForm.rejected, (_state, action) => ({
        ...initialState,
        status: "failed",
        error: action.payload?.error || "Failed to send your message.",
        errorCode: action.payload?.code || null,
        fieldErrors: action.payload?.fieldErrors || null,
      }));
  },
});

export const { resetContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
