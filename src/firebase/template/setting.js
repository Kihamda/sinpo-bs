import troops from "./troops.json";

export const getDefaultScoutDataForm = () => {
  const troop = getTroopsListShorted();
  let history = {};
  let count = 0;
  troop.forEach((e) => {
    history[e] = {
      exp: true,
      joined: "",
      exited: "",
      graduation: troops[count].graduation.map((e) => {
        return { name: e.name, finished: "" };
      }),

      events: troops[count].events.map((e) => {
        return { name: e.name, finished: "" };
      }),
    };
    count++;
  });
  history["GEN"] = {
    exp: true,
    joined: "",
    exited: "",
    graduation: [],
    events: [{ name: "誓いを立てた日", finished: "" }],
  };
  return {
    firstname: "",
    lastname: "",
    belong: "BS",
    comment: "",
    history: { ...history },
  };
};

export const getTroopsListShorted = () => {
  return troops.map((e) => {
    return e.short;
  });
};
