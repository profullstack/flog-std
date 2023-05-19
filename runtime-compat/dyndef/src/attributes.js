const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value);

export const numeric = value => {
  try {
    return isNumeric(value);
  } catch (_) {
    return false;
  }
};

export const boolish = value => value === "true" || value === "false";

export const nullish = value => value === undefined || value === null;
