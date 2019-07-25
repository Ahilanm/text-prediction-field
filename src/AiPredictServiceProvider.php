<?php

namespace Ahilan\AiPredict;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AiPredictServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Blade::directive('aipredict', function() {
            return " <div id=\"textareaDiv\" class=\"textareaCase\" data-placeholder=\"Title\" contentEditable=\"true\"></div>";
        });
        $this->publishes([
            __DIR__.'/assets/css/aipredict.css' => public_path('vendor/aipredict/aipredict.css'),
            __DIR__.'/assets/js/aipredict.js' => public_path('vendor/aipredict/aipredict.js'),
        ], 'public');
    }

    public function register()
    {

    }
}