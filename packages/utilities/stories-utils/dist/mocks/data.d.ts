type Animal = {
    label: string;
    value: string;
    description?: string;
};
type User = {
    id: number;
    name: string;
    role: string;
    team: string;
    status: string;
    age: string;
    avatar: string;
    email: string;
};
declare const animalsData: Animal[];
declare const usersData: User[];

export { Animal, User, animalsData, usersData };
