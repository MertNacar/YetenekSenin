import config from "../config/config";

const url = endpoint => {
  return `${config.URL}/${config.API}${endpoint}`;
};

const get = async (endpoint, token) => {
  try {
    let res = await fetch(url(endpoint), {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    });
    let data = await res.json();
    if (!data) throw new Error("Hata");
    return data;
  } catch {
    return data.err;
  }
};

const post = async (endpoint, body = {}, token) => {
  try {
    let res = await fetch(url(endpoint), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
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

const postWithoutToken = async (endpoint, body = {}) => {
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

export { post, get, postWithoutToken };
