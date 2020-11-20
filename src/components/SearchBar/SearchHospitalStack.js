import React from "react";
import HospitalProfileCard from "../../components/cards/HospitalProfileCard";

const SearchHospitalStack = ({ HospitalPersons }) => {
  // console.log(HospitalPersons);
  return (
    <div>
      {HospitalPersons.map((person, i) => {
        if (
          person.role !== "patient" &&
          person.role !== "doctor" &&
          person.role !== "lab"
        ) {
          return (
            <div key={i}>
              <div style={{ width: "60%", marginTop: "15px" }} key={person.id}>
                <HospitalProfileCard
                  hospitalId={person.id}
                  hospitalName={person.name}
                  hospitalEmail={person.email}
                  hospitalLocation={
                    person.location_city
                      ? person.location_city +
                        ", " +
                        person.location_state +
                        ", " +
                        person.location_country
                      : null
                  }
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SearchHospitalStack;
