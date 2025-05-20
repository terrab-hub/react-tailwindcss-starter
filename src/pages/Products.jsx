import { useState, useEffect } from 'react';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await api.createProduct(formData);
      setProducts([...products, newProduct]);
      setFormData({ name: '', price: '', description: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      
      {/* Add Product Form */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </Card>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-indigo-600 font-semibold mt-2">${product.price}</p>
            <Button
              variant="danger"
              onClick={() => handleDelete(product.id)}
              className="mt-4"
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products; 