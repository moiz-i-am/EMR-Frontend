import React, { useState } from "react";
import { Confirm } from "semantic-ui-react";

const PatientCard = props => {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);

  const handleConfirm = () => {
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  const renderConfirmation = () => {
    return (
      <div>
        <div>hello</div>
      </div>
    );
  };

  return (
    <div>
      <div className="column" onClick={show}>
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
              <p>Name: {props.name}</p>
              <p>Email: {props.email}</p>
              <p>{props.phone ? `Phone:  ${props.phone}` : null}</p>
            </div>
          </div>
        </div>
      </div>
      <Confirm
        open={open}
        content={renderConfirmation()}
        header="Lab reports"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        size="small"
      />
    </div>
  );
};

export default PatientCard;
