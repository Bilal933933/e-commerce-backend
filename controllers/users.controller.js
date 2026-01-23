import asyncHandler from "../middleware/asyncHandler.js";
import UsersService from "../services/users.service.js";

export const getUserProfile = asyncHandler(async (req, res) => {
    const result = await UsersService.getUserProfile(req.user.id);
    res.status(200).json({ status: "success", data: result });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const result = await UsersService.updateUserProfile(req.user.id, req.body);
    res.status(200).json({ status: "success", data: result });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const result = await UsersService.getAllUsers();
    res.status(200).json({ status: "success", data: result });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const result = await UsersService.deleteUser(req.params.id);
    res.status(200).json({ status: "success", data: result });
})