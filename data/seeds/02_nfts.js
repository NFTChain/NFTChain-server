exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("table_name").insert([
        { id: 1, name: "NFT WORLD", description: "NFT WORLD", image: "" },
        {
          id: 2,
          name: "NFT WORLD SERIES 2",
          description: "NFT WORLD",
          image: "",
        },
        {
          id: 3,
          name: "NFT WORLD SERIES 3",
          description: "NFT WORLD",
          image: "",
        },
      ]);
    });
};
