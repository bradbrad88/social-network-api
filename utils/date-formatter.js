function dateFormatter(date) {
  const intl = new Intl.DateTimeFormat("en-AU", {
    timeStyle: "medium",
    dateStyle: "long",
  }).format(date);
  return intl;
}

module.exports = dateFormatter;
