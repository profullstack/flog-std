export const numeric = value => !isNaN(parseFloat(value)) && isFinite(value);

export const boolish = value => value === "true" || value === "false";

export const nullish = value => value === undefined || value === null;
