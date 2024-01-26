import OpeningHours from './openingHours';

export type Shop = {
    id: number;
    createdAt: Date;
    name: string;
    inVacations: boolean;
    openingHours: OpeningHours[];
    nbProducts: number;
    nbCategories: number;
    latitude: number;
    longitude: number;
};

export type MinimalShop = {
    id?: string;
    name: string;
    inVacations: boolean;
    openingHours: { day: number; openAt: string; closeAt: string }[];
    latitude: number;
    longitude: number;
};
