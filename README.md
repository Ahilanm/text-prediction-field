# Text Prediction Field

## This will create a input field where we can able to get the predicted text from our file.

# Installation

Begin by pulling the package through Composer.

`composer require ahilan/aipredictfield`

# Configuration

If you don't use auto-discovery, add the ServiceProvider to the providers array in config/app.php

`\Ahilan\AiPredict\AiPredictServiceProvider::class,`

This Package requires vendor publish. To get started, you'll need to publish all vendor assets:
`php artisan vendor:publish --provider="Ahilan\AiPredict\AiPredictServiceProvider"`

Then you need to add the css and js file in your blade file

`<link href="{{asset('vendor/aipredict/aipredict.css')}}" rel="stylesheet">`

`<script type="text/javascript" src="{{asset('vendor/aipredict/aipredict.js')}}"></script>`

Finally just run the config cache and view clear commands

`php artisan config:cache`
`php artisan view:clear`

# Usage

To use add the below directive in your blade file to display the field

`@aipredict`

This will display the textarea field. Where you can able to get data.

# Note

In .env file you must need to add the url of the server containing the AI model file.

`PREDICTION_URL='YOUR_URL'`
