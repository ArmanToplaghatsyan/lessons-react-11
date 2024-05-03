import {
    addDoc,
    collection,
    getDocs,
    where,
    query,
    getDoc,
    doc,
    deleteDoc,
    updateDoc,
  } from 'firebase/firestore';
  import { db } from './config';
import { MyCollection, MyWhere } from '../type/type';
  
  export const addData = async <T>(
    name: MyCollection,
    data: T | any,
  ): Promise<string> => {
    const coll = collection(db, name);
    const obj = await addDoc(coll, data);
    return obj.id;
  };
  
  export const getData = async <T>(name: MyCollection): Promise<T[]> => {
    const coll = collection(db, name);
    const obj = await getDocs(coll);
    const arr = obj.docs.map((elm) => ({ ...elm.data(), id: elm.id }) as T);
    return arr;
  };
  
  export const searchData = async <T>(
    name: MyCollection,
    key: string,
    myWhere: MyWhere,
    value: any,
  ): Promise<T[]> => {
    const coll = collection(db, name);
    const x = query(coll, where(key, myWhere, value));
    const obj = await getDocs(x);
    const arr = obj.docs.map((elm) => ({ ...elm.data(), id: elm.id }) as T);
    return arr;
  };
  
  export const getDataById = async <T>(
    name: MyCollection,
    id: string,
  ): Promise<T> => {
    const coll = collection(db, name);
    const obj = await getDoc(doc(coll, id));
    return { ...obj.data(), id: obj.id } as T;
  };
  
  export const deleteDataById = async <T>(
    name: MyCollection,
    id: string,
  ): Promise<boolean> => {
    const coll = collection(db, name);
    const obj = await deleteDoc(doc(coll, id));
    return true;
  };
  
  export const updateData = async<T>(name: MyCollection, id: string, obj: T |any):Promise<boolean>=>{
      const coll = collection(db, name);
      await updateDoc(doc(coll, id), obj);
      return true;
  }
  