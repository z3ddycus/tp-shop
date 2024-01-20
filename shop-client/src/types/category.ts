type CategoryBase = {
    name: string;
    imageUrl: string;
};

export type Category = {
    id: number;
} & CategoryBase;

export type MinimalCategory = {
    id?: string;
} & CategoryBase;
