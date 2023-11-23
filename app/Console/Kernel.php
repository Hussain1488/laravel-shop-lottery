<?php

namespace App\Console;

use App\Console\Commands\StoreCreditReset;
use App\Jobs\CalculateViewers;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Database\Console\Migrations\InstallCommand;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Session;
use Morilog\Jalali\Jalalian;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        // InstallCommand::class
        StoreCreditReset::class,
    ];

    /**
     * Define the queues used by the application.
     *
     * @var array
     */
    protected $queues = [
        'default',
    ];

    /**
     * Create a new console kernel instance.
     *
     * @return void
     */

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // run the queue worker "without overlapping"
        // this will only start a new worker if the previous one has died
        $schedule->command($this->getQueueCommand())
            ->everyMinute()
            ->withoutOverlapping();

        // restart the queue worker periodically to prevent memory issues
        $schedule->command('queue:restart')
            ->hourly();

        $schedule->call(function () {
            option_update('schedule_run', now());
        })->everyMinute();

        $schedule->job(new CalculateViewers)->dailyAt('00:00');


        $schedule->command('command:StoreCreditReset')->when(function () {
            $day = Jalalian::now()->format('d');
            $hour = Jalalian::now()->format('H:i');
            $cornjobDay = option('cornjob_call_day') != null ? option('cornjob_call_day') : 1;
            $status = option('store_reccredition_status') == 'on' ? true : false;
            return ($day == $cornjobDay && $hour == '00:00' && $status);
        });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    /**
     * Configure the queues used by the application.
     *
     * @return void
     */
    protected function configureQueue()
    {
        // Additional queue configuration if needed
    }

    /**
     * Get the full queue command.
     *
     * @return string
     */
    protected function getQueueCommand()
    {
        $params = implode(' ', [
            '--daemon',
            '--tries=3',
            '--sleep=3',
            '--queue=' . implode(',', $this->queues),
        ]);

        return sprintf('queue:work %s', $params);
    }
}
