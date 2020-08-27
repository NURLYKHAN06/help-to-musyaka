const store = {
  user: null,
};

const { user } = store;

const bodyHeader = (user) => `<p>${user.name}</p><button>Выйти</button>`;
const headerComponent = new Header({
  tag: "header",
  className: "header",
  body: user ? bodyHeader(user) : "",
});

const bodySignin = `
    <form>
    <input>

    <input type="password">
    <input type="submit" value="Войти">
    </form>
`;
const signinFormComponent = new SigninForm({
  tag: "form",
  body: !user ? bodySignin : "",
});

headerComponent.render();
signinFormComponent.render();
