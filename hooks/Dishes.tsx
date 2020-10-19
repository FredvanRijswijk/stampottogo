
export default async function useDishes() {

    return await fetch('http://localhost:3000/api/dishes').then((res) => res.json())
}

