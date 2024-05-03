export interface IUser{
    id: string,
    name: string,
    surname: string,
    email: string,
    age: number,
    password: string,
}

export interface IPost{
    id: string;
    title: string,
    body: string,
    user_id: string
}


export enum MyCollection {
    USERS = 'users',
    POSTS = 'posts'
  }
  export enum MyWhere {
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL_TO = '<=',
    EQUAL_TO = '==',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL_TO = '>=',
    NOT_EQUAL_TO = '!=',
    ARRAY_CONTAINS = 'array-contains',
    ARRAY_CONTAINS_ANY = 'array-contains-any',
    IN = 'in',
    NOT_IN = 'not-in'
  }
  