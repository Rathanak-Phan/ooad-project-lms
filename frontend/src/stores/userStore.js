import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null")
  }),
  actions: {
    setUser(user, token) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});
