import { db } from "../src/utils/db.server";

type Method = {
  method: string;
};

type Genre = {
  genre: string;
};

type Purpose = {
  purpose: string;
};

type Source = {
  source: string;
  hasManyRecipes: boolean;
};

type Recipe = {
  title: string;
  page: number | null;
  rating: number;
  recipe: string;
  ingredients: string;
  nickelaLevel: number;
};

function getMethods(): Array<Method> {
  return [
    {
      method: "InstaPot",
    },
    {
      method: "Stove",
    },
    {
      method: "Bake",
    },
  ];
}

function getGenres(): Array<Genre> {
  return [
    {
      genre: "American",
    },
    {
      genre: "Mexican",
    },
    {
      genre: "Thai",
    },
  ];
}

function getPurposes(): Array<Purpose> {
  return [
    {
      purpose: "Side",
    },
    {
      purpose: "Entree",
    },
    {
      purpose: "Dessert",
    },
  ];
}

function getSources(): Array<Source> {
  return [
    {
      source: "Fresh from the Vegetarian Slow Cooker",
      hasManyRecipes: true,
    },
    {
      source:
        "https://www.diybunker.com/24-lazy-girl-crock-pot-recipes-thatre-almost-easy/",
      hasManyRecipes: true,
    },
    {
      source: "The Essential Instant Pot Cookbook",
      hasManyRecipes: true,
    },
  ];
}

function getRecipes(): Array<Recipe> {
  return [
    {
      title: "Herb-infused Corn on the Cob",
      page: 192,
      rating: 5,
      ingredients:
        "Ears of Corn (3 BARELY fits in InstaPot)\nFresh herbs (thyme, rosemary, basil, etc...)\n1/2 cup hot water",
      recipe:
        "1. Pull back the green husks from the corn, leaving them attached to the cob. Remove the silk from the corn and rinse the ears under cold running water. Tri9m the ends of the corn if necessary to fit inside the cooker. Place a stem or two of fresh herbs on the corn and bring the husk back up around the ear to close the herbs inside with the corn.\n2. Place the corn in InstaPot. Add teh hot water, cover, and cook on Low for 2 to 4 hours, until the corn is tender. Serve hot.",
      nickelaLevel: 2,
    },
    {
      title: "Chicken Enchilada Casserole",
      page: null,
      rating: 5,
      ingredients:
        "1.5lbs. boneless skinless raw chicken breasts\n28 oz. can Red (or green) Enchilada sauce\n10 corn tortillas\n2 cups grated cheddar cheese, divided\n3.8 oz. can black olives (drained), divided",
      recipe:
        "1. Put the chicken breasts and the enchilada sauce in your slow cooker.\n2. Cook on HIGH for 4 hours or LOW for 6-8 hours.\n3. Shred the chicken with 2 forks right in the slow cooker.\n4. Cut the tortillas into strips, add to chicken and sauce. Stir.\n5. Add 1/2 cup of cheese and half the olives into the sauce and chicken mixture. Stir again.\n6. Flatten the mixture.\n7. Add the rest of the cheese and the olives on top.\n8. Cook on low for about 40-60 minutes longer.\n9. Top with sour cream (optional)",
      nickelaLevel: 1,
    },
    {
      title: "Vegan Sloppy Joes",
      page: 36,
      rating: 4,
      ingredients:
        "1/4 cup olive oil\n1 yellow onion, diced\n1 large bell pepper, seeded and diced\n1 large carrot, peeled and diced\n2 celery stalks, diced\n3 cloves garlic, chopped\n1 teaspoon kosher salt\n1/2 teaspoon freshly ground black pepper\n1 tablespoon chili powder\n1/2 teaspoon ground cumin\n1/2 teaspoon smoked paprika\n1/4 cup tomato paste\n1 (15-ounce) can tomato sauce\n1/4 cup firmly packed brown sugar\n2 tablespoons vegan Worcestershire sauce(see notes)\n1 tablespoon cider vinegar\n4 cups vegetable broth\n1 pound (2-1/4 cups) green lentils, rinsed and drained\n8 hamburger buns, split and toasted\nRed onion slices\nPickle slices",
      recipe:
        "1. Select the Saute setting on the Instant Pot and heat the oil. Add the onion, bell pepper, carrot, celery, and garlic and saute for about 10 minutes, until the onion is translucent but not yet beginning to brown. Add teh salt, ground pepper, chili powder, cumin, paprika, and tomato paste and saute for 1 minute. Add the tomato sauce, sugar, Worcestershire sauce, vinegar, broth, and lentils and stir well.\n2. Secure the lid and set the Pressure Release to Sealing. Press teh Cancel button to reset the cooking program, then select the Bean/Chili setting and set the cooking time for 25 minutes at high pressure.\n3. Let the pressure release naturally for at least 10 minutes, then move the Pressure Release to Venting to release any remaining steam and open the pot.\n4. Place the bun bottoms, cut side up, on individual plates and ladle the Sloppy Joe mixture onto the buns. Top with the onion and pickles, close with the bun tops, and serve hot.\nNOTES Annies's Naturals makes a very good vegan (though not gluten-free) Worcestershire sauce. For a fluten-free alternative, substitute 2 tablespoons coconut aminos and 1/8 teaspoon ground cloves for the Worcestershire sauce.\nTo freeze any leftovers, ladle single-serving portions into the cups of a silicone muffin pan and slip into the freezer. When the portions have frozen solid, transfer them to ziplock plastic freezer bags and return to the freezeer for up to 3 months.",
      nickelaLevel: 3,
    },
  ];
}

