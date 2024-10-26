import troops from "./troops.json";

export const getDefaultScoutDataForm = () => {
  const troop = getTroopsListShorted();
  let history = {};

  troop.forEach((e) => {
    history[e] = true;
  });
  return {
    firstname: "",
    lastname: "",
    belong: "BS",
    comment: "",
    history: { ...history },
  };
};

export const getDefaultScoutEvent = () => {
  const troop = getTroopsListShorted();
  let history = {};
  let count = 0;
  troops.forEach((e) => {
    history[troop[count]] = e.events;
    count++;
  });
  history["GEN"] = [{ name: "誓いを立てた日", finished: "" }];
  return history;
};

export const getDefaultScoutGraduation = () => {
  const troop = getTroopsListShorted();
  let history = {};
  let count = 0;
  troops.forEach((e) => {
    history[troop[count]] = e.graduation;
    count++;
  });
  history["GEN"] = [];
  return history;
};

export const getTroopsListShorted = () => {
  return troops.map((e) => {
    return e.short;
  });
};
