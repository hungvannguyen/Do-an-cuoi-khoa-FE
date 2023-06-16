function ConfirmEmail() {
  return (
    <div
      className="container"
      id="web"
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <div className="text-container" style={{ textAlign: "center" }}>
        <h1>
          <i
            className="fa fa-check-circle"
            aria-hidden="true"
            style={{ color: "#E6A1C3" }}
          ></i>{" "}
          Xác thực Email
        </h1>
        <p>Chúng tôi đã gửi Email xác thực đến Email của bạn.</p>
        <p>Vui lòng kiểm tra Email và xác thực tài khoản của bạn.</p>
        {/* <p>
          Check out Lomotif on <br />
        </p> */}
      </div>
    </div>
  );
}

export default ConfirmEmail;
