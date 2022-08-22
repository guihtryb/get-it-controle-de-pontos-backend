module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Fender Stratocaster',
          price: 999.70,
          url_image: 'http://localhost:3001/images/fender_strato.jpg',
          total_quantity: 5,
          points_converter: 0.50,
          size: '',
        },
        {
          name: 'Bose Headphone',
          price: 125.50,
          url_image: 'http://localhost:3001/images/bose_headphone.jpg',
          total_quantity: 10,
          points_converter: 0.50,
          size: '',
        },
        {
          name: 'Nike Shoes Soft-Ride',
          price: 270,
          url_image: 'http://localhost:3001/images/nike_shoes.jpg',
          total_quantity: 10,
          points_converter: 0.50,
          size: '39, 39, 40, 41, 42'
        },
        {
          name: 'Iphone 15',
          price: 2600,
          url_image: 'http://localhost:3001/images/iphone.jpg',
          total_quantity: 2,
          points_converter: 0.50,
          size: '',
        },
        {
          name: 'Smart Watch',
          price: 400,
          url_image: 'http://localhost:3001/images/smart_watch.jpg',
          total_quantity: 4,
          points_converter: 0.50,
          size: '',
        },
        {
          name: 'Aloha SurfBoard',
          price: 70,
          url_image: 'http://localhost:3001/images/aloha_surfboard.jpg',
          total_quantity: 30,
          points_converter: 0.50,
          size: '',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};