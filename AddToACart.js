export const AddToCart = (product, setCartState, setError) => {
  setCartState(prevCartState => {
    const existingProduct = prevCartState.find(cartItem => cartItem._id === product._id);

    if (existingProduct) {
      if (existingProduct.cartQuantity < existingProduct.quantity) {
        const updatedCart = prevCartState.map(cartItem =>
          cartItem.id === product.id
            ? {
                ...cartItem,
                cartQuantity: cartItem.cartQuantity + 1
              }
            : cartItem
        );
        setError(''); // Clear any existing error message
        return updatedCart;
      } else {
        const errorMessage = `There are only ${existingProduct.quantity} ${existingProduct.name} left in stock.`;
        setError(errorMessage);
        return prevCartState;
      }
    } else {
      setError('');
      return [...prevCartState, { ...product, cartQuantity: 1 }];
    }
  });
};
