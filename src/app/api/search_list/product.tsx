import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import ProductPreview from '@/app/lib/model/product_review';

const searchProductsByName = async (name?: string): Promise<ProductPreview[]> => {
    const productsRef = collection(db, 'product');
    
    let q;

    if (name) {
        q = query(
            productsRef,
            where('name', '>=', name),
            where('name', '<=', name + '\uf8ff')
        );
    } else {
        q = query(productsRef);
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        product_id: doc.id,
        ...doc.data()
    } as ProductPreview));
};

export default searchProductsByName;