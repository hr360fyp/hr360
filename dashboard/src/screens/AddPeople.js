import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddPeopleMain from "./../components/people/AddPeopleMain";

const AddPeople = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddPeopleMain />
      </main>
    </>
  );
};

export default AddPeople;
