<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PizzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pizzas')->insert([
            [
                'name' => 'Pepperoni Pizza',
                'price' => 10.39,
                'description' => 
                    'Hand stretched since 1958! Our classic thin base is light
                    on the stomach and crispy on the taste buds!',
                'image'=> '/img/pepperoni.jpg',
            ],
            [
                'name' => 'Tomato Pizza',
                'price' => 9.99,
                'description' => 
                    'AKA \'The FAT One\'! Our classic deep pan base is thick, 
                     crispy around the edges and deliciously soft and fluffy on
                    the inside.',
                'image'=> '/img/tomato.jpg',
            ],
            [
                'name' => 'Cheese Pizza',
                'price' => 11.99,
                'description' => 'A garlicky crust bursting with cheese.',
                'image'=> '/img/cheese.jpg',
            ],
            [
                'name' => 'Beef Pizza',
                'price' => 11.39,
                'description' => 
                    'The main event! Doughy bites bursting with cheese and
                    garlic. Tear and share - perfect for dipping!',
                'image'=> '/img/beef-cheese.jpg',
            ],
            [
                'name' => 'Meat Pizza',
                'price' => 15.89,
                'description' => 
                    'Chicken breast, black olives, beef, pepperoni, red onions &
                    mixed peppers.',
                'image'=> '/img/meat.jpg',
            ],
            [
                'name' => 'Mozarella Pizza',
                'price' => 8.39,
                'description' => 'Classic mozzarella cheese & tomato sauce.',
                'image'=> '/img/mozarella.jpg',
            ],
            [
                'name' => 'Prawns Pizza',
                'price' => 10.69,
                'description' => 
                    'Who needs Gluten? Not you! Famous for our tasty Gluten Free
                    base. We don\'t want anybody to miss out - so don\'t! Best
                    served with lots of toppings for added taste!',
                'image'=> '/img/prawns.jpg',
            ],
            [
                'name' => 'Vegan Pizza',
                'price' => 9.19,
                'description' => 
                    'Mozzarella, spinach, caramelised onions, red onions,
                    tomatoes & balsamic drizzle.',
                'image'=> '/img/vegan.jpg',
            ]
        ]);
    }
}
