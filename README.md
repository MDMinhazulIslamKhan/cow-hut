# **Cow Hut Admin With Auth**

## **Live Link: https://cow-hut-dun.vercel.app**

---

## Welcome route

- [Website Link](https://cow-hut-dun.vercel.app)

---

## Auth routes / Common routes

### Registration or signup for user (post route)

- /api/v1/auth/signup [Link](https://cow-hut-dun.vercel.app/api/v1/auth/signup)

- Need **name (firstName, lastName), phoneNumber, password, role, address, budget, income** from **req.body**

### Login (post route)

- /api/v1/auth/login [Link](https://cow-hut-dun.vercel.app/api/v1/auth/login)

- Need **phoneNumber, password** from **req.body**

### Refresh token (post route)

- /api/v1/auth/refresh-token [Link](https://cow-hut-dun.vercel.app/api/v1/auth/refresh-token)

- Need **refreshToken** from **req.cookies**

---

## User routes

### Get all users (get route)

- /api/v1/users [Link](https://cow-hut-dun.vercel.app/api/v1/users)

- Need **jwt** from **req.headers.authorization** => (for admin)

### Get single users (get route)

- /api/v1/users/:id [Link](https://cow-hut-dun.vercel.app/api/v1/users/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin)

### Delete users (delete route)

- /api/v1/users/:id [Link](https://cow-hut-dun.vercel.app/api/v1/users/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin)

### Get own profile (get route)

- /api/v1/users/my-profile [Link](https://cow-hut-dun.vercel.app/api/v1/users/my-profile)

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

### Update own profile (patch route)

- /api/v1/users/my-profile [Link](https://cow-hut-dun.vercel.app/api/v1/users/my-profile)

- Need **updated profile info** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

### Update profile by admin (patch route)

- /api/v1/users/:id [Link](https://cow-hut-dun.vercel.app/api/v1/users/:id)

- Need **id** from **req.params**

- Need **updated profile info** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for admin)

---

## Cow routes

### Create cow (post route)

- /api/v1/cows [Link](https://cow-hut-dun.vercel.app/api/v1/cows)

- Need cow **name, age, price,location, breed, weight, label, sellerId** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for seller)

### Get all cows (get route)

- /api/v1/cows [Link](https://cow-hut-dun.vercel.app/api/v1/cows)

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

### Pagination and Filtering routes of Cows (get route)

- api/v1/cows?page=1&limit=10 (Page {default: 1} and limit {default: 10})

- api/v1/cows?sortBy=price&sortOrder=asc (sortBy and sortOrder {default: asc})

- api/v1/cows?sortBy=price&sortOrder=desc (sortBy and sortOrder)

- api/v1/cows?minPrice=20000&maxPrice=70000 (filter by minPrice {default: 0} and maxPrice {default: infinity})

- api/v1/cows?location=Dhaka (accurate search)

- api/v1/cows?searchTerm=chattog (any matching search)

### Get single cow (get route)

- /api/v1/cows/:id [Link](https://cow-hut-dun.vercel.app/api/v1/cows/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin, buyer, seller)

### Update cow (patch route)

- /api/v1/cows/:id [Link](https://cow-hut-dun.vercel.app/api/v1/cows/:id)

- Need **jwt** from **req.headers.authorization** => (for seller)

- Need **updated cow info** from **req.body**

- Need **id** from **req.params**

- Need to be the owner of the cow

### Delete cow (delete route)

- /api/v1/cows/:id [Link](https://cow-hut-dun.vercel.app/api/v1/cows/:id)

- Need **jwt** from **req.headers.authorization** => (for seller)

- Need **id** from **req.params**

- Need to be the owner of the cow

---

## Order routes

### Create order (post route)

- /api/v1/orders [Link](https://cow-hut-dun.vercel.app/api/v1/orders)

- Need **cowId, password** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for buyer)

- Cow can't be sold out before your order is placed.

- Need more budget than the cow price.

### Get all orders history (get route)

- /api/v1/orders/all-orders [Link](https://cow-hut-dun.vercel.app/api/v1/orders/all-orders)

- Need **jwt** from **req.headers.authorization** => (for admin)

### Get single order history (get route)

- /api/v1/orders/:id [Link](https://cow-hut-dun.vercel.app/api/v1/orders/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization** => (for admin, buyer)

- Need to be a admin or the specific buyer of this order or specific seller of this order

---

## Admin routes

### Create admin (post route)

- /api/v1/admins/create-admin [Link](https://cow-hut-dun.vercel.app/api/v1/admins/create-admin)

- Need **name (firstName, lastName), phoneNumber, password, address** from **req.body**

- Need **jwt** from **req.headers.authorization** => (for admin)

---

---

---

## Admin Login Info

- phoneNumber : 01521438469

- password : 12345

```json
{
  "phoneNumber": "01521438469",
  "password": "12345"
}
```

---

---

---
