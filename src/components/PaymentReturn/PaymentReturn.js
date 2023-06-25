import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
const PaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  //   VNPay return
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  //   Looading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/vnpay/return", {
        vnp_Amount: vnp_Amount,
        vnp_BankCode: vnp_BankCode,
        vnp_BankTranNo: vnp_BankTranNo,
        vnp_CardType: vnp_CardType,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_PayDate: vnp_PayDate,
        vnp_ResponseCode: vnp_ResponseCode,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_TransactionStatus: vnp_TransactionStatus,
        vnp_TxnRef: vnp_TxnRef,
        vnp_SecureHash: vnp_SecureHash,
      })
      .then((response) => {
        console.log(response);
        navigate("/success");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <div>
          <h1>Payment Return</h1>
        </div>
      )}
    </div>
  );
};
export default PaymentReturn;
