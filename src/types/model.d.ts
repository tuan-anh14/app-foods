
export {};

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        statusCode: number | string;
        data?: T;
}
    interface IRegister {
        id: string
    }

    interface IUserLogin{
        user: {
            id: string,
            email: string,
            fcmTokens: [],
            photo: string,
            phone: string,
            name: string,
            address: string
        };
        accesstoken: string
    }

    interface ITopRestaurant {
        _id: string,
        name: string,
        phone: string,
        address:string,
        email: string,
        rating: number,
        image: string,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
    }

    interface IRestaurant {
        _id: string,
        name: string,
        phone: string,
        address:string,
        email: string,
        rating: number,
        image: string,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,

        menu: IMenu[];
    }

    interface IMenu {
        _id: string;
        restaurant: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        menuItem: IMenuItem[]
    }
    interface IMenuItem {
        _id: string;
        menu: string;
        title: string;
        description: string;
        basePrice: number,
        image: string;
        options: {
        title: string;
        description: string;
        additionalPrice: number;
        }[],
        createdAt: Date;
        updatedAt: Date;
    }
        
}