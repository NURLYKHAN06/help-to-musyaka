// api  urls
const API_SIGNIN = "api/auth/signin";
const API_SIGNUP = "api/auth/signup";
const API_GET_VOTES = "api/votes";
const API_ADD_VOTE = "api/votes/add";
const API_TO_VOTE = "api/votes/vote";

const App = {
  data() {
    return {
      user: null,
      votes: [],
      inputValues: {
        username: "",
        password: "",
        voteTitle: "",
      },
      modals: {
        signin: false,
        signup: false,
        addVote: false,
      },
      loader: false,
      alert: {
        type: null,
        message: "",
      },
      timeout: null,
    };
  },
  methods: {
    // auth methods
    signin: async function (ev) {
      ev.preventDefault();
      const { username, password } = this.$data.inputValues;
      if (!username.trim().length && !password.trim().length) return;
      this.setLoader(true);
      const response = await postRequest(API_SIGNIN, { username, password });
      if (response.error) {
        console.log(4);
        this.showAlert("error", response.error);
        this.setLoader(false);
        return;
      }
      saved.value = {
        username,
        token: response.data.token,
        userId: response.data.userId,
      };
      this.$data.user = { username, id: response.data.userId };
      this.$data.inputValues.username = "";
      this.$data.inputValues.password = "";
      this.changeModal("signin", false);
      this.setLoader(false);
    },
    signout: function () {
      this.$data.user = null;
      saved.value = null;
    },
    signup: async function (ev) {
      ev.preventDefault();
      const { username, password } = this.$data.inputValues;
      if (!username.trim().length && !password.trim().length) return;
      this.setLoader(true);
      const response = await postRequest(API_SIGNUP, { username, password });
      if (response.error) {
        this.showAlert("error", response.error);
        this.setLoader(false);
        return;
      }
      this.$data.inputValues.username = "";
      this.$data.inputValues.password = "";
      this.changeModal("signup", false);
      this.showAlert("success", "Пользователь успешно создано");
      this.setLoader(false);
    },
    // vote methods
    getVotes: async function () {
      this.setLoader(true);
      const response = await getRequest(API_GET_VOTES);
      if (response.error) {
        this.showAlert("error", response.error);
        this.setLoader(false);
        return;
      }
      this.$data.votes = response.data.votes;
      this.setLoader(false);
    },
    addVote: async function (ev) {
      ev.preventDefault();
      const { voteTitle } = this.$data.inputValues;
      if (!voteTitle.trim().length) return;
      this.setLoader(true);
      const response = await postRequest(API_ADD_VOTE, {
        title: voteTitle,
        authorId: this.$data.user.id,
      });
      if (response.error) {
        this.showAlert("error", response.error);
        this.setLoader(false);
        return;
      }
      this.$data.inputValues.voteTitle = "";
      this.changeModal("addVote", false);
      this.getVotes();
      this.showAlert("success", "Успешно добавлено.");
      this.setLoader(false);
    },
    toVote: async function (voteId) {
      this.setLoader(true);
      const response = await postRequest(API_TO_VOTE, {
        id: voteId,
        voterId: this.$data.user.id,
      });

      if (response.error) {
        this.showAlert("error", response.error);
        this.setLoader(false);
        return;
      }
      this.getVotes();
    },
    // ui methods
    changeModal: function (modal, state) {
      this.$data.modals[modal] = state;
    },
    showAlert: function (type, message) {
      console.log(message);
      this.$data.alert = {
        type,
        message,
      };
    },
    setLoader: function (state) {
      this.$data.loader = state;
    },
  },
  computed: {
    computedVotes: function () {
      return this.votes.map((vote) => {
        if (!this.$data.user) return vote;
        const isVoted = vote.voters.find((voter) => voter.id == this.$data.user.id);
        if (isVoted) {
          return {
            ...vote,
            voted: true,
          };
        }
        return vote;
      });
    },
  },
  created() {
    // check token to exist
    const data = saved.value;
    if (data) {
      this.$data.user = { username: data.username, id: data.userId };
    }
    // get votes
    this.getVotes();
  },
  watch: {
    alert: function (newValue, prevValue) {
      if (this.$data.timeout) {
        clearTimeout(this.$data.timeout);
      }
      this.$data.timeout = setTimeout(() => {
        this.$data.alert = {
          type: null,
          message: "Text",
        };
        clearTimeout(this.$data.timeout);
        this.$data.timeout = null;
      }, 1500);
    },
  },
};

Vue.createApp(App).mount("#app");
