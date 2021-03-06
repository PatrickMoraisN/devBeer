import React from 'react';
import CheckoutTable from '../../components/CheckoutTable';
import DeliveryDetails from '../../components/DeliveryDetails';
import MenuCostumer from '../../components/MenuCustomer';
import { useCart } from '../../hooks/useCart';
import './style.css';

function CheckoutPage() {
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem('carrinho')));

  const { totalValue } = useCart();

  return (
    <section className="checkoutPage">
      <MenuCostumer />
      <CheckoutTable cart={ cart } setCart={ setCart } />
      <div className="totalCheckoutValue">
        Total: R$
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {totalValue.toFixed(2).replace('.', ',')}
        </span>
      </div>
      <DeliveryDetails />
    </section>
  );
}

export default CheckoutPage;
