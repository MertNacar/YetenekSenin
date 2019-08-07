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

const getWithoutToken = async (endpoint) => {
  try {
    let res = await fetch(url(endpoint))
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

const put = async (endpoint, body = {}, token) => {
  try {
    let res = await fetch(url(endpoint), {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
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

export { get, getWithoutToken, post, postWithoutToken, put };
