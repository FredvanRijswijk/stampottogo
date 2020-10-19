import getAllDishes  from '@/config/db-admin';

export default async (req, res) => {
  try {
    const { dishes } = await getAllDishes();

    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error });
  }
};