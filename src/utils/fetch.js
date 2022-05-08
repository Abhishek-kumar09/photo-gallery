export async function fetchResource(url, tooManyReq, handleTooManyReq) {
  return fetch(url,
    {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_PEXELS_API_KEY,
      }
    })
    .then(res => {
      if (res.ok) {
        if (tooManyReq && handleTooManyReq) {
          handleTooManyReq(false);
        }
        return res.json()
      }

      if (res.status == 429 && handleTooManyReq) {
        handleTooManyReq(true);
      }
    })
    .then(json => json)
}