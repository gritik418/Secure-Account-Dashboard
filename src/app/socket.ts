import { connect } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://secure-account-dashboard-backend.onrender.com"
    : "http://localhost:8000";

export const socket = connect(URL!);
