export const formatCurrency = (value) => {
  return (
    value &&
    value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })
  );
};

export const findInputError = (errors, name) => {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});

  return filtered;
};

export const isFormInvalid = (err) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
