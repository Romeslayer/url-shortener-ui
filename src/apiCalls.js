export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (newURL) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(newURL)
  })
    .then(res => {
      if(!res.ok) {
        throw new Error('URL not ADDED')
      } else {
        return res.json();
      }
    })
}
