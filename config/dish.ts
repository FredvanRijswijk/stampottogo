import { db } from './firebase-admin';


  export default async function getDish(slug: string) {

    const snapshot = await db.collection('dishes').where('sku', '==', slug).get();
  
    const dishes = [];
  
    snapshot.forEach((doc) => {
      dishes.push({ id: doc.id, ...doc.data() });
    });
  
    return { dishes: dishes };
  }