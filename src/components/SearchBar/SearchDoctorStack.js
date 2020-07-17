import React from "react";
import ProfileCards from "../../views/DoctorsProfileCards";

const SearchDoctorStack = ({ persons }) => {
  return (
    <div>
      {persons.map((person, i) => {
        if (
          person.role !== "patient" &&
          person.role !== "lab" &&
          person.role !== "hospital" &&
          person.role !== "admin"
        ) {
          return (
            <div key={i}>
              <div style={{ width: "60%", marginTop: "15px" }} key={person.id}>
                <ProfileCards
                  docId={person.id}
                  docName={person.name}
                  docEmail={person.email}
                  docSpec={person.specializations}
                  docLocation={
                    person.location_city +
                    ", " +
                    person.location_state +
                    ", " +
                    person.location_country
                  }
                  rating={person.rating}
                  price={person.price}
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SearchDoctorStack;
