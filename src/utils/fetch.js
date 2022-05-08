export async function fetchResource(url, tooManyReq, handleTooManyReq) {
  console.log({ p: process.env })
  return fetch(url,
    {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_PEXELS_API_KEY,
      }
    })
    .then(res => {
      if (res.ok) {
        if (tooManyReq) {
          handleTooManyReq(false);
        }
        return res.json()
      }

      if (res.status == 429) {
        handleTooManyReq(true);
      }
    })
    .then(json => json)
}