import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MenuCostumer from '../../components/MenuCustomer';
import OrderBox from '../../components/OrderBox';
import api from '../../services/api';

import './style.css';

function OrderDetails() {
  const [sale, setSale] = useState('');
  const { id: idOrder } = useParams();

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    const fetchSale = async () => {
      const saleFetched = await api.getSaleById(idOrder, token);

      setSale(saleFetched);
    };

    fetchSale();
  }, [idOrder]);

  console.log(sale);

  const createOrder = () => (
    <div className="saleDetailsContainer">
      <div className="sale-card">
        Detalhe do Pedido
        <OrderBox props={ sale } />
      </div>
    </div>
  );

  return (
    <section className="orderDetailsPage">
      <MenuCostumer />
      {sale ? createOrder() : <p>Carregando pedido!</p>}
    </section>
  );
}

export default OrderDetails;
