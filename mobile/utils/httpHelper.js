import config from "../config/config";

const url = endpoint => {
  return `${config.URL}/${config.API}${endpoint}`;
};

const post = async (endpoint, body = {}) => {
  try {
    let res = await fetch(url(endpoint), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: body
      })
    });
    let data = await res.json();
    if (!data) throw new Error("Hata");
    return data;
  } catch {
    return data.err;
  }
};

const get = async endpoint => {
  try {
    let res = await fetch(url(endpoint));
    let data = await res.json();
    if (!data) throw new Error("Hata");
    return data;
  } catch {
    return data.err;
  }
};

export { post, get };
