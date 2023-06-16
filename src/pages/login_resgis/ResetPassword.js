import Reset from "../../components/ResetPassword/ResetPassword";
import { useState, useEffect } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ResetPassword() {
  return (
    <div>
      <Reset />
    </div>
  );
}

export default ResetPassword;
