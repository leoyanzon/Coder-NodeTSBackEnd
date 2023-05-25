import { FullProductInterface } from "./product.interfaces";
import { FullCartInterface } from "./cart.interfaces";

export interface navBarInterface { 
    title: string,
    link: string
}

export interface mainInterface {
    user?: string,
    isAuthenticated?: boolean,
    products? : FullProductInterface[],
    cart?: FullCartInterface,
}

export interface outputMessageInterface {
    navBar: navBarInterface[],
    main: mainInterface,
    errors?: any
}

export interface messageInputInterface{
    user? : any | null,
    products? : FullProductInterface[] | null,
    cart? : FullCartInterface | null,
    err? : object | null,
}