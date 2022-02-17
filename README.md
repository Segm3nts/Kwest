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

Then, to run the web application on your `localhost`, run the following command, with `nodejs` installed.

```bash
npm start
```

## Usage

Accessing the homepage (route `/`) of the web server will show a page with a list of registered campaigns. Underneath, there is a button which allows you to create a campaign, which sets yourself as the Dungeon Master after creating a password.

**WARNING: DO NOT USE A PASSWORD WHICH YOU USE ON OTHER SITES!!!** This password is stored in plain text on the server's filesystem, and is not secured!

The campaign page houses a list of journals (tags), and a small list of untagged journal entries. Clicking the *+* button in the bottom right corner will create a new journal entry and place it in the untagged journal entries list. Clicking a journal entry will open the journal entry in the journal information panel.

The type of journal entry, either *Entry* (default), *Quest*, *Player* or *Handout* can be selected using the dropdown menu. Journal entries are filtered based on their types and names.

Clicking a journal in the journal list will show a list of all journal entries which have a tag corresponding to the journal.

A journal can be removed by disassociating all journal entries with its corresponding tag.

Clicking on a tag in the journal information panel will transport the user to the journal corresponding to that tag.

### *Entry*

This is the default journal type, and is the most common one that both players and Dungeon Masters will use.

An *entry* can be given an optional title, and the time of journal creation will be logged. Content can be added in the text region below.

Underneath the text region there is a pane which allows adding tags to the journal entry. To create a new tag, write the tag name in the panel and hit *Enter*, or the *+* button. This will remove the journal entry from the untagged journal entries list, create a journal for the tag (if it does not exist yet) and add the entry to that journal.

### *Quest*

A *quest* must be given a title, with an optional description. No content or tags can be added to a *quest*.

A journal will be automatically created for the quest in the journals pane.

All journal entries which have a tag corresponding to the quest will be listed under the journal.

### *Player*

A *player* journal type can be given a name and optionally their real name. An icon can also be uploaded to represent the player. No content or tags can be added to a *player*.

A journal will be automatically created for the player in the journals pane.

Only Dungeon Masters can create, edit or remove *player* type journal entries.

The Dungeon Master must create a *player* entry for every player in order for them to be able to take part in the campaign.

### *Handout*

A *handout* type journal is the only journal type that allows inserting media as its content. A title can be given, and media can be uploaded for all members of the campaign to view.

Only Dungeon Masters can create, edit or remove *handout* type journal entries.
