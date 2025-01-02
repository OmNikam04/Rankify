## Why RANKIFY?
- Often I find it difficult to decide which decision I should be prioritizing and which not when we have too many decisions to take.  
- But selecting which decision is important between any two decisions is always an easy task.
- This same idea is what this project is implementing. 
- We are creating bunch of decision cards. User will be show two cards at a time. User will select the high priority decision among given two decisions. System will maintain the list of ranked decision.
- I am using `chess.com` elo rating algorithm to rank the decision. You can find more about it in this   [article](https://www.geeksforgeeks.org/elo-rating-algorithm/).    

## Backend
Sequence of APIs to test
1. Create decision Card (POST)
    - This creates decision card with title, description and simple emoji.
    - Create atmost 6 cards only. Creating more than 6 cards is computationly expesive.
2. Get all cards (GET)
    - Displays all cards with their detailed information.
    - Displays list in descending order of elo rating.
3. Generate Pairs (GET)
    - This api will get all decision cards and generate 1:1 pairs 
    - These generated pairs are then shown to users one after another, from which user select best decision between any two cards. (see demo)
4. Show Pair (GET)
    - Randomly shows a pair to user to select from.
5. Update rating (POST)
    - Implements chess elo rating algorithm to updates the rating of decision card.
6. Additional apis - Delete card by ID (DELETE)
