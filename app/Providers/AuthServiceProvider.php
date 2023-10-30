<?php

namespace App\Providers;

use App\Models\Permission;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        if (!$this->app->runningInConsole() && application_installed()) {
            foreach ($this->getPermissions() as $permission) {
                Gate::define($permission->name, function ($user) use ($permission) {
                    return $user->level == 'creator' or ($user->isAdmin() && $user->hasRole($permission->roles));
                });
            }
            // cooperationsales
            Gate::define('cooperationsales', function ($user) {
                return $user->level == 'creator' || $user->level == 'seller'; // Customize this condition as needed.
            });
            Gate::define('cooperationsales.index', function ($user) {
                return $user->level == 'creator' || $user->level == 'seller'; // Customize this condition as needed.
            });

            Gate::define('cooperationsales.create', function ($user) {
                return $user->level == 'creator' || $user->level == 'seller'; // Customize this condition as needed.
            });
            Gate::define('cooperationsales.Income', function ($user) {
                return $user->level == 'creator'  || $user->level == 'seller'; // Customize this condition as needed.
            });
            Gate::define('cooperationsales.clearing', function ($user) {
                return $user->level == 'creator' || $user->level == 'seller'; // Customize this condition as needed.
            });
            // installmentpurchase
            Gate::define('installmentpurchase', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            Gate::define('installmentpurchase.index', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            // createcolleague
            Gate::define('createcolleague', function ($user) {
                return $user->level == 'creator' ||  $user->level == 'createcreditoperator'; // Customize this condition as needed.
            });
            Gate::define('createcolleague.index', function ($user) {
                return $user->level == 'creator' ||  $user->level == 'createcreditoperator'; // Customize this condition as needed.
            });
            Gate::define('createcolleague.create', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            Gate::define('createcolleague.store', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            Gate::define('createcolleague.createcreditoperator', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            Gate::define('createcolleague.createdocument', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            Gate::define('createcolleague.reaccreditation.index', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            // installmentreports
            Gate::define('installmentreports', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
            Gate::define('installmentreports.index', function ($user) {
                return $user->level == 'creator'; // Customize this condition as needed.
            });
           // installmentreports
           Gate::define('installmentreports', function ($user) {
            return $user->level == 'creator' ; // Customize this condition as needed.
           });
           Gate::define('installmentreports.banktransaction', function ($user) {
            return $user->level == 'creator' ; // Customize this condition as needed.
           });
           Gate::define('installmentreports.index', function ($user) {
            return $user->level == 'creator' ; // Customize this condition as needed.
           });


        }
    }

    protected function getPermissions()
    {
        return Permission::where('active', true)->with('roles')->get();
    }
}
