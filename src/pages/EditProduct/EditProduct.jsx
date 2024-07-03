import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct({ products, setProducts }) {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (products && id) {
      setProductToUpdate(
        products.find((product) => Number(product.id) === Number(id))
      );
    }
  }, [products, id]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setProductToUpdate({ ...productToUpdate, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedProducts = products.map((product) =>
      product.id === productToUpdate.id ? productToUpdate : product
    );
    setProducts(updatedProducts);
  }

  if (!productToUpdate) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={productToUpdate.name}
      />
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditProduct;
