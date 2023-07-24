# OakNorth JavaScript Home Test
My attempt at the OakNorth take home challenge  
For this challenge I needed to finish writing an assertEquals function along with making a test suite to ensure it worked as expected. I used the Jest framework as this was the recommended framework
## My approach
I wanted to have my tests ordered in my assertEqual function in such a way that errors were thrown as soon as possible. So the obvious start seemed to be if types differed.
Working this way meant I ended up building my test roughly in order of complexity.  
For each new addition to my assertEquals I created a series of tests and ran Jest.  
I started using --coverage quite early which let me see how much of my code the tests Id written covered. Using this I ensured that all of my code was covered before moving on to adding any new functionality.
## What I'd do differently next time
A big issue with this project is I did it all in one sitting and ended up being very slack about committing any changes!

I didn't make use of .todo I think it would be good to get in to the practice of using this functionality.

I thought of an edge case that I haven't accounted for if for some reason an object with a circular reference is passed I'm not sure how the my function would handle this case.

My assert equals ended up being around 90 lines of code I think it would be good to split this in to smaller functions. This would proably make the unit testing slightly easier and would just improve the modularity of my code so it's easier to take this function in to other projects.

To handle objects and arrays I've made my assertEqual function recursive looking at the jest coverage breakdown this results in some of my lines of code getting hit a fair bit even for relatively small nested arrays or objects. I can imagine this would mean very slow test times when checking big complex arrays or objects.

Following on from the last two points I think it would be fun to implement a smoke test. It doesn't really make sense for this challenge but it seems like it would be fun to try and break the problem down in to smaller chunks based on importance.

I chucked in a error at the end of my assertEquals in case something somehow reaches the end of my function without having returned true or throwing an error. I couldn't work out a reasonable way of testing this. It would be fun to try and work out what circumstances would cause this error to throw.

I really enjoyed this challenge, I feel like iv'e learnt a fair bit in doing it (for instance null has type of object). It was very interesting getting some exposure with Jest, I'll definitely be implementing it in my current project and projects going forwards.