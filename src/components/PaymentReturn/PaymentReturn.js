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

  //   Encode
  const vnp_AmountEncoded = encodeURIComponent(vnp_Amount);
  const vnp_BankCodeEncoded = encodeURIComponent(vnp_BankCode);
  const vnp_BankTranNoEncoded = encodeURIComponent(vnp_BankTranNo);
  const vnp_CardTypeEncoded = encodeURIComponent(vnp_CardType);
  const vnp_OrderInfoEncoded = encodeURIComponent(vnp_OrderInfo);
  const vnp_PayDateEncoded = encodeURIComponent(vnp_PayDate);
  const vnp_ResponseCodeEncoded = encodeURIComponent(vnp_ResponseCode);
  const vnp_TmnCodeEncoded = encodeURIComponent(vnp_TmnCode);
  const vnp_TransactionNoEncoded = encodeURIComponent(vnp_TransactionNo);
  const vnp_TransactionStatusEncoded = encodeURIComponent(
    vnp_TransactionStatus
  );
  const vnp_TxnRefEncoded = encodeURIComponent(vnp_TxnRef);
  const vnp_SecureHashEncoded = encodeURIComponent(vnp_SecureHash);

  //   Looading
  const [loading, setLoading] = useState(true);
  //   API endpoint
  const apiEndpoint = `/vnpay/return?vnp_Amount=${vnp_AmountEncoded}&vnp_BankCode=${vnp_BankCodeEncoded}&vnp_BankTranNo=${vnp_BankTranNoEncoded}&vnp_CardType=${vnp_CardTypeEncoded}&vnp_OrderInfo=${vnp_OrderInfoEncoded}&vnp_PayDate=${vnp_PayDateEncoded}&vnp_ResponseCode=${vnp_ResponseCodeEncoded}&vnp_TmnCode=${vnp_TmnCodeEncoded}&vnp_TransactionNo=${vnp_TransactionNoEncoded}&vnp_TransactionStatus=${vnp_TransactionStatusEncoded}&vnp_TxnRef=${vnp_TxnRefEncoded}&vnp_SecureHash=${vnp_SecureHashEncoded}`;

  // Api call to return
  useEffect(() => {
    axios
      .get(apiEndpoint)
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
