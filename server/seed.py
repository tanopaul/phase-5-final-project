#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Recipe, User, Ingredient, RecipeIngredient, RecipePost

# fake = Faker()

# def create_ingredients():
#     ingredients = []
#     ingredient_names = ['beef', 'carrots', 'onion', 'garlic', 'mushroom', 'beef broth', 'potatoes', 'soy sauce']
#     quantities = ['', 1, 2, 3, 4, '']
#     for i in range(5):
#         ing = Ingredient(
#             name = rc(ingredient_names),
#             calories = randint(80, 400),
#             serving_size_g = randint(20, 50),
#             recipe_quantity = rc(quantities)
#         )
#         ingredients.append(ing)
    
#     return ingredients

# def recipe_ings(ingredients):
#     recipe_ingredients = []
#     for i in range(len(ingredients)):
#         r_i = RecipeIngredient(
#             recipe_id = 1,
#             ingredient_id = i + 1
#         )
#         recipe_ingredients.append(r_i)
    
#     return recipe_ingredients



if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Ingredient.query.delete()
        User.query.delete()
        RecipeIngredient.query.delete()
        Recipe.query.delete()
        RecipePost.query.delete()

        post = RecipePost(
            post_message = "Such a great Recipe!",
            recipe_id = 2,
            user_id = 2
        )

        db.session.add(post)
        db.session.commit()


        # print("Seeding users...")
        # users = User(
        #     username = fake.user_name(),
        #     password_hash = fake.password(),
        #     email = fake.email()
        # )
        # db.session.add(users)
        # db.session.commit()

        # print("Seeding recipes...")
        # recipe = Recipe(
        #     category = 'Dinner',
        #     name = 'Pot Roast',
        #     instructions = 'Add meat to pot sear on all sides until golden brown. Mix spices in a bowl to later add to roast. Cook for 2 hours or until meat is fall off the bone.',
        #     main_image = fake.image_url(),
        #     user_id = 1
        # )
        # db.session.add(recipe)
        # db.session.commit()

        # print("Seeding ingredients...")
        # ingredients = create_ingredients()
        # db.session.add_all(ingredients)
        # db.session.commit()

        # print("Seeding recipe ingredients...")
        # recipe_ingredients = recipe_ings(ingredients)
        # db.session.add_all(recipe_ingredients)
        # db.session.commit()

        print("Done seeding!")