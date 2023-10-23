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
        return $user->can('cooperationsales.index');
    }
    public function view(User $user)
    {
        return $user->can('cooperationsales.view');
    }
    public function create(User $user)
    {
        return $user->can('cooperationsales.create');
    }
    public function Income(User $user)
    {
        return $user->can('cooperationsales.Income');
    }
    public function update(User $user)
    {
        return $user->can('cooperationsales.update');
    }
    public function delete(User $user)
    {
        return $user->can('cooperationsales.delete');
    }
}
