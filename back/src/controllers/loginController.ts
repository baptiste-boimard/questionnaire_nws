const loginController = {

  async login(req: any) {
    console.log('login', req.body);
  },
  async signup() {
    console.log('signup');
    
  }
};

export default loginController;