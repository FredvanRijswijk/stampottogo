import getAllDishes  from '@/config/db-admin';
// import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
  try {
    // const { uid } = await auth.verifyIdToken(req.headers.token);
    const { dishes } = await getAllDishes();

    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error });
  }
};