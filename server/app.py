#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import db, Recipe, RecipeIngredient, Ingredient, User
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
import os
from flask_bcrypt import Bcrypt


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Signup(Resource):
    def post(self):
        try:
            new_user = User(
                username = request.json['username'],
                password_hash = request.json['password'],
                email = request.json['email']
            )
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(rules=('-_password_hash',)), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.json['username']).first()
        password = request.json['password']
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-_password_hash',)), 201)
        else:
            return make_response('error', 400)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

class AutoLogin(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                return make_response(user.to_dict(rules=('-_password_hash',)), 200)
            else:
                return make_response({"errors": "User not found"}, 404)
        else:
            return make_response('', 204)

api.add_resource(AutoLogin, '/auto_login')




    

class UserById(Resource):
        
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "user not found"}, 404)
        
        try:
            for attr in request.json:
                setattr(user, attr, request.json[attr])

            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict(rules=('-_password_hash',))
            return make_response(user_dict, 200)
        except ValueError:
            return make_response({"error": ["validation error"]}, 400)
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 200)
        else:
            return make_response({"error": "user not found"}, 404)


api.add_resource(UserById, '/users/<int:id>')

class Recipes(Resource):
    def get(self):
        recipes = [recipe.to_dict(rules=('-user',)) for recipe in Recipe.query.all()]
        if recipes:
            return make_response(recipes, 200)
        else:
            return make_response({"error": "no recipes"}, 400)
    
    def post(self):
        try:
            new_recipe = Recipe(
                category = request.json['category'],
                name = request.json['name'],
                instructions = request.json['instructions'],
                main_image = request.json['main_image'],
                user_id = request.json['user_id']
            )

            db.session.add(new_recipe)
            db.session.commit()
            recipe_to_connect = Recipe.query.filter(Recipe.name == request.json['name']).first()
            ingredients = request.json['ingredients']
            
            for i in range(len(ingredients)):
                new_ingredient = Ingredient(
                    name = ingredients[i]['name'],
                    calories = ingredients[i]['calories'],
                    serving_size_g = ingredients[i]['serving_size_g'],
                    total_carbs = ingredients[i]['carbohydrates_total_g'],
                    total_protein = ingredients[i]['protein_g'],
                    total_fat = ingredients[i]['fat_total_g']
                )
                db.session.add(new_ingredient)
                db.session.commit()
                ingredient_to_connect = Ingredient.query.filter(Ingredient.name == ingredients[i]['name']).first()
                new_recipe_ingredient = RecipeIngredient(
                    recipe_id = recipe_to_connect.id,
                    ingredient_id = ingredient_to_connect.id
                )

                db.session.add(new_recipe_ingredient)
                db.session.commit()
            new_recipe_dict = new_recipe.to_dict(rules=('-user',))
            return make_response(new_recipe_dict, 200)
        except ValueError:
            return make_response({"error": ["validation errors"]}, 400)
    
api.add_resource(Recipes, '/recipes')

class RecipeById(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if recipe:
            return make_response(recipe.to_dict(rules=('-user',)), 200)
        else:
            return make_response({"error": "recipe not found"}, 404)
        
    def patch(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return make_response({"error": "recipe not found"}, 404)
        
        try:
            for attr in request.json:
                setattr(recipe, attr, request.json[attr])
            
            db.session.add(recipe)
            db.session.commit()
            recipe_dict = recipe.to_dict(rules=('-user',))
            return make_response(recipe_dict, 200)
        except ValueError:
            return make_response({"error": ["validation error"]}, 400)
        
    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if recipe:
            db.session.delete(recipe)
            db.session.commit()
            return make_response({}, 200)
        else:
            return make_response({"error": "recipe not found"}, 404)
        
api.add_resource(RecipeById, '/recipes/<int:id>')

# Views go here!




if __name__ == '__main__':
    app.run(port=5555, debug=True)

