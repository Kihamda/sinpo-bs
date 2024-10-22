import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import BasicInfo from "./basicInfo";
import Graduation from "./graduation";
import Events from "./events";
import Title from "./title";
import { PersonContext, PersonProvider } from "./personContext";

const Detail = () => {
  const locate = useLocation();
  const nav = useNavigate();
  const path = locate.pathname.slice(14);

  const { handleSave } = useContext(PersonContext);

  return (
    <PersonProvider uid={path}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { handleSave } = useContext(PersonContext);
          handleSave(e);
        }}
        className="pb-2 justify-content-center"
      >
        <div className="row">
          <div className="col-12">
            <Title />
            <BasicInfo />
          </div>
          <div className="col-12 col-lg-6 mb-3">{/*<Graduation />*/}</div>
          <div className="col-12 col-lg-6 mb-3">{/*<Events />*/}</div>
          <div className="col-12 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-center">
                <button type="button" className="btn btn-primary me-1">
                  技能賞
                </button>
                <button type="button" className="btn btn-primary ms-1 me-1">
                  奉仕活動履歴
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PersonProvider>
  );
};

export default Detail;
