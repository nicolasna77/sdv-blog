export const up = async (knex) => {
  await knex("users").insert([
    {
      displayName: "admin",
      email: "nicolas_abreu@live.fr",
      passwordHash: "",
      passwordSalt: "",
    },
  ]);

  await knex("posts").insert([
    {
      title: "Mon post",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus posuere finibus. Nunc vehicula nibh risus, egestas varius urna cursus scelerisque. Ut imperdiet feugiat sem, sed euismod nibh volutpat ut. In in auctor magna. Nulla vitae quam lobortis, vestibulum tellus ut, eleifend magna.",
      userId: 1,
    },
    {
      title: "mon deuxieme posts",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus posuere finibus. Nunc vehicula nibh risus, egestas varius urna cursus scelerisque. Ut imperdiet feugiat sem, sed euismod nibh volutpat ut. In in auctor magna. Nulla vitae quam lobortis, vestibulum tellus ut, eleifend magna.",
      userId: 1,
    },
    {
      title: "mon posts !!!!!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus posuere finibus. Nunc vehicula nibh risus, egestas varius urna cursus scelerisque. Ut imperdiet feugiat sem, sed euismod nibh volutpat ut. In in auctor magna. Nulla vitae quam lobortis, vestibulum tellus ut, eleifend magna.",
      userId: 1,
    },
  ]);

  await knex("comments").insert([
    {
      content: "cool",
      userId: 1,
      postId: 1,
      createdAt: "05/05/2022",
    },
    {
      content: "null",
      userId: 1,
      postId: 1,
      createdAt: "05/05/2022",
    },
  ]);
  
};

export const down = async (knex) => {
  await knex("posts").del();
  await knex("users").del();
  await knex("comments").del();
};
