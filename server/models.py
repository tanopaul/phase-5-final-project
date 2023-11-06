from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    user_recipes = db.relationship('Recipe', back_populates='user', cascade='all, delete-orphan')
    posts = db.relationship('RecipePost', backref='user', cascade='all, delete-orphan')
    serialize_rules = ('-user_recipes.user', '-posts.user')
    

    @validates('username')
    def validate_name(self, key, username):
        if not username:
            raise ValueError("Username must be present")
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email or '.' not in email:
            raise ValueError("Please input a valid email address")
        return email
    

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        from app import bcrypt
        if type(password) is str and len(password) > 6:
            password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
            self._password_hash = password_hash.decode('utf-8')
        else:
            raise ValueError("Password Invalid")
    
    def authenticate(self, password):
        from app import bcrypt
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'


    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.Integer)
    name = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String)
    main_image = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='recipe', cascade='all, delete-orphan')
    user = db.relationship('User', back_populates='user_recipes')
    posts = db.relationship('RecipePost', backref="recipe", cascade="all, delete-orphan")

    serialize_rules = ('-recipe_ingredients.recipe', '-posts.recipe')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name must be present")
        return name
    
    @validates('instructions')
    def validate_instructions(self, key, instructions):
        if len(instructions) < 30:
            raise ValueError("Instructions must be 30 characters+")
        return instructions
        
    

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    calories = db.Column(db.Float)
    serving_size_g = db.Column(db.Integer)
    total_carbs = db.Column(db.Float)
    total_protein = db.Column(db.Float)
    total_fat = db.Column(db.Float)


    recipe_ingredients = db.relationship('RecipeIngredient', back_populates='ingredient')

    serialize_rules = ('-recipe_ingredients.ingredient',)

class RecipeIngredient(db.Model, SerializerMixin):
    __tablename__ = 'recipe ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)

    ingredient = db.relationship('Ingredient', back_populates='recipe_ingredients')
    recipe = db.relationship('Recipe', back_populates='recipe_ingredients')

    serialize_rules = ('-ingredient.recipe_ingredients', '-recipe.recipe_ingredients')


class RecipePost(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_message = db.Column(db.String)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # user_post = db.relationship('User', back_populates="posts")
    # recipe = db.relationship('Recipe', back_populates="posts")

    serialize_rules = ('-user.posts', '-recipe.posts')