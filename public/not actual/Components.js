class Component {
  constructor({ tag, className, parentSelector, body }) {
    this.body = body;
    this.el = document.createElement(tag);
    if (className) this.el.setAttribute("class", className);

    try {
      document.querySelector(parentSelector).appendChild(this.el);
    } catch (error) {
      document.body.appendChild(this.el);
    }
  }

  render() {
    this.el.innerHTML = this.body;
  }
}

class Header extends Component {}

class SigninForm extends Component {}
