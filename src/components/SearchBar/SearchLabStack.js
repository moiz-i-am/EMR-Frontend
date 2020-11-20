import React from "react";
import LabProfileCard from "../../components/cards/LabProfileCard";

const SearchLabStack = ({ LabPersons }) => {
  return (
    <div>
      {LabPersons.map((person, i) => {
        if (
          // person.role !== "patient" &&
          // person.role !== "doctor" &&
          // person.role !== "hospital"
          person !== null
        ) {
          return (
            <div key={i}>
              <div style={{ width: "60%", marginTop: "15px" }} key={person.id}>
                <LabProfileCard
                  labId={person.id}
                  labName={person.name}
                  labEmail={person.email}
                  labLocation={
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

export default SearchLabStack;
