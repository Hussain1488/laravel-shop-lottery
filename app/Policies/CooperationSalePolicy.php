<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CooperationSalePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function viewAny(User $user)
    {
        return $user->can('CooperationSales.index');
    }
    public function view(User $user)
    {
        return $user->can('CooperationSales.view');
    }
    public function create(User $user)
    {
        return $user->can('CooperationSales.create');
    }
    public function update(User $user)
    {
        return $user->can('CooperationSales.update');
    }
    public function delete(User $user)
    {
        return $user->can('CooperationSales.delete');
    }
}
