export const artoString = (data, key) => {
  if (!data) return "";
  if (!key) return "";
  if (!Array.isArray(data)) return;
  return data.map(e => e[key] || "").toString();
};

export const a = 1;
