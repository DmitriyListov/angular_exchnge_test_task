
export const getResponse = async (url: string): Promise<any> => {


  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        'accept': 'application/json',
      }
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => resolve(data))
          return
        }
        reject('Sorry, something went wrong, please try again later')

      })
      .catch(e => {
        console.warn(e)
      });
  })
}



