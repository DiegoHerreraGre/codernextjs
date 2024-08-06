import { notFound } from 'next/navigation';
import ProductDetail from './ProductDetail';

async function getProduct(id) {
  const res = await fetch(`http://localhost:8080/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export default async function Page({ params }) {
  let product;
  try {
    const data = await getProduct(params.id);
    product = data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}