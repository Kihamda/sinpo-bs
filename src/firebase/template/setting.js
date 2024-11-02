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
  let history = [];
  let count = 0;
  troops.forEach((e) => {
    e.events.forEach((f) => {
      history.push({
        name: f.name,
        del: false,
        finished: "",
        type: [{ name: e.short, row: i }],
      });
    });
    count++;
  });

  return history;
};

export const getDefaultScoutGraduation = () => {
  let history = [];
  let count = 0;
  troops.forEach((e) => {
    e.graduation.forEach((f, i) => {
      history.push({
        name: f.name,
        del: false,
        finished: "",
        type: [{ name: e.short, row: i }],
      });
    });
    count++;
  });

  return history;
};

export const getTroopsListShorted = () => {
  return troops.map((e) => {
    return e.short;
  });
};
