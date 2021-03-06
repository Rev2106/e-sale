# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
    [
        { 
            first_name: 'Jack', 
            last_name: 'Doe', 
            email: 'JACK@example.com', 
            password: 'password'
        },
        { 
            first_name: 'Joann', 
            last_name: 'Doe', 
            email: 'JOANN@example.com', 
            password: 'password'
        },
    ]
)

john = User.first
jane = User.last

products = Product.create!([
    {
        name: 'Name 1',
        price: 99.99,
        description: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: john.id,
        quantity: 5
    },
    {
        name: 'Name 2',
        price: 57.99,
        description: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: john.id,
        quantity: 9
    },
    {
        name: 'Name 3',
        price: 38.99,
        description: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        quantity: 8,
        user_id: jane.id
    }
])

comment = Comment.create!([
    {
        body: 'Niiiiiiiiiiice!',
        product_id: products.first.id,
        user_id: john.id
    }
])