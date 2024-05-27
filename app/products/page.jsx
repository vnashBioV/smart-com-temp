
'use client'
import { useState, useEffect, useContext } from "react";
import Product from '../components/Product'
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Slider } from "../components/ui/slider";
import { DataFetched } from '../context/DataFetched';

const page = () => {
    const {productData, categoriesData} = useContext(DataFetched);
    console.log("🚀 ~ page ~ productData:", productData[0]?.price)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const [price, setPrice] = useState(2000);

    useEffect(() => {
        const filtered = productData.filter((product) => {
             const categoryMath = 
                 category === 'all' 
                 ? product 
                 : product.categories.some((categ) => categ.name === category
             );
             const priceMath = product.price <= price;
             return categoryMath && priceMath 
        });
        setFilteredProducts(filtered);
    },[category, price, productData])

    // getting the highest price
    const getHighestPrice = (products) => {
        const prices = products.map(product => product.price);
        return Math.max(...prices);
    };

    const highestPrice = getHighestPrice(productData);

    return (
        <section className="min-h-[80vh] py-10 mt-20">
                <div className="container mx-auto">
                    <div className="flex flex-row justify-start ">
                        {/* sidebar */}
                        <aside className="w-full p-4 mb-8 xl:w-[300px] xl:h-[84vh]">
                            <RadioGroup 
                                defaultValue="all"
                                className="flex flex-col gap-6 mb-12"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem 
                                        value='all' 
                                        id='all'
                                        onClick={() => setCategory('all')}
                                    />
                                    <label htmlFor="all" className="text-[.9rem]">All</label>
                                </div>
                                {categoriesData.length > 0 && categoriesData.filter(category => 
                                    ["pants", "t-shirts", "shirts", "denim", "dresses", "tops", "men", "women"].includes(category.name.toLowerCase())
                                )
                                .map((category, i) => (
                                    <div 
                                        key={i}
                                        className="flex items-center space-x-2"
                                    >
                                        <RadioGroupItem 
                                            value={category.name} 
                                            id={category.name}
                                            onClick={() => setCategory(category.name)}
                                        />
                                        <label htmlFor="road" className="text-[.9rem]">{category.name}</label>
                                    </div>
                                ))}
                                
                            </RadioGroup>
                            {/* price slider*/}
                            <div className="max-w-full">
                                <div className="text-lg w-full mb-4 font-medium">
                                    Max Price: <span className="text-accent font-bold ml-2">${price}</span>
                                    <span className="ml-2">
                                        ({
                                            filteredProducts.length > 1 
                                            ? `${filteredProducts.length} items` 
                                            : filteredProducts === 0 
                                            ? `${filteredProducts.length} items` 
                                            : `${filteredProducts.length} item`
                                        })
                                    </span>
                                </div>
                                <Slider 
                                    defaultValue={[900]}
                                    max={highestPrice? highestPrice : 1000}
                                    step={1}
                                    onValueChange={(val) => setPrice(val[0])}
                                    className=" cursor-grab"
                                />
                            </div>
                        </aside>
                        {/* product list */}
                        <div className="w-full pl-10 xl:w-[1050px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-h-[84vh] h-[84vh] overflow-scroll scrollbar overflow-x-hidden pr-3 gap-[30px]">
                                {filteredProducts && filteredProducts.map((product,i) => {
                                    return (
                                        <Product key={i} product={product}/>  
                                    )
                                })} 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default page
