import express from 'express';
// import authMiddleware from '../middleware/authMiddleware.js';  // للحماية

const router = express.Router();

// مسارات المستخدمين (تحتاج مصادقة)
// router.get('/profile', authMiddleware, getUserProfile);
// router.put('/profile', authMiddleware, updateUserProfile);
// router.get('/', authMiddleware, getAllUsers);  // للأدمن فقط

router.get('/test', (req, res) => {
    res.json({ message: 'مسار المستخدمين يعمل' });
});

export default router;