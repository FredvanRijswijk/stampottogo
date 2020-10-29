import getDish  from '@/config/dish';

export default async (req, res) => {
    const id: string = req.query.slug as string
  try {
    const { dishes } = await getDish(id);

    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error });
  }
};