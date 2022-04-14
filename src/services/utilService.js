function fToC(fahrenheit) {
  var fTemp = fahrenheit;
  var fToCel = ((fTemp - 32) * 5) / 9;
  return Math.floor(fToCel);
}

const formatDate = (date) => {
  const name = new Date(date).toDateString().substring(0, 4);
  return (
    <>
      <time>{name}</time>
    </>
  );
};

export function makeId(length = 5) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const utilService = {
  fToC,
  formatDate,
  makeId,
};
