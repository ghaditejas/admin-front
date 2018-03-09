/**
 * Format date from BD to string
 * @param {string} date
 */
export default (date) => {
  if (date === undefined || date === null) {
    return null;
  }

  const dateObject = new Date(date);
  let formatedDate = `${dateObject.getDay()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`;
  formatedDate += ` - ${dateObject.getHours()}:${dateObject.getMinutes()}`;
  return formatedDate;
};
