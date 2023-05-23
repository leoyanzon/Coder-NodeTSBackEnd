interface navBarInterface { 
    title: string,
    link: string
}

interface mainInterface {
    user?: string,
    isAuthenticated?: boolean,
    products? : any[],
    cart?: any[],
}

interface outputMessageInterface {
    navBar: navBarInterface[],
    main: mainInterface,
    errors?: any
}

interface messageInputInterface{
    user? : any | null,
    products? : any[] | null,
    cart? : any[] | null,
    err? : object | null,
}

const createMessage = ( page : string , req : any , { user = "", products = null , cart = null, err = null } : messageInputInterface  = {}) : outputMessageInterface => {
    const navBar : navBarInterface[] = [{ title: "Home", link: "/"}];
    const authenticated : boolean = (typeof req.isAuthenticated == 'function') ? req.isAuthenticated() : false ;
    const username = user? user.username : null;
    
    const main : mainInterface = {
        user: username,
        isAuthenticated : authenticated,
    };
    if (products !== null) main.products = products;
    if (cart !== null) main.cart = cart;

    if (page === 'signIn'){
        navBar.push({ title: "Register", link: "/signup"});
    }
    if (page === 'signUp'){
        navBar.push({ title: "Signin", link: "/signin"});
    }
    if (page === 'signOut'){
        navBar.push({ title: "Register", link: "/signup"});
    }
    if (page === 'home' || page === 'cart'){
        navBar.push({ title: "Cart", link: "/cart"});
        navBar.push({ title: "Logout", link: "/api/auth/signout"});
    }
    if (page === 'error' && authenticated){
        navBar.push({ title: "Cart", link: "/cart"});
        navBar.push({ title: "Logout", link: "/api/auth/signout"});
    }
    if (page === 'error' && !authenticated){
        navBar.push({ title: "Signin", link: "/signin"});
        navBar.push({ title: "Register", link: "/signup"});
    }

    const message : outputMessageInterface = {
        navBar: navBar,
        main: main,
        errors: err
    }
    return message
}

export default createMessage