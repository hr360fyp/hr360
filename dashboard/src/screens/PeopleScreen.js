import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainPeople from "../components/people/MainPeople";

const PeopleScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPeople />
      </main>
    </>
  );
};

export default PeopleScreen;
