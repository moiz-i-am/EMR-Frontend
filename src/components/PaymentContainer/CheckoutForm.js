import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

function CheckoutForm({
  success,
  amount,
  doctorId,
  doctorName,
  patientId,
  patientName
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("/v1/payment/charge", {
          id,
          amount,
          doctorId,
          doctorName,
          patientId,
          patientName
        });
        console.log(data);
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}
    >
      <div style={{ height: "60px", padding: "22px" }}>
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        style={{
          width: "30%",
          height: "42px",
          borderRadius: "20px",
          color: "white",
          backgroundColor: "#909",
          border: "1px solid #909",
          marginTop: "15px",
          marginBottom: "15px"
        }}
      >
        Pay
      </button>
    </form>
  );
}

const PaymentIndex = props => {
  const [status, setStatus] = React.useState("ready");

  if (status === "success") {
    return <div>Congrats, your payment is successful!</div>;
  }
  return (
    <CheckoutForm
      success={() => {
        setStatus("success");
      }}
      amount={props.amount}
      doctorId={props.doctorId}
      doctorName={props.doctorName}
      patientId={props.patientId}
      patientName={props.patientName}
    />
  );
};

export default PaymentIndex;
