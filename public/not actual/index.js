// api  urls
const API_SIGN_IN = "api/auth/signin";
const API_GET_VOTES = "api/votes";

class Votes {
  static get() {
    return getRequest(API_GET_VOTES);
  }
}

class HTML {
  constructor(selector) {
    this.el = document.querySelector(selector);
  }

  hide() {
    this.el.classList.add("hide");
  }
  show() {
    this.el.classList.remove("hide");
  }
}

// token object
const token = {
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
  get get() {
    const item = localStorage.getItem("help-to-musyaka");
    return item ? JSON.parse(item).token : null;
  },
};

// post
const postRequest = function (url, body) {
  return new Promise(async (resolve) => {
    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BEARER ${token.get}`,
        },
        body: JSON.stringify(body),
      });
      const response = await request.json();
      if (response.error) throw new Error(response.message);
      resolve(response);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  });
};

// elements
const HTMLSigninForm = new HTML(".el-signin_form");
const HTMLUserInfoNav = new HTML(".el-user_info_nav");
const HTMLUsername = new HTML(".el-username");
const HTMLVotes = new HTML(".el-votes");
const HTMLSignoutBtn = new HTML(".el-signout_btn");

// listener for signin
HTMLSigninForm.el.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const { username, password } = ev.target;

  try {
    const response = await postRequest(API_SIGN_IN, {
      username: username.value,
      password: password.value,
    });

    token.value = {
      token: response.data.token,
      username: username.value,
    };
    HTMLSigninForm.hide();
    HTMLUsername.el.innerHTML = username.value;
  } catch (error) {
    console.log(error);
  }
});

// listener for signout
HTMLSignoutBtn.el.addEventListener("click", () => {
  token.value = null;
  HTMLSignoutBtn.hide();
  HTMLSigninForm.show();
  HTMLUsername.el.innerHTML = "";
  HTMLUsername.hide();
});

// first render
if (token.get) {
  HTMLSigninForm.hide();
  HTMLUsername.el.innerHTML = token.value.username;
}

// function render votes list
async function renderVotes() {
  Votes.get();
}
