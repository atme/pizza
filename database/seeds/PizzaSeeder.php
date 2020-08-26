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
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Tomato Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Cheese Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Pepperoni Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Pepperoni Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Pepperoni Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Pepperoni Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ],
            [
                'name' => 'Pepperoni Pizza',
                'price' => 10.39,
                'description' => '',
                'image'=> '',
            ]
        ]);
    }
}
