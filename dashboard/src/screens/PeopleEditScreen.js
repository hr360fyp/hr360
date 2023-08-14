import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditPeopleMain from "./../components/people/EditpeopleMain";

const PeopleEditScreen = ({ match }) => {
  const peopleId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditPeopleMain peopleId={peopleId} />
      </main>
    </>
  );
};
export default PeopleEditScreen;
