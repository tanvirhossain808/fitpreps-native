// redux/slices/subscriptionSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateData } from 'react-native-calendars';

// This interface defines the shape of all the form fields
interface SubscriptionFormData {
  billing_email: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_country: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_postcode: string;
  billing_phone: string;
  billing_company: string;
  billing_company_kvk: string;
  billing_company_vat: string;
  shipping_email: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_country: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postcode: string;
  shipping_phone: string;
  shipping_company: string;
  shipping_company_kvk: string;
  shipping_company_vat: string;
  delivery_time: string;
  newsletter: boolean;
}

// This is the main state for the entire checkout form
interface SubscriptionState {
  formData: SubscriptionFormData;
  sameAddress: boolean;
  isBusinessAccount: boolean;
  isSubmitting: boolean;
  startDate: DateData | null;
  formErrors: { [key: string]: string | undefined };
}

// Here we set the initial values for the form state
const initialState: SubscriptionState = {
  formData: {
    billing_email: '',
    billing_first_name: '',
    billing_last_name: '',
    billing_country: 'NL',
    billing_address_1: '',
    billing_address_2: '',
    billing_city: '',
    billing_state: '',
    billing_postcode: '',
    billing_phone: '',
    billing_company: '',
    billing_company_kvk: '',
    billing_company_vat: '',
    shipping_email: '',
    shipping_first_name: '',
    shipping_last_name: '',
    shipping_country: 'NL',
    shipping_address_1: '',
    shipping_address_2: '',
    shipping_city: '',
    shipping_state: '',
    shipping_postcode: '',
    shipping_phone: '',
    shipping_company: '',
    shipping_company_kvk: '',
    shipping_company_vat: '',
    delivery_time: '17:00-18:00',
    newsletter: false,
  },
  sameAddress: true,
  isBusinessAccount: false,
  isSubmitting: false,
  startDate: null,
  formErrors: {},
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // This reducer updates a single field in the form
    // updateFormField: <K extends keyof SubscriptionFormData>(
    //   state: SubscriptionState,
    //   action: PayloadAction<{ field: K; value: SubscriptionFormData[K] }>
    // ) => {
    //   state.formData[action.payload.field] = action.payload.value;
    // },
    updateCheckoutState: (state, action: PayloadAction<Partial<SubscriptionState>>) => {
      Object.assign(state, action.payload);
    },
    // Toggles the "same address" checkbox
    setSameAddress: (state, action: PayloadAction<boolean>) => {
      state.sameAddress = action.payload;
    },
    // Toggles the "business account" checkbox
    setBusinessAccount: (state, action: PayloadAction<boolean>) => {
      state.isBusinessAccount = action.payload;
    },
    // Sets the submission status (e.g., when waiting for the server)
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    // Sets the selected delivery start date
    setStartDate: (state, action: PayloadAction<DateData>) => {
      state.startDate = action.payload;
    },
    // Sets the form validation errors
    setFormErrors: (state, action: PayloadAction<{ [key: string]: string | undefined }>) => {
      state.formErrors = action.payload;
    },
    // Resets the entire form to its initial state
    resetSubscriptionForm: () => {
      return initialState;
    },
  },
});

export const {
  updateCheckoutState,
  setSameAddress,
  setBusinessAccount,
  setSubmitting,
  setStartDate,
  setFormErrors,
  resetSubscriptionForm,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
