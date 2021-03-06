<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['address'];

    /**
     * The pizzas that belong to the order.
     */
    public function pizzas()
    {
        return $this->belongsToMany('App\Pizza');
    }

    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