async function seed() {
  // Create methods and get method_id's
  await Promise.all(
    getMethods().map((method) => {
      return db.method.create({
        data: {
          method: method.method,
        },
      });
    })
  );
  const instapot = await db.method.findFirst({
    where: {
      method: "InstaPot",
    },
  });
  const stove = await db.method.findFirst({
    where: {
      method: "Stove",
    },
  });
  const bake = await db.method.findFirst({
    where: {
      method: "Bake",
    },
  });

  // Create Genres and get genre_id's
  await Promise.all(
    getGenres().map((genre) => {
      return db.genre.create({
        data: {
          genre: genre.genre,
        },
      });
    })
  );
  const american = await db.genre.findFirst({
    where: {
      genre: "American",
    },
  });
  const mexican = await db.genre.findFirst({
    where: {
      genre: "Mexican",
    },
  });
  const thai = await db.genre.findFirst({
    where: {
      genre: "Thai",
    },
  });

  // Create Purposes and get purpose_id's
  await Promise.all(
    getPurposes().map((purpose) => {
      return db.purpose.create({
        data: {
          purpose: purpose.purpose,
        },
      });
    })
  );
  const side = await db.purpose.findFirst({
    where: {
      purpose: "Side",
    },
  });
  const entree = await db.purpose.findFirst({
    where: {
      purpose: "Entree",
    },
  });
  const dessert = await db.purpose.findFirst({
    where: {
      purpose: "Dessert",
    },
  });

  // Create Sources and get source_id's
  await Promise.all(
    getSources().map((source) => {
      return db.source.create({
        data: {
          source: source.source,
          hasManyRecipes: source.hasManyRecipes,
        },
      });
    })
  );
  const slowCooker = await db.source.findFirst({
    where: {
      source: "Fresh from the Vegetarian Slow Cooker",
    },
  });
  const website = await db.source.findFirst({
    where: {
      source:
        "https://www.diybunker.com/24-lazy-girl-crock-pot-recipes-thatre-almost-easy/",
    },
  });
  const instapot_book = await db.source.findFirst({
    where: {
      source: "The Essential Instant Pot Cookbook",
    },
  });

  // Create Recipes
  await Promise.all(
    getRecipes().map((new_recipe) => {
      const { title, page, rating, recipe, ingredients, nickelaLevel } =
        new_recipe;
      return db.recipe.create({
        data: {
          title,
          page,
          rating,
          recipe,
          ingredients,
          nickelaLevel,
          methodId: instapot!.id,
          genreId: american!.id,
          purposeId: entree!.id,
          sourceId: slowCooker!.id,
        },
      });
    })
  );
}

seed();
