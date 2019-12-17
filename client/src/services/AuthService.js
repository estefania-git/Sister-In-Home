import axios from "axios";

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    });
  }

  signup = user => {
    return this.instance
      .post("/signup", user)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  login = user => {
    return this.instance
      .post("/login", user)
      .then(res => res.data)
      .catch(error => console.error(error));
  };

  loggedInUser = user => {
    return this.instance
      .get("/loggedin")
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch((error, req) => console.error(req));
  };

  upload = picture => {
    return this.instance
      .post("/upload", picture)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  logout = () => {
    return this.instance
      .post("/logout", {})
      .then(response => response.data)
      .catch(error => console.error(error));
  };

  updateUser = user => {
    return this.instance
      .post("/updateUser", user)
      .then(response => response.data)
      .catch(error => console.error(error));
  };

  updateImage = user => {
    const formData = new FormData();
    // Object.keys(user).forEach(key => {
    //   debugger;
    //   formData.append(key, user[key]);
    // });
    // debugger;
    formData.append("photo", user.photo);

    return this.instance
      .post("/updateImage", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(response => response.data)
      .catch(error => console.error(error));
  };
}

export default AuthService;
