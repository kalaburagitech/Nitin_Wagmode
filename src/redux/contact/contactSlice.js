import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profile } from "@/data/profile";

// Submit the contact form to the Next.js route handler (src/app/api/contact).
export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/contact", formData, {
        timeout: 20000,
      });
      return response.data;
    } catch (error) {
      const data = error.response?.data;
      return rejectWithValue({
        error:
          data?.error ||
          `Network error. Please try again or email ${profile.email} directly.`,
        code: data?.code || null,
        fieldErrors: data?.errors || null,
      });
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    formStatus: "idle", // idle, loading, succeeded, failed
    formData: null,
    error: null,
    errorCode: null,
    fieldErrors: null,
    content: {
      title: "Let's Work Together!",
      subtitle: "Contact Me",
      description:
        "Have a role, project, or product idea in mind? Send me a message — I'm open to opportunities across India, relocation, and remote work.",
      services: [
        "Full-time Frontend Role",
        "Freelance Project",
        "Web Application (React / Next.js)",
        "Mobile App (React Native)",
        "Something Else",
      ],
    },
  },
  reducers: {
    resetFormStatus: (state) => {
      state.formStatus = "idle";
      state.formData = null;
      state.error = null;
      state.errorCode = null;
      state.fieldErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.formStatus = "loading";
        state.error = null;
        state.errorCode = null;
        state.fieldErrors = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.formStatus = "succeeded";
        state.formData = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.formStatus = "failed";
        state.error = action.payload?.error || "Failed to send your message.";
        state.errorCode = action.payload?.code || null;
        state.fieldErrors = action.payload?.fieldErrors || null;
      });
  },
});

export const { resetFormStatus } = contactSlice.actions;
export default contactSlice.reducer;
