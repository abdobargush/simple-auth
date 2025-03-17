import { IPaginatedProducts, IPaginatedUsers, IStore } from "@/types";
import { create } from "zustand";
import qs from "query-string";

const API_URL = process.env.NEXT_PUBLIC_DUMMY_API_URL;
// const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useStore = create<IStore>()((set, get) => ({
  // jwtToken: "",
  // login(name, password) {
  //   return new Promise((resolve, reject) => {});
  // },
  // register(name, email, password) {
  //   return new Promise((resolve, reject) => {});
  // },

  users: {
    users: [],
    limit: 30,
    skip: 0,
    total: 0,
  },
  fetchUsers(filters = {}) {
    return new Promise((resolve, reject) => {
      const queryStrings = qs.stringify(
        { limit: get().users.limit, ...filters },
        { skipNull: true, skipEmptyString: true }
      );

      fetch(`${API_URL}/users?${queryStrings}`)
        .then((res) => res.json())
        .then((data: IPaginatedUsers) => {
          set({ users: data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createUser(payload) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          set({
            users: {
              ...get().users,
              users: [data, ...get().users.users],
              total: get().users.total + 1,
            },
          });

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteUser(user_id) {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/users/${user_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          const updatedUsers = get().users.users.filter(
            (user) => user.id !== user_id
          );

          set({
            users: {
              ...get().users,
              users: updatedUsers,
              total: get().users.total - 1,
            },
          });

          resolve();
        })
        .catch((error) => {
          reject(error);
        })
    );
  },

  /**
   * Products
   */
  products: {
    products: [],
    limit: 30,
    skip: 0,
    total: 0,
  },
  fetchProducts(filters = {}) {
    return new Promise((resolve, reject) => {
      const queryStrings = qs.stringify(
        { limit: get().products.limit, ...filters },
        { skipNull: true, skipEmptyString: true }
      );

      fetch(`${API_URL}/products?${queryStrings}`)
        .then((res) => res.json())
        .then((data: IPaginatedProducts) => {
          set({ products: data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createProduct(payload) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          set({
            products: {
              ...get().products,
              products: [{ ...data, ...payload }, ...get().products.products],
              total: get().products.total + 1,
            },
          });

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteProduct(user_id) {
    return new Promise((resolve, reject) =>
      fetch(`${API_URL}/products/${user_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          const updatedProducts = get().products.products.filter(
            (user) => user.id !== user_id
          );

          set({
            products: {
              ...get().products,
              products: updatedProducts,
              total: get().products.total - 1,
            },
          });

          resolve();
        })
        .catch((error) => {
          reject(error);
        })
    );
  },
}));

export default useStore;
