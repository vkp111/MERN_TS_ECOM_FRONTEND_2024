// user type
export type User = {
    name: string
    email: string
    photo: string
    gender: string
    role: string
    dob: string
    _id:string
}


// Products
export type Product = {
    name: string
    price: string
    stock: string
    category: string
    photo: string
    _id:string
}

export type ShippingInfo = {
    address: string
    city: string
    state: string
    country: string
    pinCode: string
}


export type CartItem = {
    productId: string
    photo: string
    name: string
    price: number
    quantity: number
    stock: number
}


export type OrderItem = Omit<CartItem, "stock"> & {_id:string}


export type Order = {
    orderItems: OrderItem[]
    shippingInfo: ShippingInfo
    subtotal: number
    tax: number
    shippingCharges:number
    discount: number
    total:number
    status:string
    user:{
        name: string
        _id:string
    }
    _id:string
}

type CountAndChange = {
    revenue: number
    product: number
    user: number
    order:number
}

type LatestTransaction = {

      _id: string;
      amount: number;
      discount: number;
      quantity: number;
      status: string;
}

export type Stats = {
            categoryCount: Record<string, number>[],
            changePercent: CountAndChange,
            count: CountAndChange,
            chart:{
                order: number[],
                revenue: number[]
            },
            userRatio: {
                male: number
                female: number
            },
            latestTransaction: LatestTransaction[]
} 

type OrderFulfillment = {
        processing: number;
        shipped: number;
        delivered: number;
    }

type RevenueDistribution = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
}

type UserAgeGroup = {
    teen: number;
    adult: number;
    old: number;
}

export type Pie = {
    orderFulfillment: OrderFulfillment
    productCategories: Record<string, number>[],
    stockAvailablity: {
        inStock: number;
        outOfStock: number;
    },
    revenueDistribution: RevenueDistribution ,
    usersAgeGroup: UserAgeGroup,

    adminCustomer: {
        admin: number;
        customer: number;
    },
} 


export type Bar = {
    users: number[];
    products: number[];
    orders: number[];
  };
  
  export type Line = {
    users: number[];
    products: number[];
    discount: number[];
    revenue: number[];
  };