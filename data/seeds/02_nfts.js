exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('nfts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('nfts').insert([
        { id: 1, name: 'NFT WORLD', image: '' },
        {
          id: 2,
          name: 'NFT WORLD SERIES 2',
          image: '',
        },
        {
          id: 3,
          name: 'NFT WORLD SERIES 3',
          image: '',
        },
      ]);
    });
};
