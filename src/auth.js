import firebase from './firebase'

const userRedirect = (user,obj,cb) => {
  if (user) {
    obj.authenticated = true
    obj.user = user
    localStorage.setItem('user', JSON.stringify(obj.user))
    cb()
  }
}


const auth = {

  authenticated: false,
  user: (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,

  login(email, password, cb) {
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
              if (res.operationType) {
                const {user} = res
                console.log(user)
                userRedirect(user,this, cb)
              } else {
                console.log(':(')
              }
            }).catch(err => console.log(err));
  },

  logout(cb){
    this.authenticated = false
    this.user = null
    localStorage.removeItem('user')
    cb()
  },

  isAuthenticated(){
    if (localStorage.getItem('user')) {
      this.authenticated = true;
      return this.authenticated;
    } else {
      this.authenticated = false;
      return this.authenticated;
    }
  },

  register(email, password,cb) {
    firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              console.log(res);
              if (res.operationType) {
                const {user} = res
                console.log(user)
                userRedirect(user,this, cb)
              } else {
                console.log(':(')
              }
            })
            .catch(err => console.log(err))
  }

}

export default auth
