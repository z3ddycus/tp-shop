import { useLocalStorage } from 'usehooks-ts';

import { Product } from '../types';

type ShoppingCart = Product[];

export function useShoppingCart() {
    const [items, setItems] = useLocalStorage<ShoppingCart>('shopping-cart', []);

    const addItem = (product: Product) => {
        if (items.includes(product)) return;
        setItems((items) => [...items, product]);
    };

    const hasItem = (product: Product) => items.includes(product);

    const removeItem = (product: Product) => {
        if (!items.includes(product)) return;
        setItems((items) => items.filter((item) => item !== product));
    };

    return {
        addItem,
        hasItem,
        removeItem,
        items,
    };
}
