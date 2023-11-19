# Chadlingo

Chadlingo is a simple mobile app that helps people to hold themselves accountable.
People struggle to commit to simple routines such as spending 5 minutes daily to learn a new language.
They decide they'll do it, they do it for a few days and then for a wide variety of reason they miss a day, two and end up giving up or forgetting about it.

Chadlingo let you trap your future self. Decide how much you should lock to be bothered losing it, then lock it.
We believe even if our language app pale in comparaison to duolingo, some people would get better result using it.
Why? Because the main factor that make someone succeed is consistency and the people who use duolingo irregularly are missing out.
Chadlingo introduce the concept of the "pain screen". Once you have to stake something, you decide if you'll do it or not.
As master Yoda said "do or do not. there is no try"


Next steps are:

- figure out how to use an u64 as seed parameter
- decide if challengeId needs to be created by frontend or program - should it be a nonce or an hash of current timestamp?
- decide if create a user structure onchain to store stuff like challengeIds etc ... that are now stored on a backend
- adding social (profile creation, multiplayer)
- add secret (prevent someone from bypassing the frontend)
- find a way to test withdraw function (probably using bankrun as anchor don't let you alter the clock)
- improve the interface & make language & meditation challenge more complete (not overkill but could improve some stuff)
- add new challenges (github, twitter etc ...)
- launch a discord and rally a small community around the chad meme energy