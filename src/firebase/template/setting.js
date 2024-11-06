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
    joined: "",
    declare: { date: "", place: "" },
    history: { ...history },
  };
};

export const getDefaultScoutGraduation = () => {
  let history = [];
  let count = 0;

  troops.forEach((e) => {
    history.push({
      name: e.name,
      finished: "",
      type: { name: e.short, row: 0 },
    });
    e.graduation.forEach((f, i) => {
      history.push({
        name: f.name,
        finished: "",
        type: { name: e.short, row: 1 + i },
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
