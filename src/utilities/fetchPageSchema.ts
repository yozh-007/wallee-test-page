export default function fetchPageSchema() {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        fetch('/mocks/page-schema.json')
          .then(response => {
            if (response.ok) {
              resolve(response.json());
            } else {
              reject(new Error('Page schema was not received'));
            }
          })
          .catch(error => {
            reject(error);
          }),
      10000,
    );
  });
}
