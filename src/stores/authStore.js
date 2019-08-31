import { decorate, observable } from "mobx";
import axios from "axios";

class AuthStore {
  user = null;

  setUser = token => {
    if (token) {
      localStorage.setItem("myToken", token);
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const decodedUser = jwt_decode(token);
      this.user = decodedUser;
    } else {
      localStorage.removeItem("myToken");
      delete axios.defaults.headers.common.Authorization;
      this.user = null;
    }
  };

  signup = async userData => {
    try {
      await axios.post("https://the-index-api.herokuapp.com/signup", userData);
      const user = res.data;
      console.log("USER", user);
      this.setUser(user.token);
      this.props.history.push("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  login = async userData => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      console.log("LOGGING IN", user);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  logout = () => {
    this.setUser();
    console.loge("LOGGED OUT");
  };
  checkforToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const user = jwt_decode(token);
      const currenTime = Date.now() / 1000;
      if (user.exp >= currenTime) {
        this.setUser(token);
      } else {
        this.logout;
      }
    }
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkforToken();
export default authStore;
