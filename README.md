# Bamazon
Homework for 12 -4

The customer flow is simple. First, the cureent inventory is shown, with pricing.
This is followed by an invitation to choose an item to purchase or to leave the site.
If an item is selected for purchase, the next question asks how many of the item are desired.

Once the answer is received, inventory is checked. If there is not sufficient inventory,
a message of apology is displayed and the system returns to the initial display.

If there is sufficient inventory, the order is entered, the inventory is reduced accordingly,
and the order total cost is reported. There is also logic to track the total sales
of the product

Note: There appear to be two problems with the code. It was working earlier today,
but in cleaning it up, I brke something. It now throws an error and references a syntax
error near a place where there is an equal sign and the id number of the product purchased.
Also, while the code runs, the updates for the sales figures are nt coming through.
The syntax seems to match the stock updater, which does work. Beats me.

The manager system allows four choices. The first simply lists the inventory.
The second display the inventory that is low (fewer than five items).
The third allows for the addition of inventory. The fourth allows for the addition
of a product.
Note that this code also has a problem with the updates = It reports success,
but that is not happening.

The supervisor system allows for the viewing of a report in table form
(or it would, had I succeeded in finishing). The logic for addressing the
database to fill the table is there, and the reference to the npm package is included.
The adding of departments does all it needs to and reports success. Looking
at the actual result shows the same failure as before - no added departments are listed,
but rows with IDs are actually there.

Here is a link to screenshots on Dropbox:
https://www.dropbox.com/sh/zpzs6xpbmm1cxad/AABJP2CCC7AwtAGcZSd4ss6Fa?dl=0
