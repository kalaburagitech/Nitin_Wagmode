"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetContactStatus, submitContactForm } from "@/redux/contact/contactSlice";
import { CONTACT_FIELDS, validateContact, validateContactField } from "@/lib/contactValidation";

const EMPTY = { ...Object.fromEntries(CONTACT_FIELDS.map((field) => [field, ""])), website: "" };

const newSubmissionId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

// Form state, validation, and submission shared by every contact form.
export default function useContactForm() {
  const dispatch = useDispatch();
  const { status, error, fieldErrors, confirmationSent } = useSelector((state) => state.contact);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // A ref, not state: blocks a second click before React re-renders.
  const inFlight = useRef(false);
  // Sent with each submission so the server can drop accidental repeats.
  const submissionId = useRef(null);

  useEffect(() => {
    submissionId.current = newSubmissionId();
  }, []);

  useEffect(() => {
    if (status !== "loading") inFlight.current = false;
  }, [status]);

  // Show server-side field errors next to the matching inputs.
  useEffect(() => {
    if (fieldErrors) setErrors(fieldErrors);
  }, [fieldErrors]);

  // Clear the inputs only once the enquiry was accepted; start a fresh id.
  useEffect(() => {
    if (status === "succeeded") {
      setValues(EMPTY);
      setErrors({});
      submissionId.current = newSubmissionId();
    }
  }, [status]);

  // Leave a clean state for the next form that mounts.
  useEffect(() => () => dispatch(resetContactStatus()), [dispatch]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Re-validate live only once a field is already showing an error.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
    if (status === "failed" || status === "succeeded") dispatch(resetContactStatus());
  };

  const onBlur = (event) => {
    const { name, value } = event.target;
    if (name === "website") return;
    setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inFlight.current || status === "loading") return;

    const { errors: found } = validateContact(values);
    setErrors(found);
    const firstInvalid = CONTACT_FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      event.currentTarget.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    inFlight.current = true;
    dispatch(submitContactForm({ ...values, submissionId: submissionId.current }));
  };

  return { values, errors, status, error, confirmationSent, onChange, onBlur, onSubmit };
}
