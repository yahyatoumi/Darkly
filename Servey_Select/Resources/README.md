the back end servey relies on the client side user inout without validation
even though the user can only access values from 1 to 10 in the ui select element
with minimum knowldge, they can ispect the page and change the select value,
or send a request from the browser or using other tools with big values
doing that the user can use big values
with that they can manupilate the data base in unwanted way

to avoid that we should make sure that the data sent from the user is validated,
for this case in the backend we should check if the value is between 1 and 10
we should never rely on the data we re going to be receiving from the client
