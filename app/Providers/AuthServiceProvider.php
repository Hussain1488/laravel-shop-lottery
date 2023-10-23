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
            Gate::define('cooperationsales', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });
            Gate::define('cooperationsales.index', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });

            Gate::define('cooperationsales.create', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });
            Gate::define('cooperationsales.Income', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });
            Gate::define('cooperationsales.clearing', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });

            Gate::define('installmentpurchase', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });
            Gate::define('installmentpurchase.index', function ($user) {
                return $user->level == 'creator' || $user->isAdmin(); // Customize this condition as needed.
            });
        }
    }

    protected function getPermissions()
    {
        return Permission::where('active', true)->with('roles')->get();
    }
}
