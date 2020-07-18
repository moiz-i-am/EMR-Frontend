import React from "react";

const PaymentCard = props => {
  return (
    <div>
      <div className="column">
        <div className="col-lg-6 col-md-6">
          <div
            className="single-generating d-flex mb-30"
            style={{
              border: "1px solid #C1C1C1",
              borderRadius: "10px",
              width: "180%"
            }}
          >
            <div className="generating-cap" style={{ padding: "20px" }}>
              <p>id: {props.paymentStripeId}</p>
              <p>amount: {props.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
