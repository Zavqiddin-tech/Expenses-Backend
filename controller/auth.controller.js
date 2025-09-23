const authService = require("../service/auth/auth.service");

class AuthController {
  async regis(req, res, next) {
    try {
      const {
        fName,
        lName,
        userName,
        password,
        activated,
        role,
      } = req.body;
      const data = await authService.regis(
        fName,
        lName,
        userName,
        password,
        activated,
        role,
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      const data = await authService.login(userName, password);
      return res.json({ ...data });
    } catch (error) {
      next(error);
    }
  }

  // check
  async checkUser(req, res, next) {
    try {
      const user = await authService.checkUser(req.user.id, res);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async checkAdmin(req, res, next) {
    try {
      const data = await authService.checkAdmin(req.user.id, res);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // for frontend
  async getAll(req, res, next) {
    try {
      const data = await authService.getAll();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const data = await authService.changeStatus(req.body);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  /*   async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      return res.json({ ...data, refreshToken: null });
    } catch (error) {
      next(error);
    }
  } */
  /*  async deleteUser(req, res, next) {
    try {
      const data = await authService.deleteUser(req.user, req.params.id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  } */
}

module.exports = new AuthController();
