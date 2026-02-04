import UserActivity from "../models/UserActivity.model.js";
import validateId from "../validators/validateId.js";


class UserActivityService {
    static async logActivity({ userId, action, targetUserId = null, ip = null, userAgent = null, details = null }) {
        validateId(userId);
        const activity = new UserActivity({
            user: userId,
            action,
            targetUser: targetUserId,
            ip,
            userAgent,
            details,
        });
        await activity.save();
    }

    static async getUserActivities(userId, filter = {}) {
        validateId(userId);
        const query = { user: userId, ...filter };
        const activities = await UserActivity.find(query).sort({ timestamp: -1 });
        return activities;
    }
}

export default UserActivityService;