export const formatCurrency = (value) => {
  return (
    value &&
    value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })
  );
};
