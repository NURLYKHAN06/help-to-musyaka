// post
const postRequest = function (url, body) {
  return new Promise(async (resolve) => {
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BEARER ${saved.token}`,
        },
        body: JSON.stringify(body),
      });
      if (!request.ok) throw new Error(request.statusText);
      const response = await request.json();
      if (response.error) throw new Error(response.message);
      resolve(response);
    } catch (error) {
      resolve({
        error,
      });
    }
  });
};
// get
const getRequest = function (url) {
  return new Promise(async (resolve) => {
    try {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.error) throw new Error(response.message);
      resolve(response);
    } catch (error) {
      resolve({
        error,
      });
    }
  });
};

// localstorage
const saved = {
  value: null,
  set value(newValue) {
    if (newValue) {
      localStorage.setItem("help-to-musyaka", JSON.stringify(newValue));
    } else {
      localStorage.removeItem("help-to-musyaka");
    }
  },
  get value() {
    return JSON.parse(localStorage.getItem("help-to-musyaka"));
  },
  get token() {
    const item = localStorage.getItem("help-to-musyaka");
    return item ? JSON.parse(item).token : null;
  },
};
