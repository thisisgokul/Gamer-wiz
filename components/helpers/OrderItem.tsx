import { Order } from '@/types';
import React from 'react';

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div className="bg-metalicblack text-zinc-200 shadow-yellowGlight w-full md:w-1/2 shadow-inner rounded-md p-4 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src={order.picture}
            alt={order.itemName}
            className="w-16 rounded-xl h-16 object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{order.itemName}</h2>
            <div className="flex sm:flex-row sm:items-center flex-col">
              <p className="md:mr-4">{order.userName}</p>
              <p className="font-bold">{order.email}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-50">{`$${order.price}`}</p>
          <p className="text-sm font-semibold  text-green-400">Paid</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
