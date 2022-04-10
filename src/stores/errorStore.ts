import { defineStore } from "pinia";

interface errorState {
  isError: boolean;
  errorMessage: string | null;
}

export const useErrorStore = defineStore({
  id: "error",
  state: (): errorState => ({
    isError: false,
    errorMessage: null,
  }),
  actions: {
    setError(errorMessage: string) {
      this.isError = true;
      this.errorMessage = errorMessage;
    },
    clearError() {
      this.isError = false;
      this.errorMessage = null;
    },
    displayError(errorMessage: string) {
      this.setError(errorMessage);
      setTimeout(() => this.clearError(), 1500);
    },
  },
});
