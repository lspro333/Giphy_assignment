$( document ).ready(function() {
    // Array of dogBreeds\
    var dogBreeds = ["German Shepherd", "Golden Retriever", "Poodle", "Cocker Spaniel", "Dachschund", "Bulldog", "Chihuahua", "Bloodhound", "Doberman"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < dogBreeds.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("dogBreeds");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", dogBreeds[i]);
            gifButton.text(dogBreeds[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new dogBreeds button 
    function addNewButton(){
        $("#addGif").on("click", function(){
        var newSearch = $("input").eq(0).val();
        dogBreeds.push(newSearch);
        $("form").trigger("reset");
        displayGifButtons()
        return false;
        
        });
    
    }
    // Function that displays gifs
    function displayGifs(){
        var dogBreeds = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dogBreeds + "&api_key=npGIJae1BijOgso31jp5mnpK1QExRArT&limit=12";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            // Erases anything from previous click
            $("#gifsView").empty(); 
            //Shows results of gifs
            var results = response.data; 
        
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                // Rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // Pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
           
                $("#gifsView").prepend(gifDiv);
            }
        });
    }

    displayGifButtons(); 
    addNewButton();

    $(document).on("click", ".dogBreeds", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });