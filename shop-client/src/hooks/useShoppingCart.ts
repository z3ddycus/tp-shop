import { useLocalStorage } from 'usehooks-ts';

import { Product } from '../types';

type ShoppingCart = Product[];

export function useShoppingCart() {
    const [items, setItems] = useLocalStorage<ShoppingCart>('shopping-cart', []);

    const addItem = (product: Product) => {
        if (items.some((item) => item.id === product.id)) return;
        setItems((items) => [...items, product]);
    };

    const hasItem = (product: Product) => items.some((item) => item.id === product.id);

    const removeItem = (product: Product) => {
        setItems((items) => items.filter((item) => item.id !== product.id));
    };

    return {
        addItem,
        hasItem,
        removeItem,
        items,
    };
}
