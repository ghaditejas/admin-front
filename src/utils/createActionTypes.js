const createActionType = types => (
  types.reduce((acc, type) => {
    acc[type] = type;
    return acc;
  }, {})
);

export default createActionType;
