// import { compareDesc, compareAsc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export default async function getAllDishes() {
    const snapshot = await db.collection('dishes').get();
  
    const dishes = [];
  
    snapshot.forEach((doc) => {
      dishes.push({ id: doc.id, ...doc.data() });
    });
  
    return { dishes: dishes };
  }
