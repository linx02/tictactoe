# Tic Tac Toe

Tic Tac Toe is a web-based version of the classic tic tac toe game that aims to provide a more immersive experience than the regular board game. The site will be useful for people by providing a far more portable alternative to the original game.

![Responsive Mockup](media/mockup.png)

## Features 

### Existing Features

- __Game Heading__

  - Always visible on the page, the game heading acts as a informative heading displaying relevant information to the gameplay.
  - This section allows the user to easily see who's turn it is in the game, the result of the end game aswell as easily see what the site is about, by displaying "Tic Tac Toe" when no gameplay relevant info is needed.

![Game heading](media/gameheading1.png)
![Game heading](media/gameheading2.png)
![Game heading](media/gameheading3.png)

- __Game Rules__

  - The landing page includes a section explaining the game rules in an easy-to-read list format.
  - This section introduces the user to the game and thoroughly explains it's rules.
  - This section is always accessible to the user even when the game has begun.

![Game Rules Section](media/gamerules.png)

- __Reload Page Button__

  - This button allows the user to reload the page at any stage.
  - Provides the user an easy way to reload the entire page and reset all values

![Reload Page Button](media/reloadbutton.png)

- __Game Grid__ 

  - The game grid is the main attraction of the site. It is fully responsive and every cell is clickable.
  - The game grid provides the user a way to play tic tac toe in a web environment.

![Game Grid](media/gamegrid.png)

- __Score Indicators__

  - The score indicators displays the score of each player. It styles appropriately to who is in the lead.
  - The score indicators provide an easy way for the user to see their current score.

![Score Indicator](media/scoreindicator1.png)
![Score Indicator](media/scoreindicator2.png)

- __Rematch and Game Rules Buttons__

  - Rematch button:
    - Resets the grid and starts a new round
    - Provides the user a way to continue playing the game after the round has ended.

  - Game Rules button(?)
    - Displays the game rules section
    - Provides the user a way to read the game rules again without having to reload the page.

![Buttons](media/buttons.png)

- __Settings section and buttons__

  - Controls the settings of the game.
  - Provides users a way to control and fine-tune their gameplay.

  - 2 Player button:
    - Allows 2 users to take turns placing markers in the grid.
    - Provides the user with a way to play with their friends.

  - VS Computer button
    - Allows user to play vs the computer.
    - Provides the user with a way to play alone without the need of a friend.

![Settings](media/settings.png)

- __The Footer__

  - The footer is always visible at all stages in the page.
  - The footer includes includes a link to my GitHub profile.
  - Provides the user with a way to connect with the creator aswell as watch the source code of the project.

![Footer](media/footer.png)

For some/all of your features, you may choose to reference the specific project files that implement them.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement

- Bigger grid
  - This feature would allow the user to play on a bigger grid than the regular 3x3 grid.
  - This feature would provide the user with a way to increase the difficulty of the game.

## Testing 

### Validator Testing 

- HTML
  - Warnings returned when passing through the official [W3C validator]()

  1. Warning: Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).
    - From line 76, column 17; to line 76, column 33
  
  2. Warning: Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).
    - From line 58, column 17; to line 58, column 33

  3. Warning: Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).
    - From line 88, column 13; to line 88, column 16

  All warnings were resolved by switching above h1 tags to h2 tags

  - No errors were returned.
    

- CSS
  - Errors returned when passing through the official [(Jigsaw) validator]()
    
    - Line: 133 #sounds-btn, ValueError : font-size: bold is not a font-size-value
    - Resolved by changing font-size: bold; to font-size: 0.8rem;

- JavaScript
 - Warnings returned when passing through the [Jshint validator]()

- 15 Warnings	
21	Missing semicolon.
34	Missing semicolon.
49	Missing semicolon.
60	Missing semicolon.
63	Missing semicolon.
64	Missing semicolon.
72	Missing semicolon.
73	Missing semicolon.
105	Missing semicolon.
167	The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.
229	Missing semicolon.
244	Missing semicolon.
250	Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (x)
258	Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (o)
260	Missing semicolon.

- Two undefined variables	
279	scoreNum
281	scoreNum
282	scoreNum
285	scoreNum
288	scoreNum
280	oppScoreNum
285	oppScoreNum
288	oppScoreNum

- Warnings were resolved by:
    - Adding missing semicolons
    - defining scoreNum & oppScoreNum using let keyword
    - .......


- Accessibility
  - No errors were returned when passing through the [WAVE validator](hhttps://wave.webaim.org/report#/https://linx02.github.io/tictactoe/)

### Unfixed Bugs

- No found bugs left unfixed.

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - https://linx02.github.io/tictactoe/index.html

## Credits 

### Content 

- The text explaining the game rules was generated using ChatGPT [ChatGPT](https://chat.openai.com/)
- The reload page icon was taken from [Font Awesome](https://fontawesome.com/)

### Media

- Sounds used in this project was taken from [Free Sound](https://freesound.org/)