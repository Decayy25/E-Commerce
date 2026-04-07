export const getProducts = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API}/api/product/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.map(({ _id, ...rest}: any) => ({
            ...rest
        }));
    } catch (error) {
        console.error("Error Fecthing: ", error);
        console.log(`${import.meta.env.VITE_URL}`)
        return [];
    }
}