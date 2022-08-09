module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          full_name: 'Get It Admin Jordan',
          email: 'jordan@getit.com',
          password: '$2a$12$NInfMuqnKFrxYxH6x3ZGd.vKM/BZi1X/cRvIOYBkLVdqVMzeFidwi',
          role: 'adminsitrator',
          points: 0,
        },
        {
          full_name: 'Jhon Doe',
          email: 'jhondoeshop@email.com',
          password: '$2a$12$jXWtManRMG2hiPBygu3fD.1iILWGbKaL6Bqbc6qbpGPbz0S3LqWWS',
          role: 'seller',
          points: 0,
        },
        {
          full_name: 'Eddie Vedder',
          email: 'eddiev@email.com',
          password: '$2a$12$uSgBEhVFYPrxFA5UL.nlzOmrZlPk6qn0PkPceS/bPPhJ1KxJyPdfu',
          role: 'customer',
          points: 1250,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};