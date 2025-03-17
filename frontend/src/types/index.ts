export interface IPaginatedResponse {
  total: number;
  skip: number;
  limit: number;
}

export type PaginationFilters = {
  limit?: number;
  skip?: number;
};

export interface IStore {
  // jwtToken: string;
  // login(email: string, password: string): Promise<void>;
  // register(name: string, email: string, password: string): Promise<void>;

  users: IPaginatedUsers;
  fetchUsers(filters?: PaginationFilters): Promise<IPaginatedUsers>;
  createUser(payload: CreateUserPayload): Promise<User>;
  deleteUser(user_id: number): Promise<void>;

  products: IPaginatedProducts;
  fetchProducts(filters?: PaginationFilters): Promise<IPaginatedProducts>;
  createProduct(payload: CreaeteProductPayload): Promise<Product>;
  deleteProduct(product_id: number): Promise<void>;
}

/**
 * Users
 */
export interface IPaginatedUsers extends IPaginatedResponse {
  users: Array<User>;
}

export type CreateUserPayload = Pick<
  User,
  "email" | "username" | "phone" | "birthDate" | "gender"
>;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female"; // Assuming gender is limited to these two options.
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: "admin" | "moderator" | "user";
};

/**
 * Products
 */
export interface IPaginatedProducts extends IPaginatedResponse {
  products: Array<Product>;
}

export type CreaeteProductPayload = Pick<
  Product,
  "sku" | "title" | "category" | "price" | "description"
>;

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
};

type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
};

type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

/**
 * Auth
 */
export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};
