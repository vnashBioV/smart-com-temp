"use client"
import React, {createContext, useState, useEffect} from 'react'
import { client } from "../lib/sanity";


export const DataFetched = createContext()

const DataFetchedProvider = ({children}) => {
    const [heroData, setHeroData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [cartState, setCartState] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
      const getHeroImages = async () => {
        const query = `*[_type == 'hero']`;
        try {
          const data = await client.fetch(query);
          return data;
        } catch (error) {
          console.error('Error fetching hero data:', error);
          return null;
        }
      };
  
      const getCategories = async () => {
        const query = `*[_type == 'category']`;
        try {
          const data = await client.fetch(query);
          return data;
        } catch (error) {
          console.error('Error fetching categories:', error);
          return null;
        }
      };

      const getBlog = async () => {
        const query = `*[_type == 'blog']`;
        try {
          const data = await client.fetch(query);
          return data;
        } catch (error) {
          console.error('Error fetching categories:', error);
          return null;
        }
      };
  
      const getProduct = async () => {
        const query = `*[_type == 'product']{
          ...,
          categories[]->{
            name
          }
        }`;
        try {
          const data = await client.fetch(query);
          return data;
        } catch (error) {
          console.error('Error fetching product data:', error);
          return null;
        }
      };
  
      const fetchData = async () => {
        const [heroData, productData, categories, blogData] = await Promise.all([getHeroImages(), getProduct(), getCategories(), getBlog()]);
        console.log("🚀 ~ fetchData ~ categories:", categories)
        if (heroData) setHeroData(heroData);
        if (productData) setProductData(productData);
        if (categories) setCategoriesData(categories);
        if (blogData) setBlogData(blogData);
      };
  
      fetchData();
    }, []);

    return (
        <DataFetched.Provider value={{
            heroData, 
            setHeroData, 
            productData, 
            setProductData,
            cartState,
            setCartState,
            categoriesData, 
            setCategoriesData,
            blogData, 
            setBlogData
        }}>
            {children}
        </DataFetched.Provider>
    )
}

export default DataFetchedProvider
