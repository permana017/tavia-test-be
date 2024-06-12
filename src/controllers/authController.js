import {
  confirmEmailService,
  forgotPasswordService,
  loginService,
  refreshAuthTokenService,
  registerService,
  resetPasswordService,
} from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
    const user = await registerService(req);
    return res.send(user).status(200).json();
  } catch (error) {
    return res.send(error).status(500).json();
  }
};

export const confirmEmailController = async (req, res) => {
  const { confirmationCode } = req.params;

  try {
    const user = await confirmEmailService(confirmationCode);
    res.status(200).json({ message: "Email confirmed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error confirming email", error: error.message });
  }
};
export const loginController = async (req, res) => {
  try {
    const { user, token, refreshToken } = await loginService(req);
    res.status(200).json({ message: "Login successful", token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await forgotPasswordService(email);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error sending password reset email",
      error: error.message,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const user = await resetPasswordService(req);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const { user, token } = await refreshAuthTokenService(refreshToken);
    res.status(200).json({ message: "Success refreshing token", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error refreshing token", error: error.message });
  }
};
