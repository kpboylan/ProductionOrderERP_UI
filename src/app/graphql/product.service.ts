import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProducts(maxPrice?: number): Observable<Product[]> {
  const hasMaxPrice = typeof maxPrice === 'number';

  const query = hasMaxPrice
    ? gql`
        query GetFilteredProducts($maxPrice: Decimal) {
          products(where: { price: { lte: $maxPrice } }) {
            id
            name
            price
            createdAt
          }
        }
      `
    : gql`
        query GetAllProducts {
          products {
            id
            name
            price
            createdAt
          }
        }
      `;

  return this.apollo
    .watchQuery<{ products: Product[] }>({
      query,
      variables: hasMaxPrice ? { maxPrice } : {},
      fetchPolicy: 'no-cache',
    })
    .valueChanges.pipe(map((result) => result.data.products));
}






//   getProducts(variables?: { maxPrice?: number }): Observable<Product[]> {
//   return this.apollo
//     .watchQuery<{ products: Product[] }>({
//       query: gql`
//         query ($maxPrice: Decimal) {
//           products(where: { price: { lte: $maxPrice } }) {
//             id
//             name
//             price
//             createdAt
//           }
//         }
//       `,
//       variables: variables || {},
//     })
//     .valueChanges.pipe(map((result) => result.data.products));
// }


  // getProducts(maxPrice?: number): Observable<Product[]> {
  //   return this.apollo
  //     .watchQuery<{ products: Product[] }>({
  //       query: gql`
  //         query($maxPrice: Decimal) {
  //           products(where: { price: { lte: $maxPrice } }) {
  //             id
  //             name
  //             price
  //             createdAt
  //           }
  //         }
  //       `,
  //       variables: {
  //         maxPrice: maxPrice ?? null,
  //       },
  //     })
  //     .valueChanges.pipe(map((result) => result.data.products));
  // }
}
