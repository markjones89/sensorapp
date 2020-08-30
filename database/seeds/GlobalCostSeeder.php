<?php

use Illuminate\Database\Seeder;

class GlobalCostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('global_costs')->insert([
            ['country' => 'Canada', 'city' => 'Calgary', 'rental_metre' => 360.27, 'rental_foot' => 33.47, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Canada', 'city' => 'Vancouver', 'rental_metre' => 562.52, 'rental_foot' => 52.26, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Canada', 'city' => 'Toronto', 'rental_metre' => 585.13, 'rental_foot' => 54.36, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Canada', 'city' => 'Montreal', 'rental_metre' => 441.21, 'rental_foot' => 40.99, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Seattle', 'rental_metre' => 715.48, 'rental_foot' => 66.47, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'San Francisco', 'rental_metre' => 1404.80, 'rental_foot' => 130.51, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Los Angeles', 'rental_metre' => 561.45, 'rental_foot' => 52.16, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Denver', 'rental_metre' => 551.11, 'rental_foot' => 51.20, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Dallas', 'rental_metre' => 605.58, 'rental_foot' => 56.26, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Houston', 'rental_metre' => 695.35, 'rental_foot' => 64.60, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Atlanta', 'rental_metre' => 539.70, 'rental_foot' => 50.14, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Chicago', 'rental_metre' => 647.77, 'rental_foot' => 60.18, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Boston', 'rental_metre' => 1147.43, 'rental_foot' => 106.60, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'New York', 'rental_metre' => 1825.56, 'rental_foot' => 169.60, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United States', 'city' => 'Washington', 'rental_metre' => 1054.97, 'rental_foot' => 98.01, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Brazil', 'city' => 'Sao Paulo', 'rental_metre' => 643.68, 'rental_foot' => 59.80, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Argentina', 'city' => 'Buenos Aires', 'rental_metre' => 531.74, 'rental_foot' => 49.40, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'South Africa', 'city' => 'Johannesburg', 'rental_metre' => 232.82, 'rental_foot' => 21.63, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'South Africa', 'city' => 'Cape Town', 'rental_metre' => 220.34, 'rental_foot' => 20.47, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United Arab Emirates', 'city' => 'Dubai', 'rental_metre' => 913.86, 'rental_foot' => 84.90, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Turkey', 'city' => 'Istanbuhl', 'rental_metre' => 625.17, 'rental_foot' => 58.08, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Bulgaria', 'city' => 'Sofia', 'rental_metre' => 290.84, 'rental_foot' => 27.02, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Romania', 'city' => 'Bucharest', 'rental_metre' => 321.84, 'rental_foot' => 29.90, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Serbia', 'city' => 'Belgrade', 'rental_metre' => 311.18, 'rental_foot' => 28.91, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Slovakia', 'city' => 'Bratislava', 'rental_metre' => 309.68, 'rental_foot' => 28.77, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Czech Republic', 'city' => 'Praque', 'rental_metre' => 462.53, 'rental_foot' => 42.97, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Poland', 'city' => 'Warsaw', 'rental_metre' => 449.07, 'rental_foot' => 41.72, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Finland', 'city' => 'Helsinki', 'rental_metre' => 679.63, 'rental_foot' => 63.14, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Sweden', 'city' => 'Stockholm', 'rental_metre' => 1006.21, 'rental_foot' => 93.48, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Norway', 'city' => 'Oslo', 'rental_metre' => 745.62, 'rental_foot' => 69.27, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Denmark', 'city' => 'Copenhagen', 'rental_metre' => 416.67, 'rental_foot' => 38.71, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Germany', 'city' => 'Berlin', 'rental_metre' => 516.02, 'rental_foot' => 47.94, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Germany', 'city' => 'Hamburg', 'rental_metre' => 465.00, 'rental_foot' => 43.20, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Germany', 'city' => 'Frankfurt', 'rental_metre' => 664.89, 'rental_foot' => 61.77, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Germany', 'city' => 'Munich', 'rental_metre' => 621.83, 'rental_foot' => 57.77, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Austria', 'city' => 'Vienna', 'rental_metre' => 411.29, 'rental_foot' => 38.21, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Switzerland', 'city' => 'Geneva', 'rental_metre' => 902.23, 'rental_foot' => 83.82, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Switzerland', 'city' => 'Zurich', 'rental_metre' => 792.98, 'rental_foot' => 73.67, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Italy', 'city' => 'Milan', 'rental_metre' => 764.88, 'rental_foot' => 71.06, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Italy', 'city' => 'Rome', 'rental_metre' => 567.47, 'rental_foot' => 52.72, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Belgium', 'city' => 'Brussels', 'rental_metre' => 537.55, 'rental_foot' => 49.94, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Netherlands', 'city' => 'Amsterdam', 'rental_metre' => 560.37, 'rental_foot' => 52.06, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'France', 'city' => 'Paris', 'rental_metre' => 1184.25, 'rental_foot' => 110.02, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Spain', 'city' => 'Barcelona', 'rental_metre' => 457.90, 'rental_foot' => 42.54, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Spain', 'city' => 'Madrid', 'rental_metre' => 633.99, 'rental_foot' => 58.90, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Portugal', 'city' => 'Lisbon', 'rental_metre' => 399.77, 'rental_foot' => 37.14, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Ireland', 'city' => 'Dublin', 'rental_metre' => 946.47, 'rental_foot' => 87.93, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Scotland', 'city' => 'Aberdeen', 'rental_metre' => 687.17, 'rental_foot' => 63.84, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Scotland', 'city' => 'Edinburgh', 'rental_metre' => 722.26, 'rental_foot' => 67.10, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United Kingdom', 'city' => 'Leeds', 'rental_metre' => 659.18, 'rental_foot' => 61.24, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United Kingdom', 'city' => 'Manchester', 'rental_metre' => 781.89, 'rental_foot' => 72.64, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United Kingdom', 'city' => 'Liverpool', 'rental_metre' => 473.29, 'rental_foot' => 43.97, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United Kingdom', 'city' => 'Birmingham', 'rental_metre' => 715.26, 'rental_foot' => 66.45, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'United Kingdom', 'city' => 'London', 'rental_metre' => 1504.26, 'rental_foot' => 139.75, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Russia', 'city' => 'Moscow', 'rental_metre' => 1014.61, 'rental_foot' => 94.26, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'India', 'city' => 'New Dehli', 'rental_metre' => 1549.68, 'rental_foot' => 143.97, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'India', 'city' => 'Mumbai', 'rental_metre' => 975.96, 'rental_foot' => 90.67, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'India', 'city' => 'Bangalore', 'rental_metre' => 398.91, 'rental_foot' => 37.06, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Thailand', 'city' => 'Bangkok', 'rental_metre' => 463.28, 'rental_foot' => 43.04, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Vietnam', 'city' => 'Ho Chi Minh City', 'rental_metre' => 861.54, 'rental_foot' => 80.04, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Vietnam', 'city' => 'Hanoi', 'rental_metre' => 520.11, 'rental_foot' => 48.32, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Malaysia', 'city' => 'Kuala Lumpur', 'rental_metre' => 452.62, 'rental_foot' => 42.05, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Singapore', 'city' => 'Singapore', 'rental_metre' => 1230.10, 'rental_foot' => 114.28, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Indonesia', 'city' => 'Jakarta', 'rental_metre' => 514.41, 'rental_foot' => 47.79, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Hong Kong', 'city' => 'Hong Kong', 'rental_metre' => 3465.98, 'rental_foot' => 322.00, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'China', 'city' => 'Shanghai', 'rental_metre' => 1383.27, 'rental_foot' => 128.51, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'China', 'city' => 'Beijing', 'rental_metre' => 1910.59, 'rental_foot' => 177.50, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Japan', 'city' => 'Tokyo', 'rental_metre' => 1806.40, 'rental_foot' => 167.82, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'South Korea', 'city' => 'Seoul', 'rental_metre' => 1034.09, 'rental_foot' => 96.07, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Australia', 'city' => 'Perth', 'rental_metre' => 577.48, 'rental_foot' => 53.65, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Australia', 'city' => 'Adelaide', 'rental_metre' => 392.78, 'rental_foot' => 36.49, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Australia', 'city' => 'Melbourne', 'rental_metre' => 614.08, 'rental_foot' => 57.05, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Australia', 'city' => 'Sydney', 'rental_metre' => 1091.46, 'rental_foot' => 101.40, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'Australia', 'city' => 'Brisbane', 'rental_metre' => 603.75, 'rental_foot' => 56.09, 'furniture_cost' => 1200.00, 'created_at' => now()],
            ['country' => 'New Zealand', 'city' => 'Auckland', 'rental_metre' => 483.73, 'rental_foot' => 44.94, 'furniture_cost' => 1200.00, 'created_at' => now()]
        ]);
    }
}
