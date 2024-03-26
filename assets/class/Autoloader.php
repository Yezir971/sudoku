<?php

class Autoloader
{
    public static function register()
    {
        spl_autoload_register(function ($class) {
            $file = __DIR__ ."/". $class . '.class.php';
            if (file_exists($file)) {
                require $file;
                // echo ('votre class à bien été appelée <br>');
                return true;
            }
            // echo ('votre class n\'a pas été appelée !');
            return false;
        });
    }
}