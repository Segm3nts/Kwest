# Kwest

A collaborative journal and quest manager for Dungeons and Dragons campaigns.

## Hosting

Hosting requires running the *Node.js* server on your local system and having port forwarding set up.

Clone the repository using the following commands.

```bash
mkdir kwest
cd kwest
git clone https://github.com/Segm3nts/Kwest.git
```

Before running the web application, make sure to create the MySQL database schema as defined in *kwest.sql*.

```bash
mysql < kwest.sql
```

To run the web application on your `localhost`, run the following command, with `nodejs` and `npm` installed.

```bash
npm start
```

## Usage

Accessing the homepage (route `/`) of the web server will show a page listing registered compendia. Underneath, there is a button which allows you to create a compendium. In *Kwest*, a compendium corresponds to a campaign.

Clicking *Create a new compendium* shows a new page, where the Dungeon Master inserts the name for the compendium, their name, and a password. **WARNING: DO NOT USE A PASSWORD WHICH YOU USE ON OTHER SITES!!! This password is stored in plain text on the database, and is not secured!**

Clicking *Settings* on a compendium brings up a new card, showing details of the compendium. Here you can change the compendium name, the acting dungeon master, can add and remove players, and change their names. Clicking *Save* will save the settings shown, and *Close* will close the settings card. Clicking *DELETE* will confirm the dungeon master password in order to permanently delete the compendium from the website.

Clicking *Access compendium* on any given compendium will open the compendium page for that compendium. It houses a list of journals in a pane on the left. Clicking the *(+) New Journal* button at the top of the pane will create a new journal with a dummy heading *Title* and content *Description*. Clicking a journal will open the journal in the journal information panel on the right.

In the journal information panel the title of the journal can be changed, as well as the journal description. The icon for the journal can also be changed. To save the selected title, description and icon, click *Save Journal*. Pressing *Delete Journal* forces to confirm the deletion of the journal, and the journal is deleted permanently. The time that the journal was made is printed at the top of the journal.

Clicking *(+) New Entry* adds an entry to the journal with no title and no content. The entry shows the time it was created. After adding content, click *Save Entry* to save the entry. Clicking *Delete Entry* will confirm the deletion of the journal entry, and delete the entry permanently.
